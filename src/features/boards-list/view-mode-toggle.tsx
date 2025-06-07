import { Tabs, TabsList, TabsTrigger } from '@/shared/ui/kit/tabs';
import { ImagesIcon, ListIcon } from 'lucide-react';

export type ViewMode = 'list' | 'cards';
export function ViewModeToggle({
  // value,
  onChange,
}: {
  value: ViewMode;
  onChange: (value: ViewMode) => void;
}) {
  return (
    <Tabs
      defaultValue="all"
      onValueChange={(value) => onChange(value as ViewMode)}
    >
      <TabsList>
        <TabsTrigger value="list" onClick={() => console.log()}>
          <ListIcon />
        </TabsTrigger>
        <TabsTrigger value="cards" onClick={() => console.log('click')}>
          <ImagesIcon />
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
//onValueChange={onChange}
