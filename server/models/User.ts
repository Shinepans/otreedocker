import {Schema, model} from 'mongoose'

const bcrypt = require('bcrypt-nodejs')
import {UserDoc} from '../lib/interfaces'

const UserSchema = new Schema({
    createAt: Date,
    updateAt: Date,
    role: {type: Number, default: 0},
    name: {type: String},
    password: {type: String},
    mobile: {type: String, unique: true},
    gender: {type: String},
})

UserSchema.pre<UserDoc>('save', function (next) {
    const user = this
    if (user.isModified('password')) {
        this.createAt = this.updateAt = Date.now()
        if (!user.mobile) {
            user.mobile =
                'null' + Date.now() + '' + Math.floor(Math.random() * 10000)
        }
        bcrypt.genSalt(5, function (err, salt) {
            if (err) {
                return next(err)
            }
            bcrypt.hash(user.password, salt, null, (err, hash) => {
                if (err) {
                    return next(err)
                }
                user.password = hash
                next()
            })
        })
    } else {
        this.updateAt = Date.now()
        next()
    }
})

UserSchema.methods = {
    comparePassword: function (_password, cb) {
        bcrypt.compare(_password, this.password, function (err, isMatch) {
            if (err) {
                return cb(err)
            }
            cb(null, isMatch)
        })
    }
}
UserSchema.virtual('phone').get(function () {
    if (!this.mobile || this.mobile.indexOf('null') === 0) {
        return undefined
    }
    return this.mobile
})

export default model<UserDoc>('User', UserSchema)
