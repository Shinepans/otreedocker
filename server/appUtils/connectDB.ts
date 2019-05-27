'use strict'

import {settings} from '../configs/settings'


const mongoose = require('mongoose')
mongoose.Promise = require('bluebird')

const {mongoUri, mongoUser, mongoPass} = settings
const connectOptions = mongoUser ? {
    user: mongoUser,
    pass: mongoPass,
    useNewUrlParser: true,
    useCreateIndex: true,
} : {useNewUrlParser: true, useCreateIndex: true,}

const connectDB = () => {
    mongoose.connect(mongoUri, connectOptions).then()
    mongoose.connection.on('error', function () {
        console.error('MongoDB Connection Error. Please make sure MongoDB is running.')
    })
}

export {
    connectDB
}
