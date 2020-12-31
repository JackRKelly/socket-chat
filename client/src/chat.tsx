import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

export const Chat = () => {
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
    <div className="min-h-screen bg-white">
      <div className="py-10">
        <header>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold leading-tight text-gray-900">
              Chat
            </h1>
          </div>
        </header>
        <main>
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="px-4 py-4 sm:px-0">
              <ul>
                {messages.map((message, index) => (
                  <li
                    key={index}
                    style={{
                      color: message.uid === userId ? "blue " : "black",
                    }}
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
                <div>
                  <label htmlFor="email" className="sr-only">
                    Email
                  </label>
                  <input
                    type="text"
                    name="message"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Message"
                  />
                </div>
                <button type="submit">Send</button>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
