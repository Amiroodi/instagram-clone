const UserModel = require('../models/UserModel');
const PhotoModel = require('../models/PhotoModel');

class UserSinglePhotoController {
    static loadView = (req, res) => {
        if(req.session.userId) {
            const photoId = req.params.photoId;
            const userId = req.session.userId;

            PhotoModel.loadPhoto(photoId, userId, (err, result) => {
                if(err) {
                    return res.send(err);
                };

                res.render('index', {page: 'user_single_photo', title: 'photo', photo: result});
            });
        } else {
            res.send('please login to your account.');
        };
    };
}

module.exports = UserSinglePhotoController;