import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

export const App = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [socketState, setSocketState] = useState<Socket>();
  const [userId, setUserId] = useState(4);
  const [inputMessage, setInputMessage] = useState("");

  useEffect(() => {
    const socket = io("localhost:3000");
    setSocketState(socket);

    socket.on("message", (message: Message) => {
      console.log(message);

      setMessages((prevState) => [...prevState, message]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  interface Message {
    message: string;
    uid: number;
  }

  return (
    <div className="App">
      <h1>Chat w/ Socket.io</h1>
      <ul>
        {messages.map((message, index) => (
          <li
            key={index}
            style={{ color: message.uid === userId ? "blue " : "black" }}
          >
            {message.message}
          </li>
        ))}
      </ul>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (socketState) {
            socketState.emit("message", {
              message: inputMessage,
              uid: userId,
            });
          }
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
