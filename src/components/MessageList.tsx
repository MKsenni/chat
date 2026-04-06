import { memo, useEffect, useRef } from 'react';
import { type Message } from '../types/message';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';

interface MessageListProps {
  messages: Message[];
  isBotTyping: boolean;
  onRetry?: (id: string) => void;
}

const MessageList = memo(function MessageList({
  messages,
  isBotTyping,
  onRetry,
}: MessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages.length, isBotTyping]);

  return (
    <section
      className="flex-1 overflow-y-auto px-3 py-4 sm:px-6"
      role="log"
      aria-label="История сообщений"
      aria-live="polite"
    >
      <div className="mx-auto flex max-w-2xl flex-col gap-4">
        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            message={message}
            onRetry={onRetry}
          />
        ))}
        {isBotTyping && <TypingIndicator />}
        
        <div ref={bottomRef} />
      </div>
    </section>
  );
});

export default MessageList;
