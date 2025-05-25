import { rqClient } from '@/shared/api/instance';
import { CONFIG } from '@/shared/model/config';
import { ROUTES } from '@/shared/model/routes';
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
    <div>
      <p> Boards list {CONFIG.API_BASE_URL}</p>

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

      {boardsQuery.data?.map((board) => (
        <div key={board.id}>
          -
          <Link to={href(ROUTES.BOARD, { boardId: board.id })}>
            {board.name}
          </Link>
          <button
            disabled={deleteBoardMutation.isPending}
            onClick={() =>
              deleteBoardMutation.mutate({
                params: { path: { boardId: board.id } },
              })
            }
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export const Component = BoardsListPage;
