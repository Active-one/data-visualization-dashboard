import { onMounted, onUnmounted, ref } from "vue";

type ResizeType = {
  w?: number;
  h?: number;
  isFullScreen?: boolean;
  delay?: number;
};

// 防抖函数
const debounce = (fn: Function, delay: number) => {
  let timer: NodeJS.Timeout;
  return (...args: any[]) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(
      () => {
        typeof fn === "function" && fn.apply(null, args);
      },
      delay ? delay : 100,
    );
  };
};

export const useResize = (options: ResizeType = {}) => {
  // 数据大屏容器的ref引用
  const screenRef = ref<HTMLDivElement | null>(null);
  // 缩放比例
  const scale = ref(1);

  // 配置对象默认值
  const { w = 1920, h = 1080, delay = 150, isFullScreen = false } = options;

  // 修改尺寸的方法
  const resize = () => {
    // 获取对应尺寸
    const clientWidth = document.documentElement.clientWidth;
    const clientHeight = document.documentElement.clientHeight;

    const scaleW = clientWidth / w;
    const scaleH = clientHeight / h;

    // 两者取小的
    scale.value = Math.min(scaleW, scaleH);

    // 如果要全屏
    if (isFullScreen) {
      screenRef.value!.style.transform = `scale(${scaleW}, ${scaleH})`;
    }
    // 取小的
    else {
      screenRef.value!.style.transform = `scale(${scale.value})`;
      // 然后计算居中
      screenRef.value!.style.left = `${(clientWidth - w * scale.value) / 2}px`;
      screenRef.value!.style.top = `${(clientHeight - h * scale.value) / 2}px`;
    }
  };

  const debounceResize = debounce(resize, delay);

  onMounted(() => {
    if (screenRef.value) {
      resize();
      // 屏幕缩放时，重新调用resize方法
      window.addEventListener("resize", debounceResize);
    }
  });

  onUnmounted(() => {
    window.removeEventListener("resize", debounceResize);
  });

  return {
    screenRef,
    scale,
  };
};
