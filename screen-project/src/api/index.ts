import type {
  AreaType,
  HotCategoryType,
  SalesType,
  StockType,
  TrendType,
} from "@/types";
import request from "@/utils/request.ts";

// 获取销售列表
// 【原】无任何调用方（销售数据走 Socket.IO 实时推送）
export const getSalesList = () => request.get<SalesType[]>("/sales");

// 获取地区销量趋势列表
export const getTrendList = () => request.get<TrendType[]>("/trend");

// 获取热销商品占比列表
export const getHotList = () => request.get<HotCategoryType[]>("/hot");

// 获取库存和销量分析列表
export const getStockList = () => request.get<StockType[]>("/stock");

// 获取地区销售排行数据对象的类型
export const getAreaList = () => request.get<AreaType[]>("/area");
