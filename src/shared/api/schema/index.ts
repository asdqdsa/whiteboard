import type { paths, components } from './generated';

export type ApiPaths = paths;
export type ApiSchemas = components['schemas'];
export type ApiResponses = components['responses'];

// type R = ApiPaths['/boards'];
