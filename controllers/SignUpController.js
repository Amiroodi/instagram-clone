const UserModel = require('../models/UserModel');

class SignUpController {
    static createUser = (req, res) => {
        const username = req.body.username;
        const password = req.body.password;

        UserModel.createUser(username, password, (result) => {
            res.send(result);
        });
    };

    static loadView = (req, res) => {
        // res.send('123');
        // res.send('working');
        res.render('index', {page: 'signup', title: 'signup'});
    };
}

module.exports = SignUpController;