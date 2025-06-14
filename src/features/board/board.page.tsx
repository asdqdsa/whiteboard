// import type { PathParams, ROUTES } from '@/shared/model/routes';
import { Button } from '@/shared/ui/kit/button';
import { ArrowRightIcon, StickerIcon } from 'lucide-react';
// import { useParams } from 'react-router-dom';
import { useNodes } from './nodes';
import { useViewModel } from './view-model';
import { useEffect, useRef, type Ref } from 'react';
import { useCanvasRect } from './use-canvas-rect';
import { cn } from '@/shared/lib/css';

function useLayoutFocus() {
  const focusLayoutRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (focusLayoutRef.current) focusLayoutRef.current.focus();

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible')
        focusLayoutRef.current?.focus();
    };

    window.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [focusLayoutRef]);

  return { focusLayoutRef };
}

function BoardPage() {
  const { nodes, addSticker } = useNodes();
  const viewModel = useViewModel();
  const { canvasRef, canvasRect } = useCanvasRect();
  const { focusLayoutRef } = useLayoutFocus();
  console.log(canvasRect);
  // const params = useParams<PathParams[typeof ROUTES.BOARD]>();
  // return <div>Board page{params.boardId}</div>;
  return (
    <Layout
      ref={focusLayoutRef}
      onKeyDown={({ key }: React.KeyboardEvent) => {
        if (viewModel.viewState.type === 'add-sticker') {
          if (key === 'Escape') viewModel.goToIdle();
        }
        if (viewModel.viewState.type === 'idle') {
          if (key.toLocaleLowerCase() === 's') viewModel.goToAddSticker();
        }
      }}
    >
      <Dots />
      <Canvas
        ref={canvasRef}
        onClick={({ clientX, clientY }) => {
          if (viewModel.viewState.type === 'add-sticker' && canvasRect) {
            addSticker({
              text: 'canvasDefault',
              x: clientX - canvasRect.x,
              y: clientY - canvasRect.y,
            });
            // goToIdle();
          }
        }}
      >
        {nodes.map(({ id, x, y, text }) => (
          <Sticker
            key={id}
            text={text}
            x={x}
            y={y}
            selected={
              viewModel.viewState.type === 'idle' &&
              viewModel.viewState.selectedIds.has(id)
            }
            onClick={(e) => {
              if (viewModel.viewState.type === 'idle') {
                if (e.ctrlKey || e.shiftKey) {
                  viewModel.selection([id], 'toggle');
                } else {
                  viewModel.selection([id], 'replace');
                }
              }
            }}
          />
        ))}
      </Canvas>
      <Actions>
        <ActionButton
          isActive={viewModel.viewState.type === 'add-sticker'}
          onClick={() => {
            if (viewModel.viewState.type === 'idle') viewModel.goToAddSticker();
            else viewModel.goToIdle();
          }}
        >
          <StickerIcon />
        </ActionButton>
        <ActionButton
          isActive={false}
          onClick={() => addSticker({ text: 'Hiii', x: 400, y: 300 })}
        >
          <ArrowRightIcon />
        </ActionButton>
      </Actions>
    </Layout>
  );
}

export const Component = BoardPage;

function Layout({
  children,
  ref,
  ...props
}: {
  children: React.ReactNode;
  ref: Ref<HTMLDivElement>;
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      ref={ref}
      className="relative grow"
      tabIndex={0}
      onKeyDown={() => console.log('on key down')}
      {...props}
    >
      {children}
    </div>
  );
}

function Dots() {
  return (
    <div className="absolute inset-0 bg-[radial-gradient(#4b4b4b_1px,transparent_1px)] [background-size:16px_16px]"></div>
  );
}

function Canvas({
  children,
  ref,
  ...props
}: {
  children: React.ReactNode;
  ref: Ref<HTMLDivElement>;
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div ref={ref} {...props} className="absolute inset-0">
      {children}
    </div>
  );
}

function Sticker({
  text,
  x,
  y,
  onClick,
  selected,
}: {
  text: string;
  x: number;
  y: number;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  selected: boolean;
}) {
  return (
    <button
      className={cn(
        'absolute rounded-xs bg-emerald-900 px-2 py-4 shadow-md',
        selected && 'outline outline-2 outline-blue-400',
      )}
      style={{ transform: `translate(${x}px, ${y}px)` }}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

function Actions({ children }: { children: React.ReactNode }) {
  return (
    <div className="absolute top-1/2 left-4 flex translate-y-1/2 flex-col gap-2 rounded-md bg-slate-600 p-1 shadow">
      {children}
    </div>
  );
}

function ActionButton({
  children,
  isActive,
  onClick,
}: {
  children: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <Button
      variant="ghost"
      size="icon"
      className={`hover:bg-emerald-600/40 hover:text-white ${
        isActive ? 'bg-emerald-600/30 text-white' : 'text-emerald-400'
      }`}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}
