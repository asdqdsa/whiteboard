import { useBoardsList } from './model/use-boards-list';
import { useDeleteBoard } from './model/use-delete-board';
import { useUpdateFavorite } from './model/use-update-favorite';
import {
  BoardsListCardsLayout,
  BoardsListLayout,
  BoardsListLayoutContent,
  BoardsListLayoutHeader,
  BoardsListListLayout,
} from './ui/boards-list-layout';
import { ViewModeToggle, type ViewMode } from './ui/view-mode-toggle';
import { useState } from 'react';
import { BoardsListCard } from './ui/boards-list-card';

export function BoardsListFavoritePage() {
  const boardsQuery = useBoardsList({ isFavorite: true });

  const deleteBoard = useDeleteBoard();
  const updateFavorite = useUpdateFavorite();

  const [viewMode, setViewMode] = useState<ViewMode>('list');

  return (
    <BoardsListLayout
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
      >
        {viewMode === 'list' ? (
          <BoardsListListLayout>
            {boardsQuery.boards?.map((board) => (
              <BoardsListCard
                key={board.id}
                board={board}
                isFavorite={updateFavorite.isOptimisticFavorite(board)}
                isDeletePending={deleteBoard.getIsPending(board.id)}
                onFavoriteToggle={() => updateFavorite.toggle(board)}
                onDelete={() => deleteBoard.deleteBoard(board.id)}
              />
            ))}
          </BoardsListListLayout>
        ) : (
          <BoardsListCardsLayout>
            {boardsQuery.boards?.map((board) => (
              <BoardsListCard
                key={board.id}
                board={board}
                isFavorite={updateFavorite.isOptimisticFavorite(board)}
                isDeletePending={deleteBoard.getIsPending(board.id)}
                onFavoriteToggle={() => updateFavorite.toggle(board)}
                onDelete={() => deleteBoard.deleteBoard(board.id)}
              />
            ))}
          </BoardsListCardsLayout>
        )}
      </BoardsListLayoutContent>
    </BoardsListLayout>
  );
}

export const Component = BoardsListFavoritePage;
