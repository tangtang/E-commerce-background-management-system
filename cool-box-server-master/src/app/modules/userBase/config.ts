import { Application } from 'egg';
import { ModuleConfig } from '@cool-midway/core';

/**
 * 模块配置
 */
export default (app: Application) => {
  return {
    // 模块名称
    name: '用户管理',
    // 模块描述
    description: '用户管理',
    // 中间件，只对本模块有效
    middlewares: [],
    // 中间件，全局有效
    globalMiddlewares: [
      'userBaseAuthorityMiddleware'
    ],
    // jwt 生成解密token的
    jwt: {
      // 注意： 最好重新修改，防止破解
      secret: 'NJBBXHSGTSGTUJK',
      // token
      token: {
        // 24小时过期，需要用刷新token
        expire: 24 * 3600,
        // 15天内，如果没操作过就需要重新登录
        refreshExpire: 24 * 3600 * 15,
      },
    },
    // 模块加载顺序，默认为0，值越大越优先加载
    order: 0,
  } as ModuleConfig;
};