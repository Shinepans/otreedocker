import {router} from '../routes'

const useRouter = (app) => {
    app.use('/', router)
}

export {
    useRouter
}
