import { Socket } from "socket.io";

export interface Message {
  type: string;
  content: string;
  uid?: number;
  name?: string;
}

export interface JoinChat {
  uid: number;
}

export type JoinSocket = Socket & { uid?: number; name?: string };
