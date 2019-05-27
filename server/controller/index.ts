import * as passport from 'passport'
import * as Path from "path";

export * from './customProxyFilter'
export * from './middleware'


export class Ctrl {
    static async login(req, res) {
        passport.authenticate('local', (err, user) => {
            if (err) {
                console.log(err)
            }
            if (!user) return res.redirect('/')
            req.logIn(user, function (err) {
                if (err) {
                    console.log(err)
                } else {
                    res.redirect('/index')
                }
            })
        })(req, res)
    }

    static async logout(req, res) {
        await req.logout()
        res.redirect('/')
    }

    static async index(req, res) {
        res.sendFile(Path.resolve(__dirname, '../pages/index.html'))
    }
}
