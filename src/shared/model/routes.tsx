import 'react-router-dom';

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  BOARD: '/boards/:boardId',
  BOARDS: '/boards',
} as const;

export type PathParams = {
  [ROUTES.BOARD]: {
    boardId: string;
  };
};

declare module 'react-router-dom' {
  interface Register {
    params: PathParams;
  }
}
