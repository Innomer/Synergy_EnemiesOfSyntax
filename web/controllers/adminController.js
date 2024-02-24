const { UserModel, validateUserInfo } = require("../models/userModel");

async function getAllAdminsController(req,res){
    try{
        const user=await UserModel.find({access_lvl:"admin"});
        if(user.length!=0)
        res.json(user);
        else
        res.json({
            message:"No Admin Found"
        })
    }
    catch(err){
        res.json({
            error:"All Admins Getter Error"+err
        })
    }
}
async function addNewAdminController(req,res){
    try{
        var fname = req.body.fname;
        var lname = req.body.lname;
        var email = req.body.email;
        var password = req.body.password;
        var access_lvl = "admin";
        var isVerified = "true";
        const user = await UserModel.create({ fname, lname, email, password, access_lvl, isVerified });
        user.save();
        res.json({
            message: "Success",
            user: req.body
        });
    }
    catch(err){
        res.json({
            error:"New Admin Creator Error"+err
        })
    }
}
async function getUserCount(req,res){
    try{
        const allCount=await UserModel.countDocuments({access_lvl:"user"});
        const allVerifiedCount=await UserModel.countDocuments({access_lvl:"user",isVerified:"true"});
        const allNonVerifiedCount=await UserModel.countDocuments({access_lvl:"user",isVerified:"false"});
        res.json({
            allCount,
            allNonVerifiedCount,
            allVerifiedCount
        })
    }
    catch(err){
        res.json({
            error:"Admin Get User Count Error"+err
        })
    }
}

module.exports={getAllAdminsController,addNewAdminController,getUserCount};