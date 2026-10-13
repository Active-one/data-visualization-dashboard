// 对axios进行二次封装
/* import axios from 'axios';
import type {InternalAxiosRequestConfig, AxiosResponse} from 'axios';

const request = axios.create({
    baseURL: '/api',
    timeout: 5000,
})

// 请求拦截器
request.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    return config;
})
// 响应拦截器
request.interceptors.response.use((res: AxiosResponse) => {
    return res.data;
}) */

// 类写法
import type { ResBodyType } from "@/types";
import axios from "axios";
import type {
  AxiosInstance,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from "axios";
class Request {
  private request: AxiosInstance;

  // 构造器
  constructor(config: AxiosRequestConfig) {
    this.request = axios.create(config);

    // 请求拦截器
    this.request.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        return config;
      },
    );
    // 响应拦截器
    this.request.interceptors.response.use((res: AxiosResponse) => {
      return res.data;
    });
  }

  // 重写一系列方法
  get<T>(url: string, params?: object): Promise<ResBodyType<T>> {
    return this.request.get(url, { params });
  }
  post<T>(url: string, params?: object): Promise<ResBodyType<T>> {
    return this.request.post(url, params);
  }
  put<T>(url: string, params?: object): Promise<ResBodyType<T>> {
    return this.request.put(url, params);
  }
  delete<T>(url: string, params?: object): Promise<ResBodyType<T>> {
    return this.request.delete(url, { params });
  }
}

// 创建实例
const request = new Request({
  baseURL: "/api",
  timeout: 5000,
});
export default request;
