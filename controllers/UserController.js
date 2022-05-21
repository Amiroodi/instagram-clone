const UserModel = require('../models/UserModel');

class UserController {
    static getAllUsers = (req, res) => {
        UserModel.getAllUsers((result) => {
            res.send(result);
        });
    };
    
    static getUser = (req, res) => {
        const id = req.query.id;

        UserModel.getUser(id, (result) => {
            res.send(result);
        });
    };
}

module.exports = UserController;