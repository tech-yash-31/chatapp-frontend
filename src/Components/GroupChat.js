import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import "../Pages/GroupChatStyle.css";

const GroupChat = () => {
  const { groupName } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [strangerCount, setStrangerCount] = useState(1);
  const [strangerMap, setStrangerMap] = useState({});
  const [mentions, setMentions] = useState(
    JSON.parse(localStorage.getItem(`mentions-${groupName}`)) || {}
  );
  const clientRef = useRef(null);
  const username = localStorage.getItem("username") || "Username";
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!groupName) return;

    const joinedGroups =
      JSON.parse(localStorage.getItem(`joinedGroups-${username}`)) || [];

    if (!joinedGroups.includes(groupName)) {
      joinedGroups.push(groupName);
      localStorage.setItem(
        `joinedGroups-${username}`,
        JSON.stringify(joinedGroups)
      );
    }

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

        const mentionedUser = extractMention(dataFromServer.message);
        if (mentionedUser) {
          setMentions((prevMentions) => {
            const updatedMentions = {
              ...prevMentions,
              [mentionedUser]: [
                ...(prevMentions[mentionedUser] || []),
                dataFromServer.message,
              ],
            };
            localStorage.setItem(
              `mentions-${groupName}`,
              JSON.stringify(updatedMentions)
            );
            return updatedMentions;
          });
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

  const extractMention = (message) => {
    const mentionPattern = /@(\w+)/;
    const match = message.match(mentionPattern);
    return match ? match[1] : null;
  };

  const handleLeaveGroup = () => {
    // Remove the group from joined groups in localStorage
    const joinedGroups =
      JSON.parse(localStorage.getItem(`joinedGroups-${username}`)) || [];
    const updatedGroups = joinedGroups.filter((group) => group !== groupName);

    localStorage.setItem(
      `joinedGroups-${username}`,
      JSON.stringify(updatedGroups)
    );

    // Navigate back to the home page after leaving the group
    navigate("/home");
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2>{groupName}</h2>
        <button className="btn btn-danger" onClick={handleLeaveGroup}>
          Leave Group
        </button>
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
      <div className="mentions">
        <h4>Your Mentions:</h4>
        {mentions[username] && mentions[username].length > 0 ? (
          mentions[username].map((mention, index) => (
            <p key={index}>{mention}</p>
          ))
        ) : (
          <p>No mentions yet.</p>
        )}
      </div>
    </div>
  );
};

export default GroupChat;
