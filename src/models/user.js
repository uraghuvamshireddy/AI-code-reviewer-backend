const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    googleId:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        reuired:true
    },
    name:{
        type:String,
        required:true
    },
    codeFile:{
         type:mongoose.Schema.Types.ObjectId,
        ref:'CodeFile',
    },
});

module.exports = mongoose.model("User",userSchema)