import { useEffect, useState } from "react";
import { io } from "socket.io-client";

export const App = () => {
  const [messages, setMessages] = useState<string[]>([]);

  const [inputMessage, setInputMessage] = useState("");

  const socket = io("localhost:3000");

  useEffect(() => {
    socket.on("message", (message: string) => {
      setMessages((prevState) => [...prevState, message]);
    });
  }, [socket]);

  return (
    <div className="App">
      <h1>Chat w/ Socket.io</h1>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          socket.emit("message", inputMessage);
          setInputMessage("");
        }}
      >
        <input
          type="text"
          name="message"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};
