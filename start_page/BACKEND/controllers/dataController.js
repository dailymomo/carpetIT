const Record = require('../models/record');
const Users = require('../models/user');
const fs = require('fs');

const addData = async (req, res, next) => {
    try {
        const user = await Users.findOne({username:req.body.user})
        const newRecord = new Record({userId:user._id});
        // transform date into required format
        var dateString = req.body.day.split("-");
        dateString[1] = dateString[1] - 1;
        if((dateString[1]+'').length == 1){
            dateString[1] = '0' + dateString[1];
        }
        newRecord.date = dateString[1] + ' ' + dateString[2] + ' ' + dateString[0];
        newRecord.money = req.body.money;
        newRecord.classification = req.body.category;
        newRecord.description = req.body.description;
        const file = req.file;
        if(file){
            //convert images into base 64 encoding
            const img = fs.readFileSync("./uploads/" + file.filename);
            encode_image = img.toString('base64');

            //create object to store data in the collection
            let finalImg = {
                filename: file.originalname,
                contentType:file.mimetype,
                imageBase64:encode_image
            }
            newRecord.receipt = finalImg;
        }

        newRecord.save();
        return res.json({msg:"success"});
    } catch (err) {
        return next(err)
    }
}


const getImages = async (req, res, next) => {
    try{
        const user = await Users.findOne({username:req.params.user});
        if (user.budget === null) {
            return res.status(404).json({msg:"No budget!"});
        }
        return res.json({budget: user.budget});
    }catch(error){
        return next(err);
    }
}

const setBudget = async (req, res, next) => {
    try{
        const user = await Users.findOne({username:req.body.userName});
        if(user === null){
            return res.status(404).json({msg:"No user!"});
        }else{
            user.budget = req.body.budget;
            user.save();
            return res.json({msg:"success"});
        }
    }catch(error){
        return next(err);
    }
}

const getBudget = async (req, res, next) => {
    try{
        const user = await Users.findOne({username:req.params.user});
        if (user.budget === null) {
            return res.status(404).json({msg:"No budget!"});
        }
        return res.json({budget: user.budget});
    }catch(error){
        return next(err);
    }
}

const getAllData = async (req, res, next) => {
    try {
        const user = await Users.findOne({username:req.params.user});
        const records = await Record.find({userId: user._id}).lean();
        if (records === null) {
            return res.status(404).json({msg:"No records!"});
        }
        return res.json({data: records});
    } catch (err) {
        return next(err);
    }
}

const editData = async (req, res, next) => {
    try {
        const record = await Record.findOne({_id: req.body.recordID})
        if (record === null) {
            return res.status(404).json({msg:"No records!"});
        }
        if (req.body.day === null){
            var dateString = req.body.day.split("-");
            dateString[1] = dateString[1] - 1;
            if((dateString[1]+'').length == 1){
                dateString[1] = '0' + dateString[1];
            }
        }
        record.money = req.body.money;
        record.classification = req.body.category;
        record.description = req.body.description;
        const file = req.file;
        if(file){
            //convert images into base 64 encoding
            const img = fs.readFileSync("./uploads/" + file.filename);
            encode_image = img.toString('base64');

            //create object to store data in the collection
            let finalImg = {
                filename: file.originalname,
                contentType:file.mimetype,
                imageBase64:encode_image
            }
            record.receipt = finalImg;
        }
        record.save();
        return res.json({data: record})
    } catch (err) {
        return next(err)
    }
}

const deleteData = async (req, res, next) => {
    try {
        const result = await Record.deleteOne({_id: req.body.id})
        return res.send(result)
    } catch (err) {
        return next(err)
    }
}


module.exports = {
    addData,
    setBudget,
    getBudget,
    getAllData,
    editData,
    deleteData
}