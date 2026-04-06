import { memo, useCallback } from 'react';
import { MessageStatus } from '../types/message';
import SpinnerIcon from '../assets/icons/spinner.svg?react';
import CheckIcon from '../assets/icons/check.svg?react';
import DoubleCheckIcon from '../assets/icons/double-check.svg?react';
import CrossIcon from '../assets/icons/cross.svg?react';

interface MessageStatusIndicatorProps {
  status: MessageStatus;
  onRetry?: () => void;
}

const MessageStatusIndicator = memo(function MessageStatusIndicator({
  status,
  onRetry,
}: MessageStatusIndicatorProps) {
  const handleRetry = useCallback(() => {
    onRetry?.();
  }, [onRetry]);

  if (status === MessageStatus.Sending) {
    return (
      <span className="text-text-muted" aria-label="Отправка">
        <SpinnerIcon className="inline h-3 w-3 animate-spin" />
      </span>
    );
  }

  if (status === MessageStatus.Sent) {
    return (
      <span className="text-text-muted" aria-label="Отправлено">
        <CheckIcon className="inline h-3 w-3" />
      </span>
    );
  }

  if (status === MessageStatus.Read) {
    return (
      <span className="text-green-600" aria-label="Прочитано">
        <DoubleCheckIcon className="inline h-3.5 w-3.5" />
      </span>
    );
  }

  if (status === MessageStatus.Failed) {
    return (
      <span className="flex items-center gap-1 text-error">
        <CrossIcon className="inline h-3 w-3" />

        <button
          type="button"
          className="text-xs font-medium text-error"
          onClick={handleRetry}
          aria-label="Повторить"
        >
          Повторить
        </button>
      </span>
    );
  }

  return null;
});

export default MessageStatusIndicator;
