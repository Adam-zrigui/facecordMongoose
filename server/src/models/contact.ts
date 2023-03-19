import {Schema, model} from 'mongoose'
import User from './user'

const m : Schema = new Schema({
    username: String,
    photo: String,
    conversation: { type:Schema.Types.ObjectId, ref: 'Conversation' },
    lastMessage: Object,
    unreadMessages: { type: Number, default: 0 },
    status: { type: String, enum: ['online', 'offline'], default: 'offline' },
    createdAt: { type: Date, default: Date.now },
    user: { type:Schema.Types.ObjectId, ref: 'User' }
}, {timestamps:true})
const Contact = model("Contact",m)
export default Contact