// 组合式函数的类型
import type { Socket } from "socket.io-client";
import type { Ref } from "vue";

// useAsync的相关类型
// 参数options的类型
export interface UseAsyncOptions<T, Params extends any[]> {
  immediate?: boolean;
  shallow?: boolean;
  params?: Params;
  beforeCalling?: () => void;
  onSuccess?: (data: T) => void;
  onError?: (error: unknown) => void;
}

// 返回值的类型
export interface UseAsyncReturn<T, Params extends any[]> {
  loading: Ref<boolean>;
  data: Ref<T | undefined>;
  error: Ref<unknown>;
  execute: (...args: Params) => Promise<T | undefined>;
}

// useWebsockte的相关类型
// 返回值类型
export interface UseWebsocketReturn {
  socket: Ref<Socket | null>;
  connectionStatus: Ref<WebsocketConnectionStatus>;
  error: Ref<Error | null>;
  subscribe: (eventName: string, callback: eventFunction) => void;
  unsubscribe: (eventName: string) => void;
  connect: () => void;
  disconnect: () => void;
}

// 参数options的类型
export interface UseWebsocketOption {
  autoConnect?: boolean; // 是否自动重连
  reconnectionDelay?: number; // 重连的延迟毫秒数
  reconnectionAttempts?: number; // 重连的尝试次数
}

// 连接状态的类型
export type WebsocketConnectionStatus = "connected" | "disconnect" | "error";

// 事件监听器中函数的类型
export type eventFunction<T = any> = (data: T) => void;
