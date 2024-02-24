const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Joi = require("joi");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    access_lvl: {
        type: String
    },
    isVerified: {
        type: String,
        default: false
    },
});

UserSchema.pre(
    'save',
    async function (next) {
        const user = this;
        const hash = await bcrypt.hash(this.password, parseInt(process.env.SALT));
        this.password = hash;
        next();
    }
);

UserSchema.methods.isValidPassword = async function (password) {
    const user = this;
    const compare = await bcrypt.compare(password, user.password);

    return compare;
}

const validateUserInfo =  (data)=> {
    const schema = Joi.object({
        fname: Joi.string().required().label("First Name"),
        lname: Joi.string().required().label("Last Name"),
        email: Joi.string().required().label("Email"),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,18}$')).required().label("Password"),
        access_lvl: Joi.string().required().label("Access_Lvl"),
    });
    return schema.validate(data);
}
const UserModel = mongoose.model('users', UserSchema);


const ResetPwEmails = new Schema({
    email: { type: String, required: true }
})

const validateResetInfo = async function (email) {
    const user = UserModel.findOne({ email });
    if (!user || user === undefined) {
        return false;
    }
    else{
        return true;
    }
}

const ResetPwEmailModel = mongoose.model('resetEmails', ResetPwEmails);

module.exports = { UserModel, ResetPwEmailModel,validateResetInfo,validateUserInfo };