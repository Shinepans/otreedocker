import {Schema, model} from 'mongoose'

import {UserOTreeRec} from '../lib/interfaces'

const {ObjectId} = Schema.Types
const UserOTreeRecSchema = new Schema({
    createAt: {type: Date, default: Date.now},
    updateAt: {type: Date, default: Date.now},
    user: {type: ObjectId, ref: 'User'},
    host: String,
    port: Number,
    uniKey: {type: String, unique: true}
})

UserOTreeRecSchema.pre<UserOTreeRec>('save', function (next) {
    this.updateAt = Date.now()
    next()
})

export default model<UserOTreeRec>('UserOTreeRec', UserOTreeRecSchema)
