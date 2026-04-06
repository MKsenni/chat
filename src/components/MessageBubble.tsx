import { memo, useCallback } from 'react';
import cn from 'classnames';
import { type Message, MessageAuthor } from '../types/message';
import Avatar from './Avatar';
import MessageStatusIndicator from './MessageStatus';
import { formatTime } from '../utils/formatTime';

interface MessageBubbleProps {
  message: Message;
  onRetry?: (id: string) => void;
}

const MessageBubble = memo(function MessageBubble({
  message,
  onRetry,
}: MessageBubbleProps) {
  const isUser = message.author === MessageAuthor.User;

  const handleRetry = useCallback(() => {
    onRetry?.(message.id);
  }, [onRetry, message.id]);

  return (
    <article
      className={cn(
        'flex gap-2 animate-slide-up',
        isUser ? 'flex-row-reverse' : 'flex-row',
      )}
    >
      <Avatar author={message.author} />

      <div
        className={cn(
          'flex max-w-[75%] flex-col gap-1',
          isUser ? 'items-end' : 'items-start',
        )}
      >
        <div
          className={cn(
            'rounded-2xl px-3 py-2 text-base leading-relaxed shadow-sm',
            isUser
              ? 'rounded-tr-sm bg-bubble-user text-text-on-dark'
              : 'rounded-tl-sm bg-bubble-bot text-text-primary',
          )}
        >
          {message.text}
        </div>

        <div
          className={cn(
            'flex items-center gap-1.5 px-1',
            isUser ? 'flex-row-reverse' : 'flex-row',
          )}
        >
          <time
            className="text-[11px] text-text-muted"
            dateTime={new Date(message.timestamp).toISOString()}
          >
            {formatTime(message.timestamp)}
          </time>

          {isUser && (
            <MessageStatusIndicator
              status={message.status}
              onRetry={handleRetry}
            />
          )}
        </div>
      </div>
    </article>
  );
});

export default MessageBubble;
