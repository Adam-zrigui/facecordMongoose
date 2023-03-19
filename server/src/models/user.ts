import { model, Schema } from "mongoose";


const m = new Schema({
    username: { type: String, unique: true, required:true },
  photo: {
  type:  String,
  required:true,
},
  password: {
    required:true,
    type:String
},
  createdAt: { type: Date, default: Date.now },
  contacts: [{ type: Schema.Types.ObjectId, ref: 'Contact' }]
}, {timestamps:true}) 
const User = model("User", m);
export default User