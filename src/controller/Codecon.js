const CodeFile = require('../models/File');

const saveCode = async(req,res)=>{
    const {filename,code} = req.body;
    if(!filename || !code){
        return res.json(400).json({message:'Filename and Code are required'})
    }

    try{
        const newFile = new CodeFile({
            filename,
            code,
            user:req.user.id,
        });
        await newFile.save();
        res.status(201).json({message:'File saved successfully'});
    }catch(err){
        console.error(err);
        res.status(500).json({message:'Error saving file'});
    }
}

const history = async(req,res)=>{
    try{
        const files = await CodeFile.find({user:req.user.id}).sort({createdAt:-1});
        res.status(200).json(files);
    }catch(err){
        console.error(err);
        res.status(500).json({message:'Error in fetching the files'});
    }
}

const filebyId = async(req,res)=>{
    try{
        const id = req.params.id;
        const file = await CodeFile.findById(id);
        if(!file){
            return res.status(404).json({message:'File not found'});
        }
        if (file.user.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Access Denied' });
          }
          res.status(200).json(file);

    }catch(err){
        console.error(err);
        res.status(500).json({message:'Error in fetching the file'});
    }
}

module.exports = {saveCode,history,filebyId};
