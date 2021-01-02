import { Socket } from "socket.io";

export interface Message {
  type: string;
  content: string;
  uid: number;
  name?: string;
}

export interface JoinChat {
  name: string;
}

export type JoinSocket = Socket & { name?: string };
