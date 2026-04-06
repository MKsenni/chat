import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  type Message,
  MessageStatus,
  MessageAuthor,
} from '../types/message';
import {
  sendMessage as sendToServer,
  getBotReply,
} from '../services/messageService';

interface ChatState {
  messages: Message[];
  isBotTyping: boolean;
  sendMessage: (text: string) => void;
  retryMessage: (id: string) => void;
}

export const useChatStore = create<ChatState>()(
  persist(
    (set) => {
      const processMessage = async (id: string) => {
        try {
          await sendToServer();

          set((state) => ({
            messages: state.messages.map((m) =>
              m.id === id ? { ...m, status: MessageStatus.Sent } : m,
            ),
          }));

          setTimeout(() => {
            set((state) => ({
              messages: state.messages.map((m) =>
                m.id === id ? { ...m, status: MessageStatus.Read } : m,
              ),
            }));

            set({ isBotTyping: true });
          }, 1000 + Math.random() * 1000);

          const reply = await getBotReply();

          set((state) => ({
            isBotTyping: false,
            messages: [
              ...state.messages,
              {
                id: crypto.randomUUID(),
                author: MessageAuthor.Bot,
                text: reply,
                timestamp: Date.now(),
                status: MessageStatus.Read,
              },
            ],
          }));
        } catch {
          set((state) => ({
            messages: state.messages.map((m) =>
              m.id === id ? { ...m, status: MessageStatus.Failed } : m,
            ),
          }));
        }
      };

      return {
        messages: [],
        isBotTyping: false,

        sendMessage: (text: string) => {
          const id = crypto.randomUUID();
          const message: Message = {
            id,
            author: MessageAuthor.User,
            text,
            timestamp: Date.now(),
            status: MessageStatus.Sending,
          };

          set((state) => ({ messages: [...state.messages, message] }));
          processMessage(id);
        },

        retryMessage: (id: string) => {
          set((state) => ({
            messages: state.messages.map((m) =>
              m.id === id ? { ...m, status: MessageStatus.Sending } : m,
            ),
          }));
          processMessage(id);
        },
      };
    },
    {
      name: 'chat-storage',
      partialize: (state) => ({ messages: state.messages }),
      onRehydrateStorage: () => {
        return (state?: ChatState) => {
          if (!state) return;

          state.messages = state.messages.map((m) =>
            m.status === MessageStatus.Sending
              ? { ...m, status: MessageStatus.Failed }
              : m,
          );

          if (state.messages.length === 0) {
            state.messages = [
              {
                id: crypto.randomUUID(),
                author: MessageAuthor.Bot,
                text: 'Бу! Напугался?! Не бойся! Я твой друг! Давай дружить!',
                timestamp: Date.now(),
                status: MessageStatus.Read,
              },
            ];
          }
        };
      },
    },
  ),
);
