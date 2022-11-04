import { Inject, Post, Provide } from '@midwayjs/decorator';
import { CoolController, BaseController } from '@cool-midway/core';
import { GoodsEntity } from '../../entity/goods';
import { Context } from 'egg';
import { GoodsService } from '../../service/goodsManage';
/**
 * 商品管理
 */
@Provide()
@CoolController({
  api: ['info', 'list', 'page'],
  entity: GoodsEntity,
  pageQueryOp: {
    select: ['a.*'],
    fieldEq: ['brandId'],
  }
})
export class GoodsAppController extends BaseController {
  @Inject()
  GoodsService: GoodsService;
  @Post('/select')
  async select(ctx: Context) {
    return this.ok(await this.GoodsService.goods_sel(ctx));
  }
}
