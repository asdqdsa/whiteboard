import { Input } from '@/shared/ui/kit/input';

export function BoardsSearchInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <Input
      id="search"
      placeholder="Введите название доски..."
      value={value}
      className="w-full"
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
