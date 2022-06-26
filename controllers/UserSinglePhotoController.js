const UserModel = require('../models/UserModel');
const PhotoModel = require('../models/PhotoModel');

class UserSinglePhotoController {
    static loadView = (req, res) => {
        if(req.session.userId) {
            const photoId = req.query.photo_id;
            const userId = req.session.userId;

            PhotoModel.loadPhoto(photoId, userId, (err, result) => {
                if(err) {
                    return res.send(err);
                };

                // checking if the user is entering his/her own page
                if(result.user_id == userId) {
                    result.username = 'You';
                };

                res.render('index', {page: 'user_single_photo', title: 'photo', photo: result});
            });
        } else {
            res.send('please login to your account.');
        };
    };
}

module.exports = UserSinglePhotoController;