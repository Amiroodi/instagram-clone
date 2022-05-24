const PhotoModel = require('../models/PhotoModel');
const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'photos');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + '.jpg');
    }
});

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png/;
        const mimetype = filetypes.test(file.mimetype);

        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

        if(mimetype && extname) {
            return cb(null, true);
        };

        cb('Error: File upload only supports the ' + 'following filetypes - ' + filetypes);
    }
}).single('mypic');



class UploadPhotoController {
    static loadView = (req, res) => {
        res.render('index', {page: 'upload_photo', title: 'Upload Post'});
    };

    static uploadPhoto = (req, res) => {
        upload(req,res,function(err) {
  
            if(err) {
      
                // ERROR occured (here it can be occured due
                // to uploading image of size greater than
                // 1MB or uploading different file type)
                res.send(err)
            } else {
      
                // SUCCESS, image successfully uploaded
                res.send("Success, Image uploaded!")
            };
        });
    }
}

module.exports = UploadPhotoController;