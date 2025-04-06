import React, { useState } from "react";
import "../Styles/Chat.css";

const Chat = () => {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = { role: "user", content: message };
    setChatHistory([...chatHistory, userMessage]);
    setMessage("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5189/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message, sessionId: "default" }),
      });

      const data = await response.json();
      setChatHistory([
        ...chatHistory,
        userMessage,
        { role: "assistant", content: data.reply },
      ]);
    } catch (error) {
      console.error("Error sending message: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-box">
        <div className="chat-history">
          {chatHistory.map((msg, index) => (
            <div key={index} className={`chat-message ${msg.role}`}>
              <strong>{msg.role === "user" ? "You" : "Librarian"}:</strong>{" "}
              {msg.content}
            </div>
          ))}
        </div>
        <div className="chat-input">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
          />
          <button onClick={sendMessage} disabled={loading}>
            {loading ? "Sending..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
