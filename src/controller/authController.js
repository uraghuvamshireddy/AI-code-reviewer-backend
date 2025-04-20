const {OAuth2Client} = require("google-auth-library")
const jwt = require("jsonwebtoken")
const User = require("../models/user")

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

exports.googleLogin = async(req,res)=>{
    const {token} = req.body;

    try{
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID
        });

        const  {sub,email,name} = ticket.getPayload();

        let user = await User.findOne({googleId:sub});
        if(!user){
            user = await User.create({googleId:sub,email,name});
        }

        const jwtToken = jwt.sign({id:user._id,email:user.email},process.env.JWT_SECRET,{expiresIn:"1h"});

        res.status(200).json({token:jwtToken,user});
    }catch(err){
        console.error(err);
        res.status(401).json({message:"Authentication Failed"});
    }
};