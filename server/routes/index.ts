import {Router} from 'express'
import {Ctrl} from '../controller'
import {isLogin} from '../controller'

const router = Router()
    .use('/', Router()
        .get('/', Ctrl.loginPage)
        .get('/index', isLogin, Ctrl.indexPage)
        .get('/otree/port/add', Ctrl.addPortPage)
    )
    .use('/', Router()
        .get('/logout', isLogin, Ctrl.logout)
        .post('/login', Ctrl.login)
        .post('/otree/port/add', Ctrl.addOTreePort)
    )

export {
    router
}
