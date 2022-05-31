const LikeModel = require('../models/LikeModel');

class UserLikeController {
    static like = (req, res) => {
        if(req.session.userId) {
            const userId = req.session.userId;
            const photoId = req.body.photoId;

            LikeModel.like(userId, photoId, (err, result) => {
                if(err) {
                    return res.send(err);
                };

                res.send('image was liked.');
            });
        } else {
            res.send('please log into your account.');
        }
    };

    static dislike = (req, res) => {
        if(req.session.userId) {
            const userId = req.session.userId;
            const photoId = req.body.photoId;

            LikeModel.dislike(userId, photoId, (err, result) => {
                if(err) {
                    return res.send(err);
                };

                res.send('image was disliked.');
            });
        } else {
            res.send('please log into your account.');
        }
    };
}

module.exports = UserLikeController;