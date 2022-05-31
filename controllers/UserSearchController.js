


class UserSearchController {
    static loadView = (req, res) => {
        res.render('index', {page: 'user_search', title: 'search'});
    };
}

module.exports = UserSearchController;