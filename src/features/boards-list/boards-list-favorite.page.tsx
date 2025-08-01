import { useState } from 'react';
import { useBoardsList } from './model/use-boards-list';
import {
  BoardsListLayout,
  BoardsListLayoutContent,
  BoardsListLayoutHeader,
} from './ui/boards-list-layout';
import { ViewModeToggle, type ViewMode } from './ui/view-mode-toggle';
import { BoardItem } from './compose/board-item';
import { BoardCard } from './compose/board-card';
import { BoardsSidebar } from './ui/boards-sidebar';

export function BoardsListFavoritePage() {
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const boardsQuery = useBoardsList({ isFavorite: true });

  return (
    <BoardsListLayout
      sidebar={<BoardsSidebar />}
      header={
        <BoardsListLayoutHeader
          title="Favorite Boards"
          description="Here you can setup your favorite boards"
          actions={
            <ViewModeToggle
              value={viewMode}
              onChange={(value) => setViewMode(value)}
            />
          }
        />
      }
    >
      <BoardsListLayoutContent
        isPending={boardsQuery.isPending}
        isEmpty={boardsQuery.boards?.length === 0}
        hasCursor={boardsQuery.hasNextPage}
        isPendingNext={boardsQuery.isFetchingNextPage}
        cursorRef={boardsQuery.cursorRef}
        mode={viewMode}
        renderList={() =>
          boardsQuery?.boards?.map((board) => <BoardItem board={board} />)
        }
        renderGrid={() =>
          boardsQuery?.boards?.map((board) => <BoardCard board={board} />)
        }
      />
    </BoardsListLayout>
  );
}

export const Component = BoardsListFavoritePage;
