import { useState } from 'react';
import { useBoardsList } from './model/use-boards-list';
import {
  BoardsLayoutContentGroups,
  BoardsListLayout,
  BoardsListLayoutCards,
  BoardsListLayoutContent,
  BoardsListLayoutHeader,
  BoardsListLayoutList,
} from './ui/boards-list-layout';
import { ViewModeToggle, type ViewMode } from './ui/view-mode-toggle';
import { useRecentGroups } from './model/use-recent-groups';
import { BoardItem } from './compose/board-item';
import { BoardCard } from './compose/board-card';
import { BoardsSidebar } from './ui/boards-sidebar';

export function BoardsListFavoritePage() {
  const boardsQuery = useBoardsList({ sort: 'lastOpenedAt' });

  const [viewMode, setViewMode] = useState<ViewMode>('list');

  const recentGroups = useRecentGroups(boardsQuery.boards ?? []);

  // const renderCard = (board: ApiSchemas['Board']) => {
  //   return (
  //     <BoardsListCard
  //       key={board.id}
  //       board={board}
  //       rightTopActoins={
  //         <BoardsFavoriteToggle
  //           isFavorite={updateFavorite.isOptimisticFavorite(board)}
  //           onToggle={() => updateFavorite.toggle(board)}
  //         />
  //       }
  //       bottomActions={
  //         <Button
  //           variant="destructive"
  //           disabled={deleteBoard.getIsPending(board.id)}
  //           onClick={() => deleteBoard.deleteBoard(board.id)}
  //         >
  //           Delete
  //         </Button>
  //       }
  //     />
  //   );
  // };

  // const renderItem = (board: ApiSchemas['Board']) => {
  //   return (
  //     <BoardsListItem
  //       key={board.id}
  //       board={board}
  //       rightActions={
  //         <BoardsFavoriteToggle
  //           isFavorite={updateFavorite.isOptimisticFavorite(board)}
  //           onToggle={() => updateFavorite.toggle(board)}
  //         />
  //       }
  //       menuActions={
  //         <DropdownMenuItem
  //           variant="destructive"
  //           disabled={deleteBoard.getIsPending(board.id)}
  //           onClick={() => deleteBoard.deleteBoard(board.id)}
  //         >
  //           Delete
  //         </DropdownMenuItem>
  //       }
  //     />
  //   );
  // };

  // const renderGroup = (boards: ApiSchemas['Board'][]) => {
  //   if (viewMode === 'list') {
  //     return (
  //       <BoardsListLayoutList>{boards.map(renderItem)}</BoardsListLayoutList>
  //     );
  //   }
  //   return (
  //     <BoardsListLayoutCards>{boards.map(renderCard)}</BoardsListLayoutCards>
  //   );
  // };

  return (
    <BoardsListLayout
      sidebar={<BoardsSidebar />}
      header={
        <BoardsListLayoutHeader
          title="Recent Boards"
          description="Here you can find your recent boards"
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
        // renderList={() => boards?.map((board) => renderItem(board))}
        // renderGrid={() => boards?.map((board) => renderCard(board))}
      >
        <BoardsLayoutContentGroups
          groups={(recentGroups || []).map((group) => ({
            items: {
              list: (
                <BoardsListLayoutList>
                  {group.items.map((board) => (
                    <BoardItem board={board} />
                  ))}
                </BoardsListLayoutList>
              ),
              cards: (
                <BoardsListLayoutCards>
                  {group.items.map((board) => (
                    <BoardCard board={board} />
                  ))}
                </BoardsListLayoutCards>
              ),
            }[viewMode],
            title: group.title,
          }))}
        />
      </BoardsListLayoutContent>
    </BoardsListLayout>
  );
}

export const Component = BoardsListFavoritePage;
