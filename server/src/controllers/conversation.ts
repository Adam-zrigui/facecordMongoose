import {Request, Response} from "express";
import { Prisma } from "../interfaces/app";
import Conversation from "../models/conversation";

import {generic500Error} from "../utils/constants";

class ConversationController {
  constructor(private prisma: Prisma) {}

  async getConversation(req: Request, res: Response) {
    try {
      const myId = req.user?.id as string;
      const conversationId = req.params.id;
      if (typeof conversationId !== "string") {
        return res.status(400).json({message: "Conversation id is not a string..."});
      }

      const conversation = await this.prisma.Conversation.findById(conversationId).populate({
        path: 'messages',
        options: { sort: { createdAt: 'asc' } }
      });
      
      if (!conversation) {
        return res.status(404).json({message: "Could not find the conversation"});
      }

      if (!this.isMyConversation(myId, conversation)) {
        return res.status(401).json({message: "No access to this conversation"});
      }

      return res.status(200).json({conversation});
    } catch (error) {
      generic500Error(res, error);
    }
  }

  async createMessage(req: Request, res: Response) {
    try {
      const myId = req.user?.id as string;
      const {text, conversationId}: {text: string; conversationId: string} = req.body;

      const conversation = await this.prisma.Conversation.findById({
           conversationId,
      });

      if (!conversation) {
        return res.status(404).json({message: "Could not find the conversation"});
      }

      if (!this.isMyConversation(myId, conversation)) {
        return res.status(401).json({message: "No access to this conversation"});
      }

      const newMessage = new this.prisma.Message({
          from: myId,
          text,
          conversationId,
        },
      );
await newMessage.save();
      return res.status(201).json({message: newMessage});
    } catch (error) {
      generic500Error(res, error);
    }
  }

  isMyConversation(id: string, conversation: any) {
    return conversation.participants.includes(id);
  }
}

export default ConversationController;
