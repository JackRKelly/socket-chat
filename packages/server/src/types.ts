export enum MessageType {
  INDICATOR,
  MESSAGE,
}

export interface Message {
  type: MessageType;
  content: string;
  uid: number;
}
