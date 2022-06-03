const con = require('./config');

class PhotoModel {
    // uploadPhoto uploads the image_url and image's tag into the database
    static uploadPhoto(userId, photoExtension, tag, caption, callback) {
        con.connect((err) => {
            if(err) {
                return callback(err, undefined);
            };

            const img_url = `${userId}_${photoExtension}.jpg`;

            let sql = `insert into photos(user_id, image_url, caption) values(${userId}, '${img_url}', '${caption}')`;

            con.query(sql, (err, photos_result) => {
                if(err) {
                    return callback(err, undefined);
                };

                sql = `insert ignore into tags(tag_name) values('${tag}')`;

                con.query(sql, (err, tags_result) => {
                    if(err) {
                        return callback(err, undefined);
                    };

                    sql = `insert into photo_tag(photo_id, tag_id) values(${photos_result.insertId}, ${tags_result.insertId})`;

                    con.query(sql, (err, result) => {
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

            const sql = `select * from photos where user_id = ${userId}`;

            con.query(sql, (err, result) => {
                if(err) {
                    return callback(err, undefined);
                };

                console.log(result);
                callback(undefined, result);
            });
        });
    };

    static loadPhoto = (photoId, userId, callback) => {
        con.connect((err) => {
            if(err) {
                return callback(err, undefined);
            };

            const sql = `select t.tag_name, p.id, p.image_url from photos as p join photo_tag as pt on p.id = pt.photo_id join tags as t on pt.tag_id = t.id where p.id = ${photoId}`;

            con.query(sql, (err, result) => {
                if(err) {
                    return callback(err, undefined);
                };

                result = result[0];

                const sql = `select * from likes where user_id = ${userId} and photo_id = ${photoId}`;

                con.query(sql, (err, result_like) => {
                    if(err) {
                        return callback(err, undefined);
                    };
                    
                    if(result_like.length == 1) {
                        result_like = 1;
                    } else {
                        result_like = 0;
                    };

                    result.userLikedPhotoBefore = result_like;

                    callback(undefined, result);
                });
            });
        });
    };

    static loadPhotosByTag = (tagId, callback) => {
        con.connect((err) => {
            if(err) {
                return callback(err, undefined);
            };

            const sql = `select p.id, p.image_url from tags as t join photo_tag as pt on t.id = pt.tag_id join photos as p on pt.photo_id = p.id where t.id = ${tagId}`;

            con.query(sql, (err, result) => {
                if(err) {
                    return callback(err, undefined);
                };

                callback(undefined, result);
            });
        });
    };
}

module.exports = PhotoModel;