import React from "react";
import useAuthContext from "@/components/context/authContext";
import {Message as MessageI} from "@/components/interfaces";
import moment from "moment";

export const Message = React.memo(({message}: {message: MessageI}) => {
  const {user} = useAuthContext();
  const isMyMessage = user?.id === message.from;

  return (
    <div is-mymessage={isMyMessage}>
      <p>{message.text}</p>
      <p>{moment(message.createdAt).format("lll")}</p>
    </div>
  );
});
