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
                if(err) callback(error, undefined);
                callback(undefined, result);
            });
        });
    };

    static createUser(username, password, callback) {
        con.connect((err) => {
            if(err) {
                return callback('unable to connect to database.', undefined);
            };

            const sql = `insert into users(username, password) values('${username}', '${password}')`;

            con.query(sql, (err, result) => {
                if(err) {
                    return callback('username already exists!', undefined);
                };
                callback(undefined, 'your account was successfully created!');
            });
        });
    }
}

module.exports = UserModel;