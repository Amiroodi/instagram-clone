const con = require('./config');

class LikeModel {
    static like = (userId, photoId, callback) => {
        con.connect((err) => {
            if(err) {
                return callback(err, undefined);
            };

            const sql = `insert into likes(user_id, photo_id) values(${userId}, ${photoId})`;

            con.query(sql, (err, result) => {
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

            const sql = `delete from likes where user_id = ${userId} and photo_id = ${photoId}`;

            con.query(sql, (err, result) => {
                if(err) {
                    return callback(err, undefined);
                };

                callback(undefined, result);
            })
        })
    };
}   

module.exports = LikeModel;