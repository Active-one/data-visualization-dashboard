import type {
  UseWebsocketReturn,
  UseWebsocketOption,
  WebsocketConnectionStatus,
  eventFunction,
} from "@/types";
import { io } from "socket.io-client";
import { Socket } from "socket.io-client";
import { onBeforeUnmount, onMounted, ref, shallowRef } from "vue";

export const useWebsocket = (
  url: string,
  options: UseWebsocketOption = {},
): UseWebsocketReturn => {
  // 默认配置对象
  const defaultOptions: UseWebsocketOption = {
    autoConnect: true,
    reconnectionDelay: 1000,
    reconnectionAttempts: 6,
  };

  // 配置默认值
  const nowOptions = Object.assign({}, defaultOptions, options);
  // 定义一些数据
  // 【原】用 ref 会深层代理 Socket 实例（无必要，且可能干扰其内部状态）
  // const socket = ref<Socket | null>(null);
  const socket = shallowRef<Socket | null>(null);
  // 连接状态
  const connectionStatus = ref<WebsocketConnectionStatus>("disconnect");
  // 错误对象
  const error = ref<Error | null>(null);
  // 事件监听器
  const events = new Map<string, eventFunction>();

  // 初始化方法
  const initSocket = () => {
    // 实例化socket.IO
    socket.value = io(url, nowOptions);

    // 监听
    socket.value.on("connect", () => {
      connectionStatus.value = "connected";
    });

    socket.value.on("disconnect", () => {
      connectionStatus.value = "disconnect";
    });

    socket.value.on("connect_error", (err) => {
      connectionStatus.value = "error";
      error.value = err;
    });

    // 通用的
    socket.value.onAny((eventNames: string, data: any) => {
      const eventFunc = events.get(eventNames);
      if (eventFunc) eventFunc(data);
    });
  };

  // 订阅事件
  const subscribe = (eventName: string, callback: eventFunction) => {
    events.set(eventName, callback);
  };

  // 取消订阅
  const unsubscribe = (eventName: string) => {
    events.delete(eventName);
  };

  // 手动连接
  const connect = () => {
    // 如果没有才初始化
    if (!socket.value) {
      initSocket();
    }
    socket.value!.connect();
  };

  // 断开连接
  const disconnect = () => {
    if (socket.value) {
      socket.value.disconnect();
      connectionStatus.value = "disconnect";
      events.clear();
    }
  };

  onMounted(() => {
    // 自动连接
    if (nowOptions.autoConnect) {
      initSocket();
    }
  });

  onBeforeUnmount(() => {
    disconnect();
  });

  return {
    socket,
    connectionStatus,
    error,
    subscribe,
    unsubscribe,
    connect,
    disconnect,
  } as UseWebsocketReturn;
};
