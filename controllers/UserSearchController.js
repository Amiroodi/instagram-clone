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
        const tagId = req.params.tagId;

        PhotoModel.loadPhotosByTag(tagId, (err, result) => {
            if(err) {
                return res.send(err);
            };

            res.render('index', {page: 'user_photos_by_tag', title: `found photos`, result});
        });
    };

    static bringeSingleUser = (req, res) => {
        const userId = req.params.userId;

        PhotoModel.loadPhotosByUser(userId, (err, result) => {
            if(err) {
                return res.send(err);
            };

            res.render('index', {page: 'user_photos_by_user', title: 'user profile', result});
        });
    };
}

module.exports = UserSearchController;