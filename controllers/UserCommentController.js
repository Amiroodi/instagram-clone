const CommentModel = require('../models/CommentModel');

class UserCommentController {
    static saveComment = (req, res) => {
        if(req.session.userId) {
            const userId = req.session.userId;
            const photoId = req.body.photoId;
            const text = req.body.text;

            CommentModel.saveComment(userId, photoId, text, (err, result) => {
                if(err) {
                    return res.send(err);
                };

                res.send(result);
            });

        } else {
            res.redirect('/login');
        };
    };
}

module.exports = UserCommentController;
