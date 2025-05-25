import createFetchClient from 'openapi-fetch';
import createClient from 'openapi-react-query';
import { CONFIG } from '@/shared/model/config';
import type { ApiPaths } from './schema';

export const fetchClient = createFetchClient<ApiPaths>({
  baseUrl: CONFIG.API_BASE_URL,
});

export const rqClient = createClient(fetchClient);

// fetchClient.GET('/boards').then((res) => {
//   if (res.data) {
//     res.data.forEach((board) => {
//       console.log(board);
//     });
//   }
// });

// const res = rqClient.useQuery('get', '/boards');
