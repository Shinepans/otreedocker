'use strict'

import * as fs from 'fs'
import * as Path from 'path'
import * as unzip from 'unzip'
import * as multer from 'multer'
import * as Express from 'express'

import * as dockerCompose from 'docker-compose'
import * as Proxy from 'http-proxy-middleware'

import {Request} from 'express'

import {checkNeedForProxy} from './controller'
import {useSessionSet, connectDB, usePassport, useView, useLog, /*checkDocker,*/ useRouter} from './appUtils'


interface IRequest extends Request {
    file: any
    _startTime: any
}

const app = Express()

connectDB()
useSessionSet(app)
usePassport(app)
useView(app)
useLog(app)
// checkDocker(app)
useRouter(app)

app.use((req: IRequest, res) => {
    if (req.url.includes('/index')) {
        res.sendFile(Path.resolve(__dirname, './pages/index.html'))
    }
    if (req.url.includes('/upload')) {
        const upload = multer({dest: 'uploads/'}).single('file')
        upload(req, res, (err) => {
            if (err instanceof multer.MulterError) {
                console.log(err)
            } else if (err) {
                console.log(err)
            }
            try {
                const fileName = req.file.originalname.split('.zip')[0]
                const hashName = `${fileName}_${Date.now()}`
                fs.createReadStream(req.file.path).pipe(unzip.Extract({path: `uploads/oTree/${hashName}`}))
                dockerCompose.down({cwd: '../', config: '', log: true}).then(() => {
                    console.log('done')
                }, (err) => {
                    console.log('something went wrong: ' + err.message)
                })
            } catch (err) {
                res.send(err)
            }
        })
    }
})


app.use((req, res) => {
    // Custom Proxy
    const needProxy = checkNeedForProxy(req)

})


app.listen(3000, () => console.log(`Start At 3000`))
