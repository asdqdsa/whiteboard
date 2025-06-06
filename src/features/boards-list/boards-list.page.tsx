import { CONFIG } from '@/shared/model/config';
import { ROUTES } from '@/shared/model/routes';
import { Button } from '@/shared/ui/kit/button';
import { Card, CardFooter, CardHeader } from '@/shared/ui/kit/card';
import { Link, href } from 'react-router-dom';
import { Input } from '@/shared/ui/kit/input';
import { Label } from '@/shared/ui/kit/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/kit/select';
import { Switch } from '@/shared/ui/kit/switch';
import { Tabs, TabsList, TabsTrigger } from '@/shared/ui/kit/tabs';
import { useBoardsList } from './use-boards-list';
import { useBoardsFilters } from './use-boards-filter';
import { useDebounce } from '@/shared/lib/react';
import { useCreateBoard } from './use-create-board';
import { useDeleteBoard } from './use-delete-board';
import { useUpdateFavorite } from './use-update-favorite';
import { StarIcon } from 'lucide-react';

type BoardsSortOption = 'createdAt' | 'updatedAt' | 'lastOpenedAt' | 'name';

function BoardsListPage() {
  const boardsFilters = useBoardsFilters();
  const boardsQuery = useBoardsList({
    sort: boardsFilters.sort,
    search: useDebounce(boardsFilters.search),
  });

  const createBoard = useCreateBoard();
  const deleteBoard = useDeleteBoard();
  const updateFavorite = useUpdateFavorite();

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-6 text-2xl font-bold">Доски {CONFIG.API_BASE_URL}</h1>

      <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-4">
        <div className="md:col-span-3">
          <Label htmlFor="search">Поиск</Label>
          <Input
            id="search"
            placeholder="Введите название доски..."
            value={boardsFilters.search}
            onChange={(e) => boardsFilters.setSearch(e.target.value)}
            className="w-full"
          />
        </div>

        <div className="flex flex-col">
          <Label htmlFor="sort">Сортировка</Label>
          <Select
            value={boardsFilters.sort}
            onValueChange={(value) =>
              boardsFilters.setSort(value as BoardsSortOption)
            }
          >
            <SelectTrigger id="sort" className="w-full">
              <SelectValue placeholder="Сортировка" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="lastOpenedAt">По дате открытия</SelectItem>
              <SelectItem value="createdAt">По дате создания</SelectItem>
              <SelectItem value="updatedAt">По дате обновления</SelectItem>
              <SelectItem value="name">По имени</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="all" className="mb-6">
        <TabsList>
          <TabsTrigger value="all" onClick={() => console.log()}>
            Все доски
          </TabsTrigger>
          <TabsTrigger value="favorites" onClick={() => console.log('click')}>
            Избранные
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="mb-8">
        <Button
          type="button"
          onClick={createBoard.createBoard}
          disabled={createBoard.isPending}
        >
          Создать доску
        </Button>
      </div>

      {boardsQuery.isPending ? (
        <div className="py-10 text-center">Загрузка...</div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {boardsQuery.boards?.map((board) => (
              <Card key={board.id} className="relative">
                <div className="absolute top-2 right-2 flex flex-row-reverse items-center gap-2">
                  <span className="text-sm text-gray-500">
                    <StarIcon />
                  </span>
                  <Switch
                    checked={updateFavorite.isOptimisticFavorite(board)}
                    onCheckedChange={() => updateFavorite.toggle(board)}
                  />
                  <span className="text-sm text-gray-500">
                    {board.isFavorite ? 'В избранном' : ''}
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
                        <span className="text-xl font-medium">
                          {board.name}
                        </span>
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
                    disabled={deleteBoard.getIsPending(board.id)}
                    onClick={() => deleteBoard.deleteBoard(board.id)}
                  >
                    Удалить
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {boardsQuery.boards?.length === 0 && !boardsQuery.isPending && (
            <div className="py-10 text-center">Доски не найдены</div>
          )}

          {boardsQuery.hasNextPage && (
            <div ref={boardsQuery.cursorRef} className="py-8 text-center">
              {boardsQuery.isFetchingNextPage &&
                'Загрузка дополнительных досок...'}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export const Component = BoardsListPage;
