import express, { Request, Response } from "express";
import { Message, JoinSocket, JoinChat } from "shared/src";
import cors from "cors";

require("dotenv").config();
const app = express();
const http = require("http").createServer(app);
const socketIO = require("socket.io");
const io = socketIO(http, {
  cors: {
    origin: "http://localhost:5000",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.get("/", function (req: Request, res: Response) {
  res.send("Hello Socket");
});
app.use(cors({ origin: "http://localhost:5000" }));

io.on("connection", (socket: JoinSocket) => {
  console.log("User has connected.");

  socket.on("join chat", (join: JoinChat) => {
    //Emit message to all users including sender
    socket.uid = join.uid;

    io.emit("message", {
      type: "message",
      content: `${join.uid} has connected.`,
      uid: 0,
    });
    console.log(`${join.uid} has joined the chat`);
  });

  socket.emit("request join");

  socket.on("message", (msg: Message) => {
    //Emit message to all users including sender
    msg.uid = socket.uid;
    io.emit("message", msg);
    console.log(`${socket.uid} said ${msg.content}`);
  });

  io.on("disconnect", (socket: JoinSocket) => {
    console.log(`${socket.uid} disconnected`);
  });
});

const port = process.env.PORT || 8080;
http.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
