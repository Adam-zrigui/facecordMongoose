import useConversationContext from "@/components/context/conversationContext";
import useSocketContext from "@/components/context/socketContext";
import useQueryParams from "@/components/hooks/useQueryParams";
import {Message} from "@/components/interfaces";
import React, {useEffect} from "react";

export const MessagesSideEffects = React.memo(() => {
  const {socket} = useSocketContext();
  const {addMessage} = useConversationContext();
  const queryParams = useQueryParams();
  const conversationId = String(queryParams.get("conversation_id"));

  useEffect(() => {
     socket.on("newMessage", (message: Message) => {
       if (message.conversationId === conversationId) {
         addMessage(message);
       }
     });

     socket.on("selfMessage", (message: Message) => {
       if (message.conversationId === conversationId) {
        addMessage(message);
       }
     });

     return () => {
       socket.off();
     };
  }, [conversationId]);

  return <></>;
});