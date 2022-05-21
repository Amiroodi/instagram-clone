const con = require('./config');

class UserModel {

    static getAllUsers(callback) {
        con.connect((err) => {
            if(err) throw err;
            const sql = 'select * from users';
            con.query(sql, (err, result) => {
                if(err) throw err;
                callback(result);
            });
        });
    };

    static getUser(id, callback) {
        con.connect((err) => {
            const sql = `select * from users where id = ${id}`;

            con.query(sql, (err, result) => {
                if(err) throw err;
                callback(result);
            });
        });
    };
}

module.exports = UserModel;
