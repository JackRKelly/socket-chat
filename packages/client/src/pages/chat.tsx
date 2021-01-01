import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { Message, MessageType } from "shared/lib";

export const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [socketState, setSocketState] = useState<Socket>();
  const [userId] = useState(Math.floor(Math.random() * 100));
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
                    {message.uid}: {message.content}
                  </li>
                ))}
              </ul>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (socketState) {
                    socketState.emit("message", {
                      type: MessageType.MESSAGE,
                      content: inputMessage,
                      uid: userId,
                    });
                  }
                  setInputMessage("");
                }}
              >
                <div className="flex">
                  <div className="flex-1">
                    <label htmlFor="email" className="sr-only">
                      Email
                    </label>
                    <input
                      type="text"
                      name="message"
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      className="border p-2 block w-full shadow-sm placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                      placeholder="Message"
                    />
                  </div>
                  <button
                    type="submit"
                    className="p-2 flex-3 inline-flex justify-center border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Send
                  </button>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
