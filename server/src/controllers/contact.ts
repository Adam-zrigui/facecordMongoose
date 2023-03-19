import {Request, Response} from "express";
import { Prisma } from "../interfaces/app";
import {generic500Error} from "../utils/constants";

class ContactController {
  constructor(private prisma: Prisma) {}

  async getContacts(req: Request, res: Response) {
    try {
      const MyId = req.user?.id as string;
      const contacts = await this.prisma.Contact.find({
      userId: MyId
      }).sort("asc");

      return res.status(200).json({contacts});
    } catch (error) {
      return generic500Error(res, error);
    }
  }

  async createContact(req: Request, res: Response) {
    try {
      const MyId = req.user?.id as string;
      const {username}: {username: string} = req.body;

      // check if there is a user with the given username
      const relatedUser = await this.prisma.User.findOne({username});

      if (!relatedUser) {
        return res.status(404).json({message: "Could not find related contact"});
      }

      // check if the username is actually my user
      if (relatedUser.id === MyId) {
        return res.status(400).json({message: "Cannot add yourself as a contact"});
      }

      // check if the I already have this contact
      const isContactExists = await this.prisma.Contact.findOne({
       userId: MyId, username
      });

      if (isContactExists) {
        return res.status(400).json({message: "Contact already exists"});
      }

      // is there already a conversation between my user and the contact
      const foundConversation = await this.prisma.Conversation.findOne({
        participants: { $all: [MyId, relatedUser.id] }
      });

      // this flow is going to run if conversation exists
      if (foundConversation) {
        const contact = await this.newContact({
          userId: MyId,
          username,
          photo: relatedUser.photo,
          conversationId: foundConversation.id,
        });

        return res.status(201).json({message: "New contact created", contact});
      }

      // this flow is going to run if the conversation does not exists
      const conversation = await this.newConversation([MyId, relatedUser.id]);
      const contact = await this.newContact({
        userId: MyId,
        username,
        photo: relatedUser.photo,
        conversationId: conversation.id,
      });

      return res.status(201).json({message: "New contact created", contact});
    } catch (error) {
      return generic500Error(res, error);
    }
  }

  async newContact({
    userId,
    username,
    photo,
    conversationId,
  }: {
    userId: string;
    username: string;
    photo: string;
    conversationId: string;
  }) {
    const C = new this.prisma.Contact({userId, username, photo, conversationId})
    return await C.save();
  }

  async newConversation(idArray: string[]) {
    const C = new this.prisma.Conversation({participants:idArray});
    return await C.save();
  }
}

export default ContactController;
