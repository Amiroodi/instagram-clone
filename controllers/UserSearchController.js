const TagModel = require('../models/TagModel');
const UserModel = require('../models/UserModel');
const PhotoModel = require('../models/PhotoModel');

class UserSearchController {
    static loadView = (req, res) => {
        res.render('index', {page: 'user_search', title: 'search'});
    };

    static findAll = (req, res) => {
        const searchBarVal = req.body.searchBarVal;

        if(searchBarVal.startsWith('#')) {
            TagModel.loadSearchedTag(searchBarVal, (err, result) => {
                if(err) {
                    return res.send(err);
                };

                res.send(result);
            });
        } else {
            UserModel.loadSearchedUser(searchBarVal, (err, result) => {
                if(err) {
                    return res.send(err);
                };

                res.send(result);
            });
        };
    };

    static bringeSingleTag = (req, res) => {
        const tagId = req.query.tag_id;

        PhotoModel.loadPhotosByTag(tagId, (err, result) => {
            if(err) {
                return res.send(err);
            };

            res.render('index', {page: 'user_home', headPara: `Photos With Tag #${req.query.tag_name}` , title: `found photos`, result});
        });
    };

    static bringeSingleUser = (req, res) => {
        const userId = req.query.user_id;

        PhotoModel.loadPhotosByUser(userId, (err, result) => {
            if(err) {
                return res.send(err);
            };

            res.render('index', {page: 'user_home', title: 'user profile', headPara: `${req.query.username}'s Page`, result});
        });
    };
}

module.exports = UserSearchController;