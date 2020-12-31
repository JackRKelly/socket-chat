import express, { Request, Response } from "express";
import cors from "cors";
import { Socket } from "socket.io";

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

interface Message {
  message: string;
  uid: number;
}

app.get("/", function (req: Request, res: Response) {
  res.send("Hello Socket");
});
app.use(cors());

io.on("connection", (socket: Socket) => {
  let msg = { message: "hello welcome to socket chat!", uid: 5 };

  socket.emit("message", msg);

  socket.on("message", (msg: Message) => {
    io.emit("message", msg);
    console.log(`message recieved from ${msg.uid}: ${msg.message}`);
  });
});

io.on("connection", (socket: Socket) => {
  console.log("a user connected");

  io.on("disconnect", () => {
    console.log("user disconnected");
  });
});

http.listen(3000, () => {
  console.log("Server listening on port 3000");
});
