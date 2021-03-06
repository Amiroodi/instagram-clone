const UserModel = require('../models/UserModel');

class LoginController {
    static loginUser = (req, res) => {
        const username = req.body.username;
        const password = req.body.password;

        if(username != '' && password != '') {
            UserModel.loginUser(username, password, (err, result) => {
                if(err) {
                    res.send(err);
                } else if(result.length == 0) {
                    res.send('account was not found.');
                } else {
                    // session is a pointer to req.session
                    let session = req.session;
                    session.userId = result[0].id;
                    res.redirect(`home`);
                };
            });
        } else {
            res.send('username or password field must not be empty!');
        };

    };

    static loadView = (req, res) => {
        res.render('index', {page: 'login', title: 'login'});
    };
}

module.exports = LoginController;