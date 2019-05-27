import {Request} from 'express'

const checkNeedForProxy = (req: Request) => {
    console.log(req.header)
    return true
}


export {
    checkNeedForProxy
}
