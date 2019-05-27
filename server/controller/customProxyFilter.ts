import {Request} from 'express'

const checkNeedForProxy = (req: Request) => {
    console.log(req)
    return true
}


export {
    checkNeedForProxy
}
