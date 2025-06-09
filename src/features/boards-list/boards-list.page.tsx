import { Button } from '@/shared/ui/kit/button';
import { useBoardsList } from './model/use-boards-list';
import { useBoardsFilters } from './model/use-boards-filter';
import { useDebounce } from '@/shared/lib/react';
import { useCreateBoard } from './model/use-create-board';
import {
  BoardsListLayout,
  BoardsListLayoutContent,
  BoardsListLayoutFilters,
  BoardsListLayoutHeader,
} from './ui/boards-list-layout';
import { ViewModeToggle, type ViewMode } from './ui/view-mode-toggle';
import { useState } from 'react';
import { BoardsSortSelector } from './ui/boards-sort-select';
import { BoardsSearchInput } from './ui/boards-search-input';
import { BoardCard } from './compose/board-card';
import { BoardItem } from './compose/board-item';
import { BoardsSidebar } from './ui/boards-sidebar';

function BoardsListPage() {
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const boardsFilters = useBoardsFilters();
  const boardsQuery = useBoardsList({
    sort: boardsFilters.sort,
    search: useDebounce(boardsFilters.search),
  });
  const createBoard = useCreateBoard();

  return (
    <BoardsListLayout
      sidebar={<BoardsSidebar />}
      header={
        <BoardsListLayoutHeader
          title="Boards"
          description="Here you can setup your boards"
          actions={
            <Button
              type="button"
              disabled={createBoard.isPending}
              onClick={createBoard.createBoard}
            >
              Create Board
            </Button>
          }
        />
      }
      filters={
        <BoardsListLayoutFilters
          sort={
            <BoardsSortSelector
              value={boardsFilters.sort}
              onValueChange={boardsFilters.setSort}
            />
          }
          filters={
            <BoardsSearchInput
              value={boardsFilters.search}
              onChange={boardsFilters.setSearch}
            />
          }
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
          boardsQuery.boards?.map((board) => (
            <BoardItem key={board.id} board={board} />
          ))
        }
        renderGrid={() =>
          boardsQuery.boards?.map((board) => (
            <BoardCard key={board.id} board={board} />
          ))
        }
      />
    </BoardsListLayout>
  );
}

export const Component = BoardsListPage;
