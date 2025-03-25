import { useEffect, useRef } from 'react';
import { gameLogic } from './game/root';

interface CubeRendererProps {
  width?: number;
  height?: number;
}
const CubeRenderer: React.FC<CubeRendererProps> = ({ width = 800, height = 600 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    gameLogic(canvas);

    return () => {
    };
  }, []);

  return <canvas ref={canvasRef} width={width} height={height} style={{ border: '1px solid black' }} />;
};

export default CubeRenderer;
