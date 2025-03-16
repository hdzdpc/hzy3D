import { useEffect, useRef } from 'react';
import { WebGLRenderer } from '../../lib/renderers/webgl/webgl-renderer';

interface CubeRendererProps {
  width?: number;
  height?: number;
}
const CubeRenderer: React.FC<CubeRendererProps> = ({ width = 800, height = 600 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rendererRef = useRef<WebGLRenderer>(null);
  const animationFrameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    try {
      rendererRef.current = new WebGLRenderer(canvas);
      
      const render = (now: number) => {
        rendererRef.current?.render(now);
        animationFrameRef.current = requestAnimationFrame(render);
      };

      requestAnimationFrame(render);
    } catch (error) {
      console.error('WebGL初始化失败:', error);
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      style={{ border: '1px solid black' }}
    />
  );
};

export default CubeRenderer;