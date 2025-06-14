import { useState } from 'react';

type AddStickerViewState = { type: 'add-sticker' };
type IdleViewSate = { type: 'idle'; selectedIds: Set<string> };
type ViewState = AddStickerViewState | IdleViewSate;

export function useViewModel() {
  const [viewState, setViewState] = useState<ViewState>({
    type: 'idle',
    selectedIds: new Set(),
  });

  const goToIdle = () => {
    setViewState({ type: 'idle', selectedIds: new Set() });
  };

  const selection = (
    ids: string[],
    mod: 'replace' | 'add' | 'toggle' = 'replace',
  ) =>
    setViewState((prevViewState) => {
      if (prevViewState.type === 'idle') {
        return selectItems(prevViewState, ids, mod);
      }

      return prevViewState;
    });

  function selectItems(
    viewState: IdleViewSate,
    ids: string[],
    mod: 'replace' | 'add' | 'toggle' = 'replace',
  ): IdleViewSate {
    if (mod === 'replace') {
      return { ...viewState, selectedIds: new Set(ids) };
    }

    if (mod === 'add') {
      return {
        ...viewState,
        selectedIds: new Set([...viewState.selectedIds, ...ids]),
      };
    }

    if (mod === 'toggle') {
      const curIds = new Set(viewState.selectedIds);
      const newIds = new Set(ids);

      const base = Array.from(viewState.selectedIds).filter(
        (id) => !newIds.has(id),
      );
      const added = ids.filter((id) => !curIds.has(id));

      return {
        ...viewState,
        selectedIds: new Set([...base, ...added]),
      };
    }

    return viewState;
  }

  const goToAddSticker = () => {
    setViewState({ type: 'add-sticker' });
  };

  return { viewState, goToAddSticker, goToIdle, selection };
}
