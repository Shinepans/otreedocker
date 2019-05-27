import {Router} from 'express'
import {Ctrl} from '../controller'

const router = Router()
    .get('/', (req, res) => res.render('login'))
    .post('/login', Ctrl.login)


export {
    router
}
