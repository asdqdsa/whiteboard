import { useCallback, useState, type RefCallback } from 'react';

type CanvasRect = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export const useCanvasRect = () => {
  const [canvasRect, setCanvasRect] = useState<CanvasRect>();
  const canvasRef: RefCallback<HTMLDivElement> = useCallback((el) => {
    const observer = new ResizeObserver((entires) => {
      for (const entry of entires) {
        const { width, height } = entry.contentRect;

        const { x, y } = entry.target.getBoundingClientRect();

        setCanvasRect({ height, width, x, y });
      }
    });

    if (el) observer.observe(el);

    console.log(el);
    return () => {
      observer.disconnect();
    };
  }, []);

  return { canvasRef, canvasRect };
};
