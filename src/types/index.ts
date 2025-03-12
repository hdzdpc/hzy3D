// 全局类型定义
export type AppTheme = 'light' | 'dark';

// 通用响应类型
export interface ApiResponse<T = any> {
  data: T;
  success: boolean;
  message?: string;
}

// 通用组件Props类型
export interface BaseProps {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}
