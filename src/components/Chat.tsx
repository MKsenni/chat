import { memo, useCallback } from 'react';
import { type Message, MessageAuthor, MessageStatus } from '../types/message';
import MessageList from './MessageList';
import ChatInput from './ChatInput';

const MOCK_MESSAGES: Message[] = [
  {
    id: '1',
    author: MessageAuthor.Bot,
    text: 'Привет! Я бот-помощник. Чем могу помочь?',
    timestamp: Date.now() - 100_000,
    status: MessageStatus.Read,
  },
  {
    id: '2',
    author: MessageAuthor.User,
    text: 'Привет! Расскажи о проекте.',
    timestamp: Date.now(),
    status: MessageStatus.Read,
  }
];

const Chat = memo(function Chat() {
  const handleSend = useCallback((text: string) => {
    console.info('Send:', text);
  }, []);

  const handleRetry = useCallback((id: string) => {
    console.info('Retry:', id);
  }, []);

  return (
    <section className="flex h-svh flex-col bg-surface-white sm:mx-auto sm:my-4 sm:h-[calc(100svh-2rem)] sm:max-w-2xl sm:rounded-2xl sm:border sm:border-border sm:shadow-md overflow-auto">
      <header className="flex items-center gap-3 border-b border-border px-4 py-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-300 text-sm font-medium text-green-900">
          Б
        </div>

        <div>
          <h1 className="text-sm font-semibold text-text-primary">
            Бот-помощник
          </h1>

          <p className="text-xs text-text-muted">онлайн</p>
        </div>
      </header>

      <MessageList
        messages={MOCK_MESSAGES}
        isBotTyping={true}
        onRetry={handleRetry}
      />

      <ChatInput onSend={handleSend} />
    </section>
  );
});

export default Chat;
