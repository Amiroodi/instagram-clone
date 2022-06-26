const con = require('./config');

class PhotoModel {
    // uploadPhoto uploads the image_url and image's tag into the database
    static uploadPhoto(userId, photoExtension, tag, caption, callback) {
        con.connect((err) => {
            if(err) {
                return callback(err, undefined);
            };

            const img_url = `${userId}_${photoExtension}.jpg`;

            const sql = `insert into photos(user_id, image_url, caption) values(?, ?, ?)`;

            con.execute(sql, [userId, img_url, caption] , (err, photos_result) => {
                if(err) {
                    return callback(err, undefined);
                };

                const sql = `insert ignore into tags(tag_name) values(?)`;

                con.execute(sql, [tag], (err, tags_result) => {
                    if(err) {
                        return callback(err, undefined);
                    };

                    const sql = `insert into photo_tag(photo_id, tag_id) values(?, ?)`;

                    con.execute(sql, [photos_result.insertId, tags_result.insertId], (err, result) => {
                        if(err) {
                            return callback(err, undefined);
                        };

                        callback(undefined, result);
                    });
                });
            });
        });
    };

    static loadPhotosByUser = (userId, callback) => {
        con.connect((err) => {
            if(err) {
                return callback(err, undefined);
            };

            const sql = `select * from photos where user_id = ?`;

            con.execute(sql, [userId],(err, result) => {
                if(err) {
                    return callback(err, undefined);
                };

                callback(undefined, result);
            });
        });
    };

    static loadPhoto = (photoId, userId, callback) => {
        con.connect((err) => {
            if(err) {
                return callback(err, undefined);
            };

            const sql = `select u.username, u.id as user_id, t.tag_name, p.id as photo_id, p.image_url, p.caption from photos as p join users as u on u.id = p.user_id join photo_tag as pt on p.id = pt.photo_id join tags as t on pt.tag_id = t.id where p.id = ?`;

            con.execute(sql, [photoId] ,(err, result) => {
                if(err) {
                    return callback(err, undefined);
                };

                result = result[0];

                const sql = `select * from likes where user_id = ? and photo_id = ?`;

                con.execute(sql, [userId, photoId], (err, result_like) => {
                    if(err) {
                        return callback(err, undefined);
                    };
                    
                    if(result_like.length == 1) {
                        result_like = 1;
                    } else {
                        result_like = 0;
                    };

                    result.userLikedPhotoBefore = result_like;

                    const sql = `select u.username, c.comment_text from comments as c join users as u on c.user_id = u.id where c.photo_id = ?`;

                    con.execute(sql, [photoId], (err, result_comments) => {
                        if(err) {
                            return callback(err, undefined);
                        };

                        result.comments = result_comments;
                        
                        callback(undefined, result);
                    });
                });
            });
        });
    };

    static loadPhotosByTag = (tagId, callback) => {
        con.connect((err) => {
            if(err) {
                return callback(err, undefined);
            };

            const sql = `select p.id, p.image_url from tags as t join photo_tag as pt on t.id = pt.tag_id join photos as p on pt.photo_id = p.id where t.id = ?`;

            con.execute(sql, [tagId], (err, result) => {
                if(err) {
                    return callback(err, undefined);
                };

                callback(undefined, result);
            });
        });
    };
}

module.exports = PhotoModel;