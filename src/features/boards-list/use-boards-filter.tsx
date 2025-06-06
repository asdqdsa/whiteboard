import { useState } from 'react';

export type BoardsSortOption =
  | 'createdAt'
  | 'updatedAt'
  | 'lastOpenedAt'
  | 'name';

// type BoardsFilters = {
//   search: string;
//   sort: BoardsSortOption;
//   showFavorites: boolean | null;
// };

export function useBoardsFilters() {
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<BoardsSortOption>('lastOpenedAt');
  const [showFavorites, setShowFavorites] = useState<boolean | null>(null);

  return { search, sort, showFavorites, setSearch, setSort, setShowFavorites };
}
