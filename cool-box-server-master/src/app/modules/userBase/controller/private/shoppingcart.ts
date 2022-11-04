import { Provide } from '@midwayjs/decorator';
import { CoolController, BaseController } from '@cool-midway/core';
import { ShoppingCartEntity } from '../../entity/shoppingCart';
import { GoodsEntity } from '../../../mall/entity/goods';
import { ShoppingCartService } from '../service/shoppingCart';

/**
 * 购物车模块
 */
@Provide()
@CoolController({
  api: ['add', 'delete', 'page'],
  entity: ShoppingCartEntity,
  service: ShoppingCartService,
  insertParam: (ctx => {
    return {
      // 获得当前登录的后台用户ID，需要请求头传Authorization参数
      userId: ctx.private.userId
    }
  }),
  pageQueryOp: {
    select: ['a.*', 'b.title AS goods_name', 'b.cover AS goods_cover'],
    join: [
      {
        entity: GoodsEntity,
        alias: 'b',
        condition: 'a.goods_id = b.id',
        type: 'leftJoin'
      },
    ]
  }

})
export class ShoppingCartPrivateController extends BaseController { }
