import axiosInstance from "./instance";
import {ConversationResponse, CreateContactResponse, GetContactsResponse} from "@/components/interfaces";
import {getItemFromLocalStorage} from "@/components/utils/localS";

const defaultHeaders = () => {
  return {
    Authorization: `Bearer ${getItemFromLocalStorage("jwt")}`,
    "Content-type": "application/json",
  };
};

export const getContacts = (): Promise<GetContactsResponse> =>
  axiosInstance.get("/contact", {headers: defaultHeaders()}).then((response) => response.data);

export const createContact = (username: string): Promise<CreateContactResponse> =>
  axiosInstance
    .post("/contact", {username}, {headers: defaultHeaders()})
    .then((response) => response.data);

export const getConversation = (id: string | null): Promise<ConversationResponse> =>
  axiosInstance
    .get(`/conversation/${id}`, {headers: defaultHeaders()})
    .then((response) => response.data);