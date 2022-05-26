const PhotoModel = require('../models/PhotoModel');
const path = require('path');
const multer = require('multer');

// cb in some of these functions is a filter: null is passed when there is no error, and true is passed when the item is qualified 

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/photos');
    },
    filename: (req, file, cb) => {
        cb(null, req.session.userid + '_' + req.session.photoExtension + '.jpg');
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
        if(req.session.userid) {
            res.render('index', {page: 'upload_photo', title: 'Upload Post'});
        } else {
            res.send('please log into your account.');
        };
    };

    static uploadPhoto = (req, res) => {
        if(req.session.userid) {
            const userid = req.session.userid;

            // photoExtention is used for saving the photo in the server and database with the same time extensions.
            const photoExtension = Date.now();
            req.session.photoExtension = photoExtension;

            upload(req, res, (err) => {
                if(err) {
                    res.send(err);
                } else {
                    PhotoModel.uploadPhotoURL(userid, photoExtension, (err, result) => {
                        if(err) {
                            res.send(err);
                        } else {
                            req.session.photoExtension = null;
                            res.send('Success, Image uploaded!');
                        }
                    });
                };
            });
        } else {
            res.send('please login to your account.');
        };

    };
}

module.exports = UploadPhotoController;