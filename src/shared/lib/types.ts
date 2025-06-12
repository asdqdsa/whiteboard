export type ExpandDeep<T> = T extends object
  ? { [K in keyof T]: ExpandDeep<T[K]> }
  : T;
