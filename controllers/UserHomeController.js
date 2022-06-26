const UserModel = require('../models/UserModel');
const PhotoModel = require('../models/PhotoModel');

class UserHomeController {
    static loadView = (req, res) => {
        if(req.session.userId) {
            const userId = req.session.userId;
            PhotoModel.loadPhotosByUser(userId, (err, result) => {
                if(err) {
                    return res.send(err);
                };

                res.render('index', {page: 'user_home', headPara: `Your Photos` , title: 'User Home page', result});
            });
        } else {
            res.redirect('/login');
        };
    };
}

module.exports = UserHomeController;