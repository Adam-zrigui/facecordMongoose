import {Schema, model} from 'mongoose'
import Contact from './contact'
import Message from './Message'

const m : Schema= new Schema({
    participants: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    messages: [{ type: Schema.Types.ObjectId, ref: 'Message' }],
    contacts: [{ type: Schema.Types.ObjectId, ref: 'Contact' }]
}, {timestamps:true})
const Conversation = model("Conversation", m)
export default Conversation