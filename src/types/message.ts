export const MessageStatus = {
  Sending: 'sending',
  Sent: 'sent',
  Read: 'read',
  Failed: 'failed',
} as const;

export type MessageStatus =
  (typeof MessageStatus)[keyof typeof MessageStatus];

export const MessageAuthor = {
  User: 'user',
  Bot: 'bot',
} as const;

export type MessageAuthor =
  (typeof MessageAuthor)[keyof typeof MessageAuthor];

export interface Message {
  id: string;
  author: MessageAuthor;
  text: string;
  timestamp: number;
  status: MessageStatus;
}
