const isLogin = (req, res, next) => {
    if (!req.user) {
        return res.send('Not Login')
    }
    next()
}

const hasServer = (req, res, next) => {
    if (!req.session.otreeId) {
        return res.send('Not Allowed')
    }
    next()
}

export {
    isLogin,
    hasServer
}
