import { delay, HttpResponse } from 'msw';
import { http } from '@/shared/api/mocks/http';
import type { ApiSchemas } from '@/shared/api/schema';
import {
  createRefreshTokenCookie,
  generateTokens,
  verifyToken,
} from '../session';

const userPasswords = new Map<string, string>();
const mockUsers: ApiSchemas['User'][] = [
  {
    id: '1',
    email: 'admin@gmail.com',
  },
];

userPasswords.set('admin@gmail.com', '123456');

export const authHandlers = [
  http.post('/auth/login', async ({ request }) => {
    const body = await request.json();

    const user = mockUsers.find((u) => u.email === body.email);
    const storedPassword = userPasswords.get(body.email);

    await delay(1200);

    if (!user || !storedPassword || storedPassword !== body.password) {
      return HttpResponse.json(
        {
          message: 'Incorrect email or password',
          code: 'INVALID_CREDENTIALS',
        },
        { status: 401 }
      );
    }

    const { accessToken, refreshToken } = await generateTokens({
      email: user.email,
      userId: user.id,
    });

    return HttpResponse.json(
      {
        accessToken: accessToken,
        user,
      },
      {
        status: 200,
        headers: {
          'Set-Cookie': createRefreshTokenCookie(refreshToken),
        },
      }
    );
  }),

  http.post('/auth/signup', async ({ request }) => {
    const body = await request.json();

    await delay();

    if (mockUsers.some((u) => u.email === body.email)) {
      return HttpResponse.json(
        {
          message: 'This user already exist',
          code: 'USER_EXISTS',
        },
        { status: 400 }
      );
    }

    const newUser: ApiSchemas['User'] = {
      id: String(mockUsers.length + 1),
      email: body.email,
    };

    const { accessToken, refreshToken } = await generateTokens({
      email: newUser.email,
      userId: newUser.id,
    });

    mockUsers.push(newUser);

    userPasswords.set(body.email, body.password);

    console.log(mockUsers, 'users');

    return HttpResponse.json(
      {
        accessToken: accessToken,
        user: newUser,
      },
      {
        status: 201,
        headers: {
          'Set-Cookie': createRefreshTokenCookie(refreshToken),
        },
      }
    );
  }),

  http.post('/auth/refresh', async ({ cookies }) => {
    const refreshToken = cookies.refreshToken;

    if (!refreshToken) {
      return HttpResponse.json(
        {
          message: 'Refresh token is missing',
          code: 'REFRESH_TOKEN_MISSING',
        },
        { status: 401 }
      );
    }

    try {
      const session = await verifyToken(refreshToken);
      const user = mockUsers.find((u) => u.id === session.userId);

      if (!user) {
        throw new Error('User not found');
      }

      const { accessToken, refreshToken: newRefreshToken } =
        await generateTokens({
          userId: user.id,
          email: user.email,
        });

      return HttpResponse.json(
        {
          accessToken,
          user,
        },
        {
          status: 200,
          headers: {
            'Set-Cookie': createRefreshTokenCookie(newRefreshToken),
          },
        }
      );
    } catch (error) {
      console.error('Error refreshing token:', error);
      return HttpResponse.json(
        {
          message: 'Invalid refresh token',
          code: 'INVALID_REFRESH_TOKEN',
        },
        { status: 401 }
      );
    }
  }),
];
