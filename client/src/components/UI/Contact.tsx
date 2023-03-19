import {getContacts} from "@/components/api/userApi";
import useAuthContext from "@/components/context/authContext";
import useContactsContext from "@/components/context/ContactContext";
import useSocketContext from "@/components/context/socketContext";
import useQueryParams from "@/components/hooks/useQueryParams";
import {Contact} from "@/components/interfaces";
import {useQuery} from "@tanstack/react-query";
import React, {useEffect} from "react";

import {Contact as ContactComponent} from "./C2";

export const Contacts: React.FC = () => {
  const {isLoading} = useQuery(["contacts"], getContacts, {
    onSuccess: (data) => {
      setContacts(data.contacts);
    },
  });
  const {
    filteredContacts,
    setContacts,
    addContact,
    updateContactValues,
    filterKey,
    filterContacts,
    contacts,
  } = useContactsContext();
  const queryParams = useQueryParams();
   const conversationId = String(queryParams.get("conversation_id"));
   const {user} = useAuthContext();

   const {socket} = useSocketContext();

   useEffect(() => {
     socket.on("newContact", (contact: Contact) => addContact(contact));
     socket.on("updateContactValues", (contact: Contact) => updateContactValues(contact));
     socket.on("updateMyContact", (contact: Contact) => updateContactValues(contact));
     socket.emit("conversationChange", {conversationId, myUserId: user?.id});

     return () => {
       socket.off();
     };
   }, [conversationId]);

  useEffect(() => {
    filterContacts();
  }, [filterKey, contacts]);

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          {filteredContacts && filteredContacts.length > 0 ? (
            filteredContacts?.map((contact) => (
              <ContactComponent key={contact.id}  contact={contact} />
            ))
          ) : (
            <p>No contacts found</p>
          )}
        </>
      )}
    </div>
  );
};

