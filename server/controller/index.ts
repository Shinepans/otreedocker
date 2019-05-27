import * as passport from 'passport'
import UserOTreeRec from '../models/UserOTreeRec'

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

    static async loginPage(req, res) {
        res.render('login')
    }

    static async logout(req, res) {
        await req.logout()
        res.redirect('/')
    }

    static async indexPage(req, res) {
        res.render('index')
    }

    static async addPortPage(req, res) {
        res.render('addOTreePort')
    }

    static async addOTreePort(req, res) {
        const port = req.body.port
        const userOTreeRec = new UserOTreeRec({
            port: parseInt(port),
            user: req.user._id
        })
        await userOTreeRec.save()
        return {err: 0}
    }
}
