import {getConversation} from "@/components/api/userApi";
import useConversationContext from "@/components/context/conversationContext";
import useOnScreen from "@/components/hooks/useOnScreen";
import useQueryParams from "@/components/hooks/useQueryParams";
import {useQuery} from "@tanstack/react-query";
import React, {useEffect, useRef} from "react";
import {Message} from "./msg";
import {MessagesSideEffects} from "./Sideeff";

const Messages: React.FC = () => {
  const {setConversation, conversation} = useConversationContext();
  const queryParams = useQueryParams();
  const conversationId = String(queryParams.get("conversation_id"));
  const bottomRef = useRef<HTMLDivElement>(null);
  const isVisible = useOnScreen(bottomRef);
  const {isLoading, isFetching} = useQuery(
    ["conversation", conversationId],
    () => getConversation(conversationId),
    {
      enabled: !!conversationId && conversationId !== '',
      onSuccess: (data) => {
        setConversation(data.conversation);
      },
    }
  );

  useEffect(() => {
    bottomRef.current?.scrollIntoView({behavior: "smooth"});

    return () => {};
  }, [isVisible, conversationId])

  return (
    <div>
      {isLoading && isFetching ? (
        <p>Loading...</p>
      ) : (
        <>
          {conversation && conversation?.messages?.length > 0 ? (
            conversation?.messages.map((message) => <Message message={message} key={message.id} />)
          ) : (
            <p>No messages yet</p>
          )}
        </>
      )}

      <div ref={bottomRef}></div>
      <MessagesSideEffects />
    </div>
  );
};


export default Messages;