const multer = require('multer');

const storage = multer.diskStorage({
    destination:function(req,file,callback){
        callback(null,'uploads')
    },
    filename:function(req,file,callback){
        const ext = file.mimetype.split('/')[1];
        callback(null,file.filename+'-'+Date.now()+ext)
    }
})

const isImage = (req,file,callback) => {
    if(file.mimetype.startWith('image')){
        callback(null,true);
    } else {
        callback(new Error('Only image is Allowed.'));
    }
};

const upload = multer({
    storage:storage,
    fileFilter:isImage
});

module.exports = upload;