const con = require('./config');

class PhotoModel {
    static uploadPhotoURL(userid, photoExtension, callback) {
        con.connect((err) => {
            if(err) {
                return callback('unable to connect to database.', undefined);
            };

            const img_url = `${userid}_${photoExtension}.jpg`;

            const sql = `insert into photos(user_id, image_url) values('${userid}', '${img_url}')`;

            con.query(sql, (err, result) => {
                if(err) {
                    return callback('there was an error!', undefined);
                };
                callback(undefined, result);
            });
        });
    };
}

module.exports = PhotoModel;