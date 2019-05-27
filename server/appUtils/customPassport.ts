'use strict'

const passport = require('passport')
const User = require('../models/User')
const LocalStrategy = require('passport-local').Strategy

passport.serializeUser(function (user, done) {
    done(null, user._id)
})
passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user)
    })
})

/**
 * LocalStrategy
 *
 * This strategy is used to authenticate users based on a username and password.
 * Anytime a request is made to authorize an application, we must ensure that
 * a user is logged in before asking them to approve the request.
 */
passport.use(new LocalStrategy({usernameField: 'mobile'}, function (phoneno, password, done) {
    User.findOne({mobile: phoneno}, function (err, user) {
        if (!user) return done(null, false, {message: '验证失败'})
        user.comparePassword(password, function (err, isMatch) {
            if (isMatch) {
                delete user.password
            } else {
                return done('not match', false, {message: '验证失败'})
            }
        })
    })
}))


