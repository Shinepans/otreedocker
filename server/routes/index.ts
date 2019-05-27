import {Router} from 'express'
import {Ctrl} from '../controller'
import {isLogin} from '../controller'

const router = Router()
    .use('/', Router()
        .get('/', (req, res) => res.render('login'))
        .get('/index', isLogin, Ctrl.index)
        .get('/logout', isLogin, Ctrl.logout)
        .post('/login', Ctrl.login)
    )

export {
    router
}
