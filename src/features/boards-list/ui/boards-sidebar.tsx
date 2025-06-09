import { ROUTES } from '@/shared/model/routes';
import { Button } from '@/shared/ui/kit/button';
import { Link } from 'react-router-dom';
import { LayoutGridIcon, StarIcon, ClockIcon } from 'lucide-react';
import { cn } from '@/shared/lib/css';

interface BoardsSidebarProps {
  className?: string;
}

export function BoardsSidebar({ className }: BoardsSidebarProps) {
  return (
    <div className={cn('w-64 space-y-4 border-r p-4', className)}>
      <div className="space-y-2">
        <div className="px-2 text-sm font-medium text-gray-500">Навигация</div>
        <Button asChild variant="ghost" className="w-full justify-start">
          <Link to={ROUTES.BOARDS}>
            <LayoutGridIcon className="mr-2 h-4 w-4" />
            All Boards
          </Link>
        </Button>
        <Button asChild variant="ghost" className="w-full justify-start">
          <Link to={ROUTES.FAVORITE_BOARDS}>
            <StarIcon className="mr-2 h-4 w-4" />
            Favorite
          </Link>
        </Button>
        <Button asChild variant="ghost" className="w-full justify-start">
          <Link to={ROUTES.RECENT_BOARDS}>
            <ClockIcon className="mr-2 h-4 w-4" />
            Recent
          </Link>
        </Button>
      </div>
    </div>
  );
}
