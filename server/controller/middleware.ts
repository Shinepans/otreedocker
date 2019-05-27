const isLogin = (req, res, next) => {
    if (!req.user) {
        return res.send('Not Login')
    }
    next()
}

export {
    isLogin
}
