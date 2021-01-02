import { MutableRefObject, useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { Message } from "shared/src";

export const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [socketState, setSocketState] = useState<Socket>();
  const [joinedChat, setJoinedChat] = useState(false);
  const [userId] = useState(5);
  const [inputMessage, setInputMessage] = useState("");
  const refContainer = useRef<HTMLLIElement | null>(null);

  const scrollToTop = () => {
    console.log(refContainer);

    if (refContainer) {
      const { current } = refContainer;
      if (current) {
        current.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  useEffect(() => {
    const socket = io("localhost:3000");
    setSocketState(socket);

    //Sent from server after socket connection
    socket.on("request join", () => {
      //Link uid to socket
      socket.emit("join chat", { uid: userId });
      setJoinedChat(true);
    });

    socket.on("message", (message: Message) => {
      setMessages((prevState) => [message, ...prevState]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId]);

  return (
    <div className="bg-white">
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
            <div className="max-h-96 px-4 py-4 sm:px-0 overflow-y-scroll">
              <ul className="pr-4 flex flex-row flex-wrap">
                <li ref={refContainer}></li>
                {messages.map((message, index) => (
                  <li
                    key={index}
                    className={`w-full flex flex-column ${
                      message.uid === 0
                        ? "justify-center"
                        : message.uid === userId
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div className="inline-block my-2 ">
                      {message.uid === 0 ? <></> : <span>{message.name}</span>}
                      <div
                        className={`p-2 text-base font-medium text-white rounded-sm ${
                          message.uid === 0
                            ? "text-gray-800"
                            : message.uid === userId
                            ? "bg-gray-500"
                            : "bg-indigo-500"
                        }`}
                      >
                        <p>{message.content}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();

                if (socketState && inputMessage && joinedChat) {
                  socketState.emit("message", {
                    type: "message",
                    content: inputMessage,
                  });
                }
                scrollToTop();
                setInputMessage("");
              }}
              className="my-4"
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
                    required
                    disabled={!joinedChat}
                    onChange={(e) => {
                      setInputMessage(e.target.value);
                    }}
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
        </main>
      </div>
    </div>
  );
};
