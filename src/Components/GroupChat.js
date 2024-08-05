import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import "../Pages/GroupChatStyle.css";

const GroupChat = () => {
  const { groupName } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [strangerCount, setStrangerCount] = useState(1);
  const [strangerMap, setStrangerMap] = useState({});
  const clientRef = useRef(null);
  const username = localStorage.getItem("username") || "Username";
  const inputRef = useRef(null);

  useEffect(() => {
    if (!groupName) return;

    const client = new W3CWebSocket(`ws://localhost:9090/chat/${groupName}`);
    clientRef.current = client;

    client.onopen = () => {
      console.log("WebSocket Client Connected");
    };

    client.onmessage = (message) => {
      try {
        const dataFromServer = JSON.parse(message.data);

        if (
          !strangerMap[dataFromServer.senderName] &&
          dataFromServer.senderName !== username
        ) {
          setStrangerMap((prevMap) => ({
            ...prevMap,
            [dataFromServer.senderName]: `stranger ${strangerCount}`,
          }));
          setStrangerCount((prevCount) => prevCount + 1);
        }

        setMessages((prevMessages) => [...prevMessages, dataFromServer]);
      } catch (error) {
        console.error("Error parsing message from server:", error);
      }
    };

    return () => {
      client.close();
    };
  }, [groupName, strangerMap, strangerCount, username]);

  const sendMessage = () => {
    if (newMessage.trim() === "") return;

    const messageData = {
      message: newMessage,
      senderName: username,
      groupName: groupName,
    };

    if (clientRef.current) {
      clientRef.current.send(JSON.stringify(messageData));
    }

    setNewMessage("");
    inputRef.current.focus();
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2>{groupName}</h2>
      </div>
      <div className="chat-window">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${
              msg.senderName === username ? "sent" : "received"
            }`}
          >
            <strong>
              {msg.senderName === username ? "me" : strangerMap[msg.senderName]}
              :
            </strong>{" "}
            {msg.message}
          </div>
        ))}
      </div>
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="Enter your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          ref={inputRef}
        />
        <button className="btn btn-primary" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default GroupChat;
