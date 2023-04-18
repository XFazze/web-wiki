import { useEffect, useRef, useState } from 'react';

export const UseDraw = (
  draw: ({ ctx }: Draw) => void,
  update: ({ origin, destination, current, mouseDown }: Line) => void
) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const lastPoint = useRef<null | Point>(null);
  const prevPoint = useRef<null | Point>(null);
  const [mouseDown, setMouseDown] = useState(0);

  const onMouseDown = function (e: { button: number }) {
    if (e.button === 0) {
      setMouseDown(1);
    } else if (e.button === 1) {
      setMouseDown(2);
    }
  };

  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d')!;
    draw({ ctx });

    const mouseHandler = (e: MouseEvent) => {
      const currentPoint = computeMouseInCanvas(e);
      if (!currentPoint) return;
      lastPoint.current = currentPoint;
      if (!mouseDown) return;
      update({ origin: prevPoint.current, destination: currentPoint, current: lastPoint.current, mouseDown });
      draw({ ctx });
      prevPoint.current = currentPoint;
    };
    const computeMouseInCanvas = (e: MouseEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      return { x, y };
    };
    const mouseUpHandler = () => {
      setMouseDown(0);
      update({ origin: prevPoint.current, destination: null, current: lastPoint.current, mouseDown });
      draw({ ctx });
      prevPoint.current = null;
    };

    canvasRef.current?.addEventListener('mousemove', mouseHandler);
    // canvasRef.current?.addEventListener('contextmenu', mouseHandler);
    window.addEventListener('mouseup', mouseUpHandler);
    return () => {
      canvasRef.current?.removeEventListener('mousemove', mouseHandler);
      window.removeEventListener('mouseup', mouseUpHandler);
    };
  }, [draw, update]);
  return { canvasRef, onMouseDown };
};
