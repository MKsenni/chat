import { memo } from 'react';
import Avatar from './Avatar';
import { MessageAuthor } from '../types/message';

const DOT_DELAYS = [0, 0.2, 0.4];

const TypingIndicator = memo(function TypingIndicator() {
  return (
    <div
      className="flex items-end gap-2 animate-fade-in"
      role="status"
      aria-label="Друг печатает"
    >
      <Avatar author={MessageAuthor.Bot} />
      
      <div className="rounded-2xl rounded-tl-sm bg-bubble-bot px-4 py-3 shadow-sm">
        <div className="flex gap-1">
          {DOT_DELAYS.map((delay) => (
            <span
              key={delay}
              className="h-1.5 w-1.5 rounded-full bg-text-muted animate-bounce-dot"
              style={{ animationDelay: `${delay}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
});

export default TypingIndicator;
