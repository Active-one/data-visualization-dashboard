// import { MockMethod } from "vite-plugin-mock";
import type { MockMethod } from "vite-plugin-mock";
import Mock from "mockjs";

export default [
  // 销售统计接口
  {
    url: "/api/sales",
    method: "get",
    response: () => {
      return Mock.mock({
        code: 200,
        msg: "success",
        "data|6": [
          {
            "id|+1": 1,
            name: "商家@id",
            value: "@integer(50, 250)",
          },
        ],
      });
    },
  },
  // 地区销量趋势接口
  {
    url: "/api/trend",
    method: "get",
    response: () => {
      return Mock.mock({
        code: 200,
        msg: "success",
        "data|5": [
          {
            id: "@guid",
            name: "@city",
            "value|12": ["@float(20, 280, 0, 2)"],
          },
        ],
      });
    },
  },
  // 热销商品的占比接口
  {
    url: "/api/hot",
    method: "get",
    response: () => {
      return Mock.mock({
        code: 200,
        msg: "success",
        data: [
          {
            name: "服装",
            children: [
              {
                name: "裙装",
                value: 57995,
                children: [
                  {
                    name: "鱼尾裙",
                    value: 10236,
                  },
                  {
                    name: "半身裙",
                    value: 25603,
                  },
                  {
                    name: "包臀裙",
                    value: 22156,
                  },
                ],
              },
              {
                name: "女士上衣",
                value: 30841,
                children: [
                  {
                    name: "oversize衬衫",
                    value: 5679,
                  },
                  {
                    name: "雪纺衫",
                    value: 13175,
                  },
                  {
                    name: "polo衫",
                    value: 11987,
                  },
                ],
              },
              {
                name: "外套",
                value: 110148,
                children: [
                  {
                    name: "牛仔外套",
                    value: 48671,
                  },
                  {
                    name: "针织外套",
                    value: 36910,
                  },
                  {
                    name: "风衣外套",
                    value: 24567,
                  },
                ],
              },
              {
                name: "裤装",
                value: 183258,
                children: [
                  {
                    name: "直筒裤",
                    value: 65143,
                  },
                  {
                    name: "阔腿裤",
                    value: 50261,
                  },
                  {
                    name: "铅笔裤",
                    value: 67854,
                  },
                ],
              },
              {
                name: "特色类目",
                value: 22560,
                children: [
                  {
                    name: "大码装",
                    value: 2560,
                  },
                  {
                    name: "旗袍",
                    value: 10000,
                  },
                  {
                    name: "礼服",
                    value: 10000,
                  },
                ],
              },
              {
                name: "童装",
                value: 20110,
                children: [
                  {
                    name: "童衣",
                    value: 5000,
                  },
                  {
                    name: "童裤子",
                    value: 15110,
                  },
                ],
              },
            ],
          },
        ],
      });
    },
  },
  // 库存和销量分析
  {
    url: "/api/stock",
    method: "get",
    response: () => {
      return Mock.mock({
        code: 200,
        msg: "success",
        data: [
          {
            name: "IPhone 16",
            stock: "@integer(2000, 4000)",
            sales: "@integer(3000, 5000)",
          },
          {
            name: "牛仔裤",
            stock: "@integer(10000, 30000)",
            sales: "@integer(20000, 50000)",
          },
          {
            name: "卫衣",
            stock: "@integer(10000, 30000)",
            sales: "@integer(20000, 50000)",
          },
          {
            name: "衬衫",
            stock: "@integer(10000, 30000)",
            sales: "@integer(20000, 50000)",
          },
          {
            name: "HUAWEI P70",
            stock: "@integer(2000, 5000)",
            sales: "@integer(4000, 6000)",
          },
        ],
      });
    },
  },
  // 地区销售排行
  {
    url: "/api/area",
    method: "get",
    response: () => {
      return Mock.mock({
        code: 200,
        msg: "success",
        "data|8": [
          {
            id: "@guid",
            name: "@city",
            value: "@integer(80, 400)",
          },
        ],
      });
    },
  },
] as MockMethod[];
