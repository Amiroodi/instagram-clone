const UserModel = require('../models/UserModel');

class UserController {
    static loadView = (req, res) => {
        if(req.session.userid) {
            res.render('index', {page: 'user_home', title: 'User Home page'});
        } else {
            res.send('please login to your account.');
        };
    };
}

module.exports = UserController;