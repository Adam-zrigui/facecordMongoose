import {Contact as ContactI} from "@/components/interfaces";
import React, {useCallback} from "react";
import {useNavigate} from "react-router-dom";
import useQueryParams from "@/components/hooks/useQueryParams";
import moment from "moment";

export const Contact: React.FC<{contact: ContactI}> = React.memo((props) => {
  const {photo, username, conversationId, unreadMessages, lastMessage} = props.contact;
  const queryParams = useQueryParams();
  const navigate = useNavigate();
  const activeConversationId = String(queryParams.get("conversation_id"));
  const isActiveChat = conversationId === activeConversationId;
  const onClick = useCallback(() => {
    navigate(`/?conversation_id=${conversationId}`);
  }, [conversationId]);

  return (
    <div is-activechat={isActiveChat.toString()}>
      <img onClick={onClick} alt="Avatar image" src={photo} />
      <div onClick={onClick}>
        <h3>{username}</h3>
        <p>{lastMessage ? lastMessage.text : "No messages yet"}</p>
        <p>
          {lastMessage ? `Last message: ${moment(lastMessage.updatedAt).format("L")}` : null}
        </p>
      </div>

      {unreadMessages ? <p>{unreadMessages}</p> : null}
    </div>
  );
});

