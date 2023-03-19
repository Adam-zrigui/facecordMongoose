import {Schema, model} from 'mongoose'
const m = new Schema({
    from: String,
    text: String,
    createdAt: { type: Date, default: Date.now },
    conversation: { type: Schema.Types.ObjectId, ref: 'Conversation' }
}, {timestamps:true})
const Message = model("Message",m)
export default Message