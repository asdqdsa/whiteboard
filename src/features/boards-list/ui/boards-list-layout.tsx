export function BoardsListLayout({
  header,
  filters,
  children,
}: {
  header: React.ReactNode;
  filters?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <div className="container mx-auto flex flex-col gap-6 p-4">
      {header}
      {filters}
      {children}
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
          <div className="text-sm text-gray-500">Sort by</div>
          {sort}
        </div>
      )}
      {sort && (
        <div className="flex items-center gap-2">
          <div className="text-sm text-gray-500">Sort by</div>
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
}: {
  children?: React.ReactNode;
  isEmpty?: boolean;
  isPending?: boolean;
  isPendingNext?: boolean;
  cursorRef?: React.Ref<HTMLDivElement>;
  hasCursor?: boolean;
}) {
  return (
    <div>
      {isPending && <div className="py-10 text-center">Загрузка...</div>}

      {!isPending && children}

      {isEmpty && !isPending && (
        <div className="py-10 text-center">Доски не найдены</div>
      )}

      {hasCursor && (
        <div ref={cursorRef} className="py-8 text-center">
          {isPendingNext && 'Загрузка дополнительных досок...'}
        </div>
      )}
    </div>
  );
}

export function BoardsListCardsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {children}
    </div>
  );
}

export function BoardsListListLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="flex flex-col gap-2">{children}</div>;
}
