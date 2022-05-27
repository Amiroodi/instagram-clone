class HomeController {
    static loadView = (req, res) => {
        res.render('index', {page: 'home', title: 'home'});
    };
}

module.exports = HomeController;