'use strict'

import * as fs from 'fs'
import * as Path from 'path'
import * as unzip from 'unzip'
import * as multer from 'multer'
import * as Express from 'express'

const app = Express()

app.use((req, res, next) => {
    req._startTime = new Date()
    let calResponseTime = () => {
        let now: any = new Date()
        let deltaTime = now - req._startTime
        console.log(`${req.method.toLowerCase()} ${req.url} -- ${deltaTime}ms ${new Date()} `)
    }
    res.once('finish', calResponseTime)
    next()
})

app.use((req, res) => {
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
                const hashName = `${fileName}-${Date.now()}`
                fs.createReadStream(req.file.path).pipe(unzip.Extract({path: `uploads/oTree/${hashName}`}))

            } catch (err) {
                res.send(err)
            }
        })
    }
})

app.listen(3000, () => console.log(`Start At 3000`))
