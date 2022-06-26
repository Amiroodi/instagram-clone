const con = require('./config');

class CommentModel {
    static saveComment = (userId, photoId, text, callback) => {
        con.connect((err) => {
            if(err) {
                return callback(err, undefined);
            };

            const sql = `insert into comments(user_id, photo_id, comment_text) values(?, ?, ?)`;

            con.execute(sql, [userId, photoId, text], (err, resultInsert) => {
                if(err) {
                    return callback(err, undefined);
                };

                const sql = `select u.username, c.comment_text from comments as c join users as u on c.user_id = u.id where c.id = ?`

                con.execute(sql, [resultInsert.insertId], (err, result) => {
                    if(err) {
                        return callback(err, undefined);
                    };

                    callback(undefined, result[0]);
                });
            });
        })
    };
}

module.exports = CommentModel;