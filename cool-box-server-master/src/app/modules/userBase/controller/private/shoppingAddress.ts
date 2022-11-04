import { Provide } from '@midwayjs/decorator';
import { CoolController, BaseController } from '@cool-midway/core';
import { ShoppingAddressEntity } from '../../entity/shoppingAddress';
import { ShoppingAddressService } from '../service/shoppingAddress';

/**
 * 用户收货地址
 */
@Provide()
@CoolController({
  api: ['add', 'delete', 'update', 'info', 'list'],
  entity: ShoppingAddressEntity,
  service: ShoppingAddressService,
  insertParam: (ctx => {
    return {
      // 获得当前登录的后台用户ID，需要请求头传Authorization参数
      userId: ctx.private.userId
    }
  })
})
export class ShoppingAddressPrivateController extends BaseController { }
