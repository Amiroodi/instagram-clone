const UserModel = require('../models/UserModel');
const PhotoModel = require('../models/PhotoModel');

class UserController {
    static loadView = (req, res) => {
        if(req.session.userid) {
            const userid = req.session.userid;
            PhotoModel.loadPhotos(userid, (err, result) => {
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

module.exports = UserController;