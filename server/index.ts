import express, { Request, Response } from "express";
import cors from "cors";

const app = express();
const http = require("http").createServer(app);
const io = require("socket.io");
const socket = io(http, {
  cors: {
    origin: "http://127.0.0.1:5500",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.get("/", function (req: Request, res: Response) {
  res.send("Hello Socket");
});
app.use(cors());

socket.on("connection", (socket: any) => {
  socket.on("message", (msg: any) => {
    socket.emit("chat message", msg);
    console.log(msg);
  });
});

http.listen(3000, () => {
  console.log("Server listening on port 3000");
});
