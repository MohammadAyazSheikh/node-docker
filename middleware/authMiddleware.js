const isAuth = (req, res, next) => {

    const { user } = req.session;

    if (!user) {
        return res.status(401).json({
            status: 'fail',
            error: 'you are not authorized'
        });
    }

    req.user = user;
    next();

}

module.exports = isAuth;