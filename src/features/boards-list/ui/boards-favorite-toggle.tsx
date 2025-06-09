import { cn } from '@/shared/lib/css';
import { StarIcon } from 'lucide-react';

interface BoardsFavoriteToggleProps {
  isFavorite: boolean;
  onToggle: () => void;
}

export function BoardsFavoriteToggle({
  isFavorite,
  onToggle,
}: BoardsFavoriteToggleProps) {
  return (
    <button
      className={cn('rounded-full p-1 transition-colors hover:bg-gray-100')}
      onClick={onToggle}
    >
      <StarIcon
        className={cn(
          'h-5 w-5',
          isFavorite ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400',
        )}
      />
    </button>
    // <div className="absolute top-2 right-2 flex flex-row-reverse items-center gap-2">
    //   <span className="text-sm text-gray-500">

    //   </span>
    //   <Switch checked={isFavorite} onCheckedChange={onFavoriteToggle} />
    //   <span className="text-sm text-gray-500">
    //     {isFavorite ? 'В избранном' : ''}
    //   </span>
    // </div>
  );
}
