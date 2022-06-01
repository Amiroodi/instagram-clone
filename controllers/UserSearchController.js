const TagModel = require('../models/TagModel');
const UserModel = require('../models/UserModel');

class UserSearchController {
    static loadView = (req, res) => {
        res.render('index', {page: 'user_search', title: 'search'});
    };

    static find = (req, res) => {
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
}

module.exports = UserSearchController;