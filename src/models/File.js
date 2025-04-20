const mongoose = require('mongoose')

const codeFileSchema = new mongoose.Schema(
    {
        filename:{
            type:String,
            required:true
        },
        code:{
            type:String,
            required:true,
        },
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
            required:true
        },

    },
    {
        timestamps:true,
    }
);

const CodeFile = mongoose.model('CodeFile',codeFileSchema)
module.exports = CodeFile;