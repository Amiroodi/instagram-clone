const UserModel = require('../models/UserModel');
const PhotoModel = require('../models/PhotoModel');

class UserHomeController {
    static loadView = (req, res) => {
        if(req.session.userId) {
            const userId = req.session.userId;
            PhotoModel.loadPhotos(userId, (err, result) => {
                if(err) {
                    return res.send(err);
                };

                res.render('index', {page: 'user_home', title: 'User Home page', result});
            });
        } else {
            res.send('please login to your account.');
        };
    };
}

module.exports = UserHomeController;