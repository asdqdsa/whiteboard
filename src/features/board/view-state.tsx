import type { ExpandDeep } from '@/shared/lib/types';
import { useState } from 'react';

type AddStickerViewState = { type: 'add-sticker' };
type IdleViewSate = { type: 'idle' };
type ViewState = ExpandDeep<AddStickerViewState | IdleViewSate>;

export function useBoardViewState() {
  const [viewState, setViewState] = useState<ViewState>({ type: 'idle' });

  const goToIdle = () => {
    setViewState({ type: 'idle' });
  };

  const goToAddSticker = () => {
    setViewState({ type: 'add-sticker' });
  };

  return { viewState, goToAddSticker, goToIdle };
}
