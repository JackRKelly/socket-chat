import { useEffect, useState } from "react";

export const App = () => {
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    setMessages(["test", "tset"]);
  }, []);

  return (
    <div className="App">
      <h1>Chat w/ Socket.io</h1>
      <ul>
        {messages.map((message) => (
          <li>{message}</li>
        ))}
      </ul>
    </div>
  );
};
