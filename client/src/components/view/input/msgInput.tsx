import useAuthContext from "@/components/context/authContext";
import useConversationContext from "@/components/context/conversationContext";
import useSocketContext from "@/components/context/socketContext";
import useQueryParams from "@/components/hooks/useQueryParams";
import {IoSendSharp} from "react-icons/io5";
import React, {useRef, useCallback} from "react";
type NewEvent = React.KeyboardEvent<HTMLInputElement> | React.MouseEvent<SVGElement, MouseEvent>;

export const MessageInput: React.FC = () => {
  const {user} = useAuthContext();
  const {socket} = useSocketContext();
  const queryParams = useQueryParams();
  const {conversation} = useConversationContext();
  const conversationId = queryParams.get("conversation_id");
  const ref = useRef(null);

  const sendMessage = useCallback(
    (ref: React.MutableRefObject<null | HTMLInputElement>) => {
      if (!ref?.current?.value) {
        return;
      }
      const newMessage = {
        text: ref.current.value,
        from: user?.id,
        conversationId: conversationId,
        createdAt: new Date(),
      };

      console.log({newMessage, conversation, user});
      socket.emit("message", {message: newMessage, conversation: conversation, myUserId: user?.id});
      ref.current.value = "";
    },
    [conversation, user]
  );

  const onSubmit = useCallback(
    (event: NewEvent, ref: React.MutableRefObject<null | HTMLInputElement>) => {
      if (!conversation) {
        return;
      }

      if (event.type === "keydown") {
        if ((event as React.KeyboardEvent).key !== "Enter") {
          return;
        }
        return sendMessage(ref);
      } else {
        return sendMessage(ref);
      }
    },
    [conversation]
  );

  return (
    <div>
      <input
        onKeyDown={(event) => onSubmit(event, ref)}
        ref={ref}
        placeholder="Write a message..."
      />
      <IoSendSharp onClick={(event) => onSubmit(event, ref)} />
    </div>
  );
};

