import type { ExpandDeep } from '@/shared/lib/types';
import { useState } from 'react';

export type NodeBase = { id: string; type: string };

export type StickerNode = {
  type: 'sticker';
  text: string;
  x: number;
  y: number;
} & NodeBase;

export type Node = ExpandDeep<StickerNode>;

export function useNodes() {
  const [nodes, setNodes] = useState<Node[]>([
    { id: '1', type: 'sticker', text: 'Hello', x: 120, y: 80 },
    { id: '2', type: 'sticker', text: 'Board', x: 250, y: 180 },
  ]);

  const addSticker = (data: Omit<StickerNode, 'id' | 'type'>) => {
    setNodes((prev) => [
      ...prev,
      { id: crypto.randomUUID(), type: 'sticker', ...data },
    ]);
  };

  return { nodes, addSticker };
}
