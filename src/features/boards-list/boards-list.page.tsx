import { ROUTES } from '@/shared/model/routes';
import { href, Link } from 'react-router-dom';

function BoardsListPage() {
  return (
    <div>
      <p> Boards list</p>
      <Link to={href(ROUTES.BOARD, { boardId: '1' })}> Board 1</Link>
    </div>
  );
}

export const Component = BoardsListPage;
