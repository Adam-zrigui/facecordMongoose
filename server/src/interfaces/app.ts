import Contact from "../models/contact";
import Conversation from "../models/conversation";
import Message from "../models/Message";
import User from "../models/user";

declare global {
  namespace Express {
    export interface Request {
      user?: DecodedUser;
    }
  }
}
export interface DecodedUser {
  id: string;
  username: string;
}
export interface Prisma {
  User: typeof User,
  Conversation: typeof Conversation,
  Message: typeof Message,
  Contact: typeof Contact
}
