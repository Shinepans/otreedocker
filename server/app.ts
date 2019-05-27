'use strict'

import * as Express from 'express'
import {
    useSessionSet,
    connectDB,
    usePassport,
    useView,
    useLog, /*checkDocker,*/
    useRouter,
    useBodyParser,
    useUpload
} from './appUtils'

const app = Express()

connectDB()
useSessionSet(app)
usePassport(app)
useView(app)
useLog(app)
// checkDocker(app)
useBodyParser(app)
useRouter(app)
useUpload(app)

app.listen(3000, () => console.log(`Start At 3000`))
