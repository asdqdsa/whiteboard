import { ROUTES } from '@/shared/model/routes';
import { Button } from '@/shared/ui/kit/button';
import { Card, CardFooter, CardHeader } from '@/shared/ui/kit/card';
import { Switch } from '@/shared/ui/kit/switch';
import { StarIcon } from 'lucide-react';
import { href, Link } from 'react-router-dom';

interface BoardsListCardProps {
  board: {
    id: string;
    name: string;
    createdAt: string;
    lastOpenedAt: string;
  };
  isFavorite: boolean;
  onFavoriteToggle: () => void;
  onDelete: () => void;
  isDeletePending: boolean;
}
export function BoardsListCard({
  board,
  isFavorite,
  onFavoriteToggle,
  onDelete,
  isDeletePending,
}: BoardsListCardProps) {
  return (
    <Card key={board.id} className="relative">
      <div className="absolute top-2 right-2 flex flex-row-reverse items-center gap-2">
        <span className="text-sm text-gray-500">
          <StarIcon />
        </span>
        <Switch checked={isFavorite} onCheckedChange={onFavoriteToggle} />
        <span className="text-sm text-gray-500">
          {isFavorite ? 'В избранном' : ''}
        </span>
      </div>
      <CardHeader>
        <div className="flex flex-col gap-2">
          <Button
            asChild
            variant="link"
            className="h-auto justify-start p-0 text-left"
          >
            <Link to={href(ROUTES.BOARD, { boardId: board.id })}>
              <span className="text-xl font-medium">{board.name}</span>
            </Link>
          </Button>
          <div className="text-sm text-gray-500">
            Создано: {new Date(board.createdAt).toLocaleDateString()}
          </div>
          <div className="text-sm text-gray-500">
            Последнее открытие:{' '}
            {new Date(board.lastOpenedAt).toLocaleDateString()}
          </div>
        </div>
      </CardHeader>
      <CardFooter>
        <Button
          variant="destructive"
          disabled={isDeletePending}
          onClick={onDelete}
        >
          Удалить
        </Button>
      </CardFooter>
    </Card>
  );
}
