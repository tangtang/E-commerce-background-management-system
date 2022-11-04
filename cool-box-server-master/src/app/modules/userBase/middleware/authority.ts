import { App, Config, Provide } from '@midwayjs/decorator';
import {
  IWebMiddleware,
  IMidwayWebNext,
  IMidwayWebApplication,
} from '@midwayjs/web';
import * as _ from 'lodash';
import { CoolConfig, RESCODE } from '@cool-midway/core';
import * as jwt from 'jsonwebtoken';
import { Context } from 'egg';

/**
 * 权限校验
 */
@Provide()
export class userBaseAuthorityMiddleware implements IWebMiddleware {
  @Config('cool')
  coolConfig: CoolConfig;

  @Config('module.base')
  jwtConfig: CoolConfig;

  coolCache;

  @App()
  app: IMidwayWebApplication;

  resolve() {
    return async (ctx: Context, next: IMidwayWebNext) => {
      let statusCode = 200;
      let { url } = ctx;
      const { prefix } = this.coolConfig.router;
      url = url.replace(prefix, '');
      const token = ctx.get('Authorization');
      const p_url = '/private/';
      // 路由地址为 private前缀的 需要权限校验
      if (_.startsWith(url, p_url)) {
        try {
          ctx.private = jwt.verify(token, this.jwtConfig.jwt.secret);
        } catch (err) { }
        console.log(ctx.private);

        if (ctx.private) {
          // 如果传的token是refreshToken则校验失败
          if (ctx.private.isRefresh) {
            ctx.status = 401;
            ctx.body = {
              code: RESCODE.COMMFAIL,
              message: '登录失效~',
            };
            return;
          }
        }
        if (statusCode > 200) {
          ctx.status = statusCode;
          ctx.body = {
            code: RESCODE.COMMFAIL,
            message: '登录失效或无权限访问~',
          };
          return;
        }
      }
      await next();
    };
  }
}
