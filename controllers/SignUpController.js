const UserModel = require('../models/UserModel');

class SignUpController {
    static createUser = (req, res) => {
        const username = req.body.username;
        const password = req.body.password;

        if(username != '' && password != '') {
            UserModel.createUser(username, password, (err, result) => {
                if(err) {
                    res.send(err);
                } else {
                    res.send(result);
                }
            });
        } else {
            res.send('username or password field must not be empty!');
        };

    };

    static loadView = (req, res) => {
        res.render('index', {page: 'signup', title: 'signup'});
    };
}

module.exports = SignUpController;