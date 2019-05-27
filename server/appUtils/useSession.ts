'use strict'

import * as redis from 'redis'
import * as session from 'express-session'

import {settings} from '../configs/settings'

const RedisStore = require('connect-redis')(session)
const redisClient = redis.createClient(settings.redisPort, settings.redisHost)

/**
 * ttl: 单位为秒
 * maxAge: 单位为毫秒
 */
const sessionSet = {
    name: "academy.sid",
    resave: true,
    saveUninitialized: false,
    secret: settings.sessionSecret,
    store: new RedisStore({
        client: redisClient,
        ttl: 60 * 60 * 24 * 7,
        auto_reconnect: true,
    }),
    cookie: {
        path: '/',
        maxAge: 1000 * 60 * 60 * 24 * 7,
    },
}

const useSessionSet = (app) => {
    app.use(session(sessionSet))
}

export {
    useSessionSet
}
