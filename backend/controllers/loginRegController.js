const jwt = require('jsonwebtoken');
const moment = require('moment/moment');
const sendemail = require('../middlewares/emailer');
const { base64Decode, base64Encode, sha256 } = require('../middlewares/encDecScript');

const { UserModel, ResetPwEmailModel, validateResetInfo, validateUserInfo } = require("../models/userModel");

async function signUpController(req, res) {
    try {
        var fname = req.body.fname;
        var lname = req.body.lname;
        var email = req.body.email;
        var password = req.body.password;
        var access_lvl = req.params.role;

        // const user=new UserModel;
        const {validate} = validateUserInfo({ fname, lname, email, password, access_lvl });
        if (validate) {
            res.json({
                message: validate
            })
        }
        else {
            const user = await UserModel.create({ fname, lname, email, password, access_lvl });
            user.save();
            res.json({
                message: "Success",
                user: req.body
            });
        }
    }
    catch (err) {
        res.json({
            error: "SignUp Controller Error" + err
        });
    }
}

async function loginController(req, res) {
    try {
        var email = req.body.email;
        var password = req.body.password;
        const user = await UserModel.findOne({ email });

        if (!user) {
            res.json({
                message: "Email Not Found!"
            });
        }
        else {
            const validate = await user.isValidPassword(password);
            if (!validate) {
                res.json({
                    message: "Wrong Password! Please Try Again!"
                })
            }
            else {
                var access_lvl = user.access_lvl;
                const body = { _id: user._id, email: email };
                const token = jwt.sign({ user: body }, process.env.JSON_KEY);
                var isVerified = user.isVerified;
                //CHECK FOR ISVERIFIED IN FRONTEND ALSO IF NEEDED
                if (isVerified==="true") {
                    res.json({
                        token,
                        access_lvl,
                        isVerified
                    })
                }
                else {
                    var emailOutput=await emailVerificationController(email);
                    console.log(emailOutput);
                    return res.json({ redirectLink: `${req.headers.hostname}/email-verification-status` });//CHANGE LINK AS PER FRONTEND ROUTER
                }
            }
        }
    }
    catch (err) {
        res.json({
            error: "Login Controller Error" + err
        });
    }
}

async function pwResetEmailController(req, res) {
    try {
        var email = req.body.email;
        const user = await UserModel.findOne({ email });

        if (!user) {
            res.json({
                message: "Email Not Found!"
            });
        }
        else {
            const today = base64Encode(new Date().toISOString());
            const ident = base64Encode(user._id.toString());
            const data = {
                today: today,
                userId: user._id,
                password: user.password,
                email: user.email
            };
            const hash = sha256(JSON.stringify(data), process.env.EMAIL_HASH);

            const validateReset = validateResetInfo(email);
            if (validateReset) {
                const resetPw = await ResetPwEmailModel.create({ email });
                resetPw.save();

                //Send Email
                sendemail(email,{email,title:"HackNiche",link:`http://localhost:8080/password-change/${ident}/${today}-${hash}`}, '../middlewares/requestResetPassword.handlebars');

                res.json({
                    message: "Password Reset Link Sent to Your Email"
                });
            }
        }
    }
    catch (err) {
        res.json({
            error: "Reset Password Email Error" + err
        })
    }
}

async function pwLinkVerifier(req, res) {
    try {
        const today = base64Decode(req.params.today);
        const then = moment(today);
        const now = moment().utc();
        const timeSince = now.diff(then, 'hours');
        if (timeSince > 2) {
            return res.json({
                message: "Password Link is Invalid!"
            });
        }
        const userId = base64Decode(req.params.ident);

        const user = await UserModel.findOne({ _id: userId });
        if (!user | user === undefined) {
            return res.json({
                message: "User Not Found"
            });
        }

        const data = {
            today: req.params.today,
            userId: user._id,
            password: user.password,
            email: user.email
        };
        const hash = sha256(JSON.stringify(data), process.env.EMAIL_HASH);

        if (hash !== req.params.hash) {
            return res.json({
                message: "Password Link is Invalid!"
            });
        }

        return res.json({ redirectLink: `${req.headers.hostname}/reset-password` });
        // return res.redirect(`${req.headers.hostname}/reset-password`);

    }
    catch (err) {
        res.json({
            error: "Password Link Check Error" + err
        })
    }
}

async function pwResetController(req, res) {
    try {
        const resetEmail = await ResetPwEmailModel.findOne({ email: req.body.email });
        if (!resetEmail | resetEmail === undefined) {
            return res.json({
                message: "Email Not Found!"
            })
        }
        else {
            const user = await UserModel.findOne({ email: resetEmail.email });
            user.password = req.body.password;
            user.save();

            resetEmail.deleteOne({ email: req.body.email });

            //FRONTEND PE CHECK IF SUCCESS AND THEN REDIRECT TO LOGIN PAGE ELSE STAY ON THE PAGE UPON SUBMIT BUTTON CLICK
            res.json({
                message: "Password Has Been Reset",
                success: true
            })
        }
    }
    catch (err) {
        res.json({
            error: "Password Reset Controller Error" + err
        })
    }
}

async function emailVerificationController(email) {
    try {
        const user = await UserModel.findOne({ email });
        if (!user) {
            return {
                message: "Email Not Found!"
            };
        }
        else {
            const ident = base64Encode(user._id.toString());
            const data = {
                userId: user._id,
                email: user.email
            };
            const hash = sha256(JSON.stringify(data), process.env.EMAIL_HASH);

            //SEND EMAIL
            sendemail(email,{email,title:"HackNiche",link:`http://localhost:8080/email-verification/${ident}/${hash}`}, '../middlewares/emailVerification.handlebars');

            return {
                message: "Verification Mail Sent Successfully"
            }
        }
    }
    catch (err) {
        console.log("Email Verification Controller Error"+err)
        return {
            error: "Email Verification Controller Error" + err
        }
    }
}

async function emailLinkVerifier(req, res) {
    try {
        const userId = base64Decode(req.params.ident);

        const user = await UserModel.findOne({ _id: userId });
        if (!user | user === undefined) {
            return res.json({
                message: "User Not Found"
            });
        }

        const data = {
            userId: user._id,
            email: user.email
        };
        const hash = sha256(JSON.stringify(data), process.env.EMAIL_HASH);

        if (hash !== req.params.hash) {
            return res.json({
                message: "Password Link is Invalid!"
            });
        }

        user.isVerified=true;
        user.save();

        return res.json({ redirectLink: `${req.headers.hostname}/login` }); //CHANGE ROUTING LATER
        // return res.redirect(`${req.headers.hostname}/reset-password`);

    }
    catch (err) {
        res.json({
            error: "Email Link Check Error" + err
        })
    }
}


module.exports = { signUpController, loginController, pwResetEmailController, pwLinkVerifier, pwResetController, emailVerificationController, emailLinkVerifier }