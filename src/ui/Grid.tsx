import { useEffect, useRef } from "react";

interface GridProps {
  size: number; // * Rows and Columns
  weights: number[]; // * Length = size * size
  cellSize?: number; // * px
}

export default ({ size, weights, cellSize = 5 }: GridProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;
    context.clearRect(0, 0, canvas.width, canvas.height);

    // ? Draw grid
    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        const weight = weights[row * size + col] ?? 0;
        const normalizedValue = weight % 256;
        const grayValue = 255 - normalizedValue;
        context.fillStyle = `rgb(${grayValue}, ${grayValue}, ${grayValue})`;
        context.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
      }
    }
  }, [size, weights, cellSize]);

  return (
    <canvas width={size * cellSize} height={size * cellSize} ref={canvasRef} />
  );
};
