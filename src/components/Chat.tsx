import { memo, useCallback } from 'react';
import { useChatStore } from '../store/chatStore';
import MessageList from './MessageList';
import ChatInput from './ChatInput';

const Chat = memo(function Chat() {
  const messages = useChatStore((state) => state.messages);
  const isBotTyping = useChatStore((state) => state.isBotTyping);
  const storeSend = useChatStore((state) => state.sendMessage);
  const storeRetry = useChatStore((state) => state.retryMessage);

  const handleSend = useCallback(
    (text: string) => {
      storeSend(text);
    },
    [storeSend],
  );

  const handleRetry = useCallback(
    (id: string) => {
      storeRetry(id);
    },
    [storeRetry],
  );

  return (
    <section className="flex h-svh flex-col bg-surface-white sm:mx-auto sm:my-4 sm:h-[calc(100svh-2rem)] sm:max-w-2xl sm:rounded-2xl sm:border sm:border-border sm:shadow-md overflow-auto">
      <header className="flex items-center gap-3 border-b border-border px-4 py-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-300 text-sm font-medium text-green-900">
          Д
        </div>

        <div>
          <h1 className="text-sm font-semibold text-text-primary">
            Друг
          </h1>

          <p className="text-xs text-text-muted">онлайн</p>
        </div>
      </header>

      <MessageList
        messages={messages}
        isBotTyping={isBotTyping}
        onRetry={handleRetry}
      />

      <ChatInput onSend={handleSend} />
    </section>
  );
});

export default Chat;
