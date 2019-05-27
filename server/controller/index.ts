import * as passport from 'passport'

export * from './customProxyFilter'


export class Ctrl {
    static async login(req, res, next) {
        passport.authenticate('local', function (err, user) {
            if (err) return next(err)
            if (!user) return res.redirect('/')
            req.logIn(user, function (err) {
                if (err) {
                    return next(err)
                } else {
                    res.redirect('/index')
                }
            })
        })(req, res, next)
    }
}
