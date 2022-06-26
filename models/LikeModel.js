const con = require('./config');

class LikeModel {
    static like = (userId, photoId, callback) => {
        con.connect((err) => {
            if(err) {
                return callback(err, undefined);
            };

            const sql = `insert into likes(user_id, photo_id) values(?, ?)`;

            con.execute(sql, [userId, photoId],(err, result) => {
                if(err) {
                    return callback(err, undefined);
                };

                callback(undefined, result);
            })
        })
    };

    static dislike = (userId, photoId, callback) => {
        con.connect((err) => {
            if(err) {
                return callback(err, undefined);
            };

            const sql = `delete from likes where user_id = ? and photo_id = ?`;

            con.execute(sql, [userId, photoId], (err, result) => {
                if(err) {
                    return callback(err, undefined);
                };

                callback(undefined, result);
            })
        })
    };
}   

module.exports = LikeModel;