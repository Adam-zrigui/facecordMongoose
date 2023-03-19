import { Socket } from "socket.io";
import { DisconnectReason } from "socket.io/dist/socket";
import { Prisma } from "../interfaces/app";
import Contact from "../models/contact";
import Message from "../models/Message";
import User from "../models/user"
const onlineUsers = new Map();
type HandshakeUserId = string | string[] | undefined;
type WebSocketType = {
  connection(userId: HandshakeUserId): void;
  disconnect(reason: DisconnectReason, userId: HandshakeUserId): void;
  login(userId: string): void;
  logout(userId: string): void;
  message(message: any, conversation: any, myUserId: string): Promise<void>;
  conversationChange(conversationId: string, myUserId: string): Promise<void>;
};

class WebSocket implements WebSocketType {
  constructor(private socket: Socket, private prisma: Prisma) {}
  connection(userId: HandshakeUserId) {
    if (userId && userId !== "undefined") {
      onlineUsers.set(userId, { socketRef: this.socket.id });
    }
  }
  disconnect(reason: DisconnectReason, userId: HandshakeUserId) {
    if (userId && userId !== "undefined") {
      onlineUsers.delete(userId);
      this.socket.disconnect();
    }
  }
  async login(userId: string) {
    onlineUsers.set(userId, { socketRef: this.socket.id });
  }

  logout(userId: string) {
    onlineUsers.delete(userId);
  }

  async message(message: any, conversation: any, myUserId: string) {
    // first flow of every message event
    const myUser = await User.findById(myUserId);
    if (!myUser) {
      return;
    }
    const newMessage = new Message({ ...message });
    await newMessage.save();
    const filteredMyUserId = conversation.participants.filter(
      (id: string) => id !== myUserId
    );
    const otherUserId = filteredMyUserId[0];
    const relatedUser = await User.findById(otherUserId);
    const isRelatedUserOnline = onlineUsers.has(relatedUser?.id);
    const isContactExists = await Contact.findOne({
      userId: otherUserId,
      username: myUser?.username,
    });

    if (!isContactExists) {
      if (!relatedUser) {
        return;
      }
    
      const newContact = new Contact({
        username: myUser.username,
        photo: myUser.photo,
        conversationId: conversation.id,
        userId: relatedUser.id,
        lastMessage: {
          text: message.text,
          updatedAt: String(message.createdAt),
        },
        unreadMessages: 1,
      });
      await newContact.save();
      if (isRelatedUserOnline) {
        this.socket
          .to(onlineUsers.get(otherUserId)?.socketRef)
          .emit("newContact", newContact);
      }
    }
    
    if (isContactExists) {
      const prevUnreadMessages = isContactExists.unreadMessages;
      const contactId = isContactExists.id;
      let updatedUnreadMessagesCount = prevUnreadMessages;
      const onlineUser = onlineUsers.get(otherUserId);
    
      if (onlineUser?.conversationId !== message.conversationId) {
        updatedUnreadMessagesCount = prevUnreadMessages + 1;
      }
    
      const updatedContact = await Contact.findByIdAndUpdate(
        contactId,
        {
          lastMessage: {
            text: message.text,
            updatedAt: String(message.createdAt),
          },
          unreadMessages: updatedUnreadMessagesCount,
        },
        { new: true }
      );
    
      if (isRelatedUserOnline) {
        this.socket.to(onlineUsers.get(otherUserId)?.socketRef).emit("newContact", updatedContact);
      }
    }
      if (isContactExists) {
      const prevUnreadMessages = isContactExists.unreadMessages;
      const contactId = isContactExists.id;
      let updatedUnreadMessagesCount = prevUnreadMessages;
      const onlineUser = onlineUsers.get(otherUserId);
      if (onlineUser?.conversationId !== message.conversationId) {
        updatedUnreadMessagesCount = prevUnreadMessages + 1;
      }
      
      const updatedContact = await this.prisma.Contact.findByIdAndUpdate(contactId, {
        lastMessage: {
          text: message.text,
          updatedAt: String(message.createdAt),
        },
        unreadMessages: updatedUnreadMessagesCount,
      });
      
      if (isRelatedUserOnline) {
        this.socket.to(onlineUsers.get(otherUserId)?.socketRef).emit("newMessage", newMessage);
        this.socket
          .to(onlineUsers.get(otherUserId)?.socketRef)
          .emit("updateContactValues", updatedContact);
      }
    }

 
    
    this.socket.emit("selfMessage", newMessage);

    const myContact = await this.prisma.Contact.findOne({
    userId: myUserId,
    username: relatedUser?.username,
    });
    
    if (!myContact) {
    return;
    }
    
    const myUpdatedContact = await this.prisma.Contact.findByIdAndUpdate(myContact.id, {
    lastMessage: {
    text: message.text,
    updatedAt: String(message.createdAt),
    },
    });
    
    this.socket.emit("updateMyContact", myUpdatedContact);
    }
    
    async conversationChange(conversationId: string, myUserId: string) {
    try {
    onlineUsers.set(myUserId, {
    socketRef: this.socket.id,
    conversationId: conversationId ?? null,
    });
    const contact = await this.prisma.Contact.findById({
    userId: myUserId,
    conversationId,
    });
    if (!contact) {
    return;
    }
    const contactId = typeof contact.id === 'string' ? contact.id : contact.id.toHexString();
    const updatedContact = await this.prisma.Contact.findByIdAndUpdate(
      contactId,
      { unreadMessages: 0 },
      { new: true }
    );
    
    this.socket.emit("updateMyContact", updatedContact);
  } catch (error) {
    console.log(error);
    }
    }
    }
    
    export default WebSocket;          