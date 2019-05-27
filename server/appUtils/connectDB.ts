'use strict'

import {settings} from '../configs/settings'


const mongoose = require('mongoose')
mongoose.Promise = require('bluebird')

const {mongoUri, mongoUser, mongoPass} = settings
const connectOptions = mongoUser ? {user: mongoUser, pass: mongoPass, useMongoClient: true} : {useMongoClient: true}

const connectDB = async () => {
    await mongoose.connect(mongoUri, connectOptions)
    mongoose.connection.on('error', function () {
        console.error('MongoDB Connection Error. Please make sure MongoDB is running.')
    })
}

export {
    connectDB
}
