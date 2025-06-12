import { ROUTES } from '@/shared/model/routes';
import { useSession } from '@/shared/model/session';
import { Link } from 'react-router-dom';
import { Button } from '@/shared/ui/kit/button';

export function AppHeader() {
  const { session, logout } = useSession();

  // if (!session) return null;

  return (
    <header className="bg-background border-border/40 border-b px-4 py-3 shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <div className="text-xl font-semibold">
          <Link to={ROUTES.HOME}>Whiteboard</Link>
        </div>

        {session ? (
          <div className="flex items-center gap-4">
            <span className="text-muted-foreground text-sm">
              {session.email}
            </span>
            <Button
              variant="outline"
              size="sm"
              className="hover:bg-destructive/10"
              onClick={() => logout()}
            >
              Logout
            </Button>
          </div>
        ) : (
          <Button asChild variant="default" size="sm" className="rounded-xs">
            <Link to={ROUTES.LOGIN}>Login</Link>
          </Button>
        )}
      </div>
    </header>
  );
}
