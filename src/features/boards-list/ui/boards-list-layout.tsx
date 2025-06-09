import { Skeleton } from '@/shared/ui/kit/skeleton';
import type { ViewMode } from './view-mode-toggle';
import { cn } from '@/shared/lib/css';

export function BoardsListLayout({
  header,
  filters,
  children,
  sidebar,
}: {
  header: React.ReactNode;
  filters?: React.ReactNode;
  children?: React.ReactNode;
  sidebar?: React.ReactNode;
}) {
  return (
    <div className="container mx-auto p-4">
      <div className="flex gap-4">
        {sidebar}
        <div className="flex flex-1 flex-col gap-4">
          {header}
          {filters}
          {children}
        </div>
      </div>
    </div>
  );
}

export function BoardsListLayoutHeader({
  title,
  description,
  actions,
}: {
  title: string;
  description?: string;
  actions?: React.ReactNode;
}) {
  return (
    <div className="mb-6 flex items-center justify-between">
      <div className="">
        <h1 className="text-2xl font-bold">{title}</h1>
        {description && <p className="text-gray-500">{description}</p>}
      </div>
      {actions}
    </div>
  );
}

export function BoardsListLayoutFilters({
  sort,
  filters,
  actions,
}: {
  sort?: React.ReactNode;
  filters?: React.ReactNode;
  actions?: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-4">
      {filters && (
        <div className="flex items-center gap-2">
          <div className="text-sm whitespace-nowrap text-gray-500">
            Filter by
          </div>
          {filters}
        </div>
      )}
      {sort && (
        <div className="flex items-center gap-2">
          <div className="text-sm whitespace-nowrap text-gray-500">Sort by</div>
          {sort}
        </div>
      )}
      {actions && <div className="ml-auto">{actions}</div>}
    </div>
  );
}

export function BoardsListLayoutContent({
  children,
  isEmpty,
  isPending,
  isPendingNext,
  cursorRef,
  hasCursor,
  mode,
  renderGrid,
  renderList,
}: {
  children?: React.ReactNode;
  isEmpty?: boolean;
  isPending?: boolean;
  isPendingNext?: boolean;
  cursorRef?: React.Ref<HTMLDivElement>;
  hasCursor?: boolean;
  mode: ViewMode;
  renderList?: () => React.ReactNode;
  renderGrid?: () => React.ReactNode;
}) {
  return (
    <div>
      {isPending && <div className="py-10 text-center">Загрузка...</div>}

      {mode === 'list' && renderList && (
        <BoardsListLayoutList className="flex flex-col gap-2">
          {renderList?.()}
        </BoardsListLayoutList>
      )}

      {mode === 'cards' && renderGrid && (
        <BoardsListLayoutCards className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {renderGrid?.()}
        </BoardsListLayoutCards>
      )}

      {!isPending && children}

      {isEmpty && !isPending && (
        <div className="py-10 text-center">Доски не найдены</div>
      )}

      {hasCursor && (
        <div ref={cursorRef} className="py-8 text-center">
          {isPendingNext &&
            {
              list: (
                <div className="felx flex-col gap-2">
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                </div>
              ),
              cards: (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  <Skeleton className="h-40 w-full" />
                  <Skeleton className="h-40 w-full" />
                  <Skeleton className="h-40 w-full" />
                </div>
              ),
            }[mode]}
        </div>
      )}
    </div>
  );
}

export function BoardsListLayoutCards({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3',
        className,
      )}
    >
      {children}
    </div>
  );
}

export function BoardsListLayoutList({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn('flex flex-col gap-2', className)}>{children}</div>;
}

export function BoardsLayoutContentGroups({
  groups,
}: {
  groups: {
    title: string;
    items: React.ReactNode;
  }[];
}) {
  return (
    <div className="flex flex-col gap-2">
      {groups.map((group) => (
        <div key={group.title}>
          <div className="mb-2 text-lg font-bold">{group.title}</div>
          {group.items}
        </div>
      ))}
    </div>
  );
}
