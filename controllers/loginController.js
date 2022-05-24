const UserModel = require('../models/UserModel');

class LogInController {
    static LoginUser = (req, res) => {
        const username = req.body.username;
        const password = req.body.password;

        if(username != '' && password != '') {
            UserModel.loginUser(username, password, (err, result) => {
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
        res.render('index', {page: 'login', title: 'login'});
    };
}

module.exports = LogInController;