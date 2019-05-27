'use strict'

import * as passport from 'passport'
require('./customPassport')

const usePassport = (app) => {
    app.use(passport.initialize())
    app.use(passport.session())
    app.use((req, res, next) => {
        res.locals.user = req.user
        next()
    })
}

export {
    usePassport
}
