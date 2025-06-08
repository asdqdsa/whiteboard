import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/kit/select';

type BoardsSortOption = 'createdAt' | 'updatedAt' | 'lastOpenedAt' | 'name';

export function BoardsSortSelector({
  value,
  onValueChange,
}: {
  value: BoardsSortOption;
  onValueChange: (value: BoardsSortOption) => void;
}) {
  return (
    <Select
      value={value}
      onValueChange={(v) => onValueChange(v as BoardsSortOption)}
    >
      <SelectTrigger id="sort" className="w-full">
        <SelectValue placeholder="Сортировка" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="lastOpenedAt">По дате открытия</SelectItem>
        <SelectItem value="createdAt">По дате создания</SelectItem>
        <SelectItem value="updatedAt">По дате обновления</SelectItem>
        <SelectItem value="name">По имени</SelectItem>
      </SelectContent>
    </Select>
  );
}
