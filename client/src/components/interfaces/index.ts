export interface User {
    id: string;
    username: string;
    photo: string;
  }
  
  export interface Contact {
    id: string;
    username: string;
    photo: string;
    conversationId: string;
    userId: string;
    unreadMessages: number;
    lastMessage: {
      text: string;
      updatedAt: string;
    };
    status: "online" | "offline";
  }
  
  export interface Conversation {
    id: string;
    participants: string[];
    messages: Message[];
  }
  
  export interface Message {
    id: string;
    from: string;
    text: string;
    createdAt: Date;
    conversationId:string;
  }
  
  export interface GetContactsResponse {
    contacts: Contact[];
  }
  
  export interface CreateContactResponse {
    message?: string;
    contact: Contact;
  }
  
  export interface ConversationResponse {
    conversation: Conversation;
  }
  
  export interface AuthCredentials {
    username: string;
    password: string;
  }
  
  export interface AuthResponse {
    user: User;
    jwt: string;
  }
  
  export interface logoutResponse {
    message: string;
  }