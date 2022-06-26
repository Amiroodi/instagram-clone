const con = require('./config');

class UserModel {
    static getAllUsers(callback) {
        con.connect((err) => {
            if(err) {
                return callback(err, undefined);
            };
            
            const sql = 'select * from users';
            con.execute(sql, (err, result) => {
                if(err) throw err;
                callback(result);
            });
        });
    };

    static getUser(id, callback) {
        con.connect((err) => {
            if(err) {
                return callback(err, undefined);
            };

            const sql = `select * from users where id = ?`;

            con.execute(sql, [id], (err, result) => {
                if(err) callback(error, undefined);
                callback(undefined, result);
            });
        });
    };

    static createUser(username, password, callback) {
        con.connect((err) => {
            if(err) {
                return callback(err, undefined);
            };

            const sql = `insert into users(username, password) values(?, ?)`;

            con.execute(sql, [username, password],(err, result) => {
                if(err) {
                    return callback(err, undefined);
                };
                callback(undefined, 'your account was successfully created!');
            });
        });
    };

    static loginUser(username, password, callback) {
        con.connect((err) =>{
            if(err) {
                return callback(err, undefined);
            };

            const sql = `select id, username from users where username = ? and password = ?`;

            con.execute(sql, [username, password],(err, result) => {
                if(err) {
                    return callback(err, undefined);
                };
                
                callback(undefined, result);
            });
        });
    };

    static loadSearchedUser = (username, callback) => {
        con.connect((err) => {
            if(err) {
                return callback(err, undefined);
            };

            if(username != '') {
                const sql = `select id, username from users where username like ?`;

                con.execute(sql, [`%${username}%`],(err, result) => {
                    if(err) {
                        return callback(err, undefined);
                    };
    
                    callback(undefined, result);
                });
            } else {
                callback(undefined, []);
            };
        });
    };
}

module.exports = UserModel;
