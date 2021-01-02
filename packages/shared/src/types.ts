import { Socket } from "socket.io";

export interface Message {
  type: string;
  content: string;
  uid?: number;
}

export interface JoinChat {
  uid: number;
}

export type JoinSocket = Socket & { uid?: number };
