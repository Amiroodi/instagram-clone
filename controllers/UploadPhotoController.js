const PhotoModel = require('../models/PhotoModel');
const path = require('path');
const multer = require('multer');

// cb in some of these functions is a filter: null is passed when there is no error, and true is passed when the item is qualified 

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/photos');
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

        cb('Error: File upload only supports the following filetypes: ' + filetypes);
    }
}).single('mypic');

class UploadPhotoController {
    static loadView = (req, res) => {
        res.render('index', {page: 'upload_photo', title: 'Upload Post'});
    };

    static uploadPhoto = (req, res) => {
        upload(req, res, (err) => {
            if(err) {
                res.send(err);
            } else {
                res.send("Success, Image uploaded!");
            };
        });
    }
}

module.exports = UploadPhotoController;