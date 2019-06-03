import * as passport from 'passport'
import UserOTreeRec from '../models/UserOTreeRec'
import * as httpProxy from 'http-proxy'
import {checkNeedForProxy} from "./customProxyFilter"


const proxy = httpProxy.createProxyServer({toProxy: true})

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
        const myPortCount = await UserOTreeRec.count({user: req.user._id})
        res.render('index', {
            myPortCount
        })
    }

    static async addPortPage(req, res) {
        res.render('addOTreePort')
    }

    static async manageOTreePortPage(req, res) {
        const ports = await UserOTreeRec.find({user: req.user._id})
        res.render('manageOTreePort', {ports})
    }

    static async addOTreePort(req, res) {
        const port = req.body.port
        const uniKey = req.user._id.toString() + Date.now()
        const userOTreeRec = new UserOTreeRec({
            host: req.body.host,
            port: parseInt(port),
            user: req.user._id,
            uniKey: uniKey
        })
        await userOTreeRec.save()
        return res.json({err: 0})
    }

    static async proxyServer(req, res) {
        // Custom Proxy
        const server = await UserOTreeRec.findOne({uniKey: req.params.id})
        const port = server.port
        const host = server.host
        req.session.otreeId = server.uniKey
        req.session.otreeHost = host
        req.session.otreePort = port
        res.redirect(`http://${host}:3000/demo`)
    }

    static async saveOTreeItem(req, res) {

    }

    static async proxyOther(req, res) {

        const otreeHost = req.session.otreeHost
        const otreePort = req.session.otreePort
        proxy.web(req, res, {target: `http://${otreeHost}:${otreePort}`})
    }
}
