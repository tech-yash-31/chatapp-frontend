import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { w3cwebsocket as W3CWebSocket } from "websocket";

const GroupChat = () => {
  const { groupName } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [senderName, setSenderName] = useState("Username"); // Default sender name

  const client = groupName
    ? new W3CWebSocket(`ws://localhost:9090/chat/${groupName}`)
    : null;

  useEffect(() => {
    client.onopen = () => {
      console.log("WebSocket Client Connected");
    };

    client.onmessage = (message) => {
      try {
        const dataFromServer = JSON.parse(message.data);
        setMessages((prevMessages) => [...prevMessages, dataFromServer]);
      } catch (error) {
        console.error("Error parsing message from server:", error);
      }
    };

    // return () => {
    //   client.close();
    // };
  }, [groupName, client]);

  const sendMessage = () => {
    const messageData = {
      message: newMessage,
      senderName: senderName,
      groupName: groupName,
    };

    client.send(JSON.stringify(messageData));
    setNewMessage("");
  };

  return (
    <div className="container">
      <h2>Group Chat</h2>
      <div className="chat-window">
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.senderName}:</strong> {msg.message}
          </div>
        ))}
      </div>
      <div className="input-group mt-3">
        <input
          type="text"
          className="form-control"
          placeholder="Enter your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button className="btn btn-primary" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default GroupChat;
