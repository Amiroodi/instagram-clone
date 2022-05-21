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

    static createUser(username, password, callback) {
        con.connect((err) => {
            const sql = `insert into users(username, password) values('${username}', '${password}')`;
            // const sql = `insert into users(username, password) values('Amiroodi', 'A1234')`;

            con.query(sql, (err, result) => {
                if(err) throw err;
                callback(result);
            });
        });
    }
}

module.exports = UserModel;
