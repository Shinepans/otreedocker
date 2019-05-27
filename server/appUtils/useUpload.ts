import * as fs from 'fs'
import * as unzip from 'unzip'
import * as multer from 'multer'
import * as dockerCompose from "docker-compose"
import {Request} from "express"

interface IRequest extends Request {
    file: any
}


const useUpload = (app) => {
    app.use((req: IRequest, res) => {
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
}

export {
    useUpload
}
