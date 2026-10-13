import { ref, shallowRef } from "vue";
import type { UseAsyncOptions, UseAsyncReturn } from "@/types";

export const useAsync = <T, Params extends any[]>(
  fn: (...args: Params) => Promise<T>,
  options: UseAsyncOptions<T, Params>,
): UseAsyncReturn<T, Params> => {
  // 默认参数
  const {
    beforeCalling,
    onSuccess,
    onError,
    params = [],
    shallow = false,
    immediate = false,
  } = options;

  const loading = ref(false); // 加载状态
  const data = shallow ? shallowRef<T>() : ref<T>();
  const error = ref<unknown>(); // 错误信息

  // 具体的执行方法
  const execute = async (...args: any) => {
    try {
      loading.value = true;
      error.value = null;
      beforeCalling && beforeCalling();

      const res = await fn(...args);
      data.value = res;

      onSuccess && onSuccess(res);

      return res;
    } catch (err: unknown) {
      error.value = err;
      onError && onError(err);
      return;
    } finally {
      loading.value = false;
    }
  };

  // 立即调用
  if (immediate) {
    execute(params);
  }

  return {
    loading,
    data,
    error,
    execute,
  };
};
