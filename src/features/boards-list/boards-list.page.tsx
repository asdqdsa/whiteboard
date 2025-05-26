import { rqClient } from '@/shared/api/instance';
import { cn } from '@/shared/lib/css';
import { CONFIG } from '@/shared/model/config';
import { ROUTES } from '@/shared/model/routes';
import { Button } from '@/shared/ui/kit/button';
import { Card, CardFooter, CardHeader } from '@/shared/ui/kit/card';
import { useQueryClient } from '@tanstack/react-query';
import { href, Link } from 'react-router-dom';

function BoardsListPage() {
  const queryClient = useQueryClient();
  const boardsQuery = rqClient.useQuery('get', '/boards', {
    onSettled: async () => {
      await queryClient.invalidateQueries(
        rqClient.queryOptions('get', '/boards')
      );
    },
  });

  const createBoardMutation = rqClient.useMutation('post', '/boards', {
    onSettled: async () => {
      await queryClient.invalidateQueries(
        rqClient.queryOptions('get', '/boards')
      );
    },
  });
  const deleteBoardMutation = rqClient.useMutation(
    'delete',
    '/boards/{boardId}',
    {
      onSettled: async () => {
        await queryClient.invalidateQueries(
          rqClient.queryOptions('get', '/boards')
        );
      },
    }
  );

  return (
    <div className='container mx-auto p-4'>
      <h1> Boards list {CONFIG.API_BASE_URL}</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target as HTMLFormElement);
          // createBoardMutation.mutate({ body: { name: e.target.name.value } });
          createBoardMutation.mutate({
            body: { name: formData.get('name') as string },
          });
        }}
      >
        <input name='name' />
        <button type='submit' disabled={createBoardMutation.isPending} />
      </form>

      <div className='grid grid-cols-3 gap-3'>
        {boardsQuery.data?.map((board) => (
          <Card key={board.id} className={cn('bg-amber-50')}>
            <CardHeader>
              <Button asChild variant='link'>
                <Link to={href(ROUTES.BOARD, { boardId: board.id })}>
                  {board.name}
                </Link>
              </Button>
            </CardHeader>
            <CardFooter>
              <Button
                variant={'destructive'}
                disabled={deleteBoardMutation.isPending}
                onClick={() =>
                  deleteBoardMutation.mutate({
                    params: { path: { boardId: board.id } },
                  })
                }
              >
                Remove
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

export const Component = BoardsListPage;
