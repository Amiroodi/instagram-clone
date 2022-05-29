const con = require('./config');

class PhotoModel {
    // uploadPhoto uploads the image_url and image's tag into the database
    static uploadPhoto(userid, photoExtension, tag, callback) {
        con.connect((err) => {
            if(err) {
                return callback('unable to connect to database.', undefined);
            };

            const img_url = `${userid}_${photoExtension}.jpg`;

            let sql = `insert into photos(user_id, image_url) values('${userid}', '${img_url}')`;

            con.query(sql, (err, photos_result) => {
                if(err) {
                    return callback('there was an error in inserting into photos table.', undefined);
                };

                sql = `insert ignore into tags(tag_name) values('${tag}')`;

                con.query(sql, (err, tags_result) => {
                    if(err) {
                        return callback('there was an error in inserting into tags table.', undefined);
                    };

                    sql = `insert into photo_tags(photo_id, tag_id) values(${photos_result.insertId}, ${tags_result.insertId})`;

                    con.query(sql, (err, result) => {
                        if(err) {
                            return callback('there was an error in inserting into photo_tags table.', undefined);
                        };

                        callback(undefined, result);
                    });
                });
            });
        });
    };

    static loadPhotos = (userid, callback) => {
        con.connect((err) => {
            if(err) {
                return callback('unable to connect to database.', undefined);
            };

            const sql = `select image_url from photos where user_id = ${userid}`;

            con.query(sql, (err, result) => {
                if(err) {
                    return callback('there was an error.', undefined);
                };
                callback(undefined, result);
            });
        });
    };
}

module.exports = PhotoModel;