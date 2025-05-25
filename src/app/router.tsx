import { ROUTES } from '@/shared/model/routes';
import { App } from './app';
import { createBrowserRouter, redirect } from 'react-router-dom';
import { Providers } from './providers';

export const router = createBrowserRouter([
  {
    element: (
      <Providers>
        <App />
      </Providers>
    ),
    children: [
      {
        path: ROUTES.BOARDS,
        lazy: () => import('@/features/boards-list/boards-list.page'),
      },
      {
        path: ROUTES.BOARD,
        lazy: () => import('@/features/board/board.page'),
      },
      {
        path: ROUTES.LOGIN,
        lazy: () => import('@/features/auth/login.page'),
      },
      {
        path: ROUTES.SIGNUP,
        lazy: () => import('@/features/auth/signup.page'),
      },
      {
        path: ROUTES.HOME,
        loader: () => redirect(ROUTES.BOARDS),
      },
    ],
  },
]);
