import { memo } from 'react';
import cn from 'classnames';
import { MessageAuthor } from '../types/message';

interface AvatarProps {
  author: MessageAuthor;
}

const AVATAR_CONFIG = {
  [MessageAuthor.User]: {
    initials: 'Вы',
    className: 'bg-green-700 text-text-on-dark',
  },
  [MessageAuthor.Bot]: {
    initials: 'Б',
    className: 'bg-green-300 text-green-900',
  },
} as const;

const Avatar = memo(function Avatar({ author }: AvatarProps) {
  const { initials, className } = AVATAR_CONFIG[author];

  return (
    <div
      className={cn(
        'flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-medium',
        className,
      )}
      role="img"
      aria-label={
        author === MessageAuthor.User ? 'Ваш аватар' : 'Аватар бота'
      }
    >
      {initials}
    </div>
  );
});

export default Avatar;
