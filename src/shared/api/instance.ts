import createFetchClient from 'openapi-fetch';
import createClient from 'openapi-react-query';
import { CONFIG } from '@/shared/model/config';
import type { ApiPaths, ApiSchemas } from './schema';
import { useSession } from '../model/session';

export const fetchClient = createFetchClient<ApiPaths>({
  baseUrl: CONFIG.API_BASE_URL,
});

export const rqClient = createClient(fetchClient);

export const publicFetchClient = createFetchClient<ApiPaths>({
  baseUrl: CONFIG.API_BASE_URL,
});

export const publicRqClient = createClient(publicFetchClient);
// fetchClient.GET('/boards').then((res) => {
//   if (res.data) {
//     res.data.forEach((board) => {
//       console.log(board);
//     });
//   }
// });

// const res = rqClient.useQuery('get', '/boards');

fetchClient.use({
  async onRequest({ request }) {
    const token = await useSession.getState().refreshToken();

    if (token) {
      request.headers.set('Authorization', `Bearer ${token}`);
    } else {
      return new Response(
        JSON.stringify({
          code: 'NOT_AUTHORIZED',
          message: 'You are not authorized to access this resource',
        } as ApiSchemas['Error']),
        { status: 401, headers: { 'Content-Type': 'application/json' } },
      );
    }
  },
});
