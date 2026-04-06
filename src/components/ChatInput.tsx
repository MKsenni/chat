import { memo, useCallback, useRef, useState } from 'react';
import SendIcon from '../assets/icons/send.svg?react';

interface ChatInputProps {
  onSend: (text: string) => void;
}

const ChatInput = memo(function ChatInput({ onSend }: ChatInputProps) {
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const [value, setValue] = useState('');

  const isDisabled = !value.trim();

  const handleSend = useCallback(() => {
    const trimmed = value.trim();
    if (!trimmed) return;
    onSend(trimmed);
    setValue('');
    inputRef.current?.focus();
  }, [value, onSend]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    },
    [handleSend],
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setValue(e.target.value);
    },
    [],
  );

  return (
    <footer className="border-t border-border bg-surface-white p-3 sm:p-4">
      <div className="flex items-end gap-2">
        <label htmlFor="chat-input" className="sr-only">
          Введите сообщение
        </label>

        <textarea
          ref={inputRef}
          id="chat-input"
          className="flex-1 resize-none rounded-xl border border-border bg-surface px-3 py-2 text-base text-text-primary placeholder:text-text-muted outline-none"
          placeholder="Введите сообщение..."
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          rows={1}
          aria-label="Поле ввода сообщения"
        />

        <button
          type="button"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-700 text-text-on-dark disabled:opacity-40"
          onClick={handleSend}
          disabled={isDisabled}
          aria-label="Отправить сообщение"
        >
          <SendIcon className="h-4 w-4" />
        </button>
      </div>
    </footer>
  );
});

export default ChatInput;
