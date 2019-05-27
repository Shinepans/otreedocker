import {Router} from 'express'
import {Ctrl} from '../controller'
import {isLogin} from '../controller'

const router = Router()
    // pages
    .use('/', Router()
        .get('/', Ctrl.loginPage)
        .get('/index', isLogin, Ctrl.indexPage)
        .get('/otree/port/add', Ctrl.addPortPage)
        .get('/otree/port/manage', Ctrl.manageOTreePortPage)
    )
    // apis
    .use('/', Router()
        .get('/logout', isLogin, Ctrl.logout)
        .post('/login', Ctrl.login)
        .post('/otree/port/add', Ctrl.addOTreePort)
    )
    // proxy
    .use('/', Router()
        .get('/server/:id', Ctrl.proxyServer)
        .all('/WaitUntilSessionCreated/*/', Ctrl.saveOTreeItem)
        .all('/*', Ctrl.proxyOther)
    )

export {
    router
}
