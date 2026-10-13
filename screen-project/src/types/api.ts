// 请求方法相关的类型

// 响应体的基本类型
export interface ResBodyBaseType {
  code: number;
  msg: string;
}

// 响应体的完整类型
export interface ResBodyType<T = any> extends ResBodyBaseType {
  data: T;
}

// 销售数据对象的类型
export interface SalesType {
  id: number;
  name: string;
  value: number;
}

// 地区销量趋势数据对象的类型
export interface TrendType {
  id: string;
  name: string;
  // 【原】类型与 mock 数据不符：/api/trend 返回的是 12 个月的数值数组
  // value: number;
  value: number[];
}

// 热销商品子分类数据对象的类型
export interface HotChildCategoryType {
  name: string;
  value: number;
  children?: HotChildCategoryType[];
}

// 热销商品分类数据对象的类型
export interface HotCategoryType {
  name: string;
  children: HotChildCategoryType[];
}

// 库存和销量分析数据对象的类型
export interface StockType {
  name: string;
  stock: number;
  sales: number;
}

// 地区销售排行数据对象的类型
export interface AreaType {
  id: string;
  name: string;
  value: number;
}
