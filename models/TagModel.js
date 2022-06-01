const con = require('./config');

class TagModel {
    static loadSearchedTag = (tag, callback) => {
        con.connect((err) => {
            if(err) {
                return callback(err, undefined);
            };

            tag = tag.substring(1); // a tag like #thing should be trimmed to thing

            const sql = `select id, tag_name from tags where tag_name like '%${tag}%'`;

            con.query(sql, (err, result) => {
                if(err) {
                    return callback(err, undefined);
                };

                callback(undefined, result);
            });
        });
    };
}

module.exports = TagModel;