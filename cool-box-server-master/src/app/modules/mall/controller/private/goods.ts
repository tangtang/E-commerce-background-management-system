import { Inject, Post, Provide } from '@midwayjs/decorator';
import { CoolController, BaseController } from '@cool-midway/core';
import { BrandEntity } from '../../../brandManage/entity/brand';

import { Context } from 'egg';
import { GoodsService } from '../../service/goodsManage';
import { GoodsEntity } from '../../entity/goods';


/**
 * 商品管理
 */
@Provide()
@CoolController({
  api: ['add', 'delete', 'update', 'info', 'list', 'page'],
  entity: GoodsEntity,
  pageQueryOp: {
    select: ['a.*', 'b.name', 'b.name AS brand_Name'],
    join: [
      {
        entity: BrandEntity,
        alias: 'b',
        condition: 'a.brandId = b.id',
        type: 'leftJoin'
      },
    ]
  }
})
export class GoodsPrivateController extends BaseController {
  @Inject()
  GoodsService: GoodsService;

  /**
   * 查询品牌关联商品
   */
  @Post('/goods_sel')
  async goods_sel(ctx: Context) {
    return this.ok(await this.GoodsService.goods_sel(ctx));
  }
  @Post('/goods_state')
  async goods_state(ctx) {
    await this.GoodsService.goods_state(ctx)
    let data = {
      code: 0
    }
    if (ctx.request.body.state === '0') {
      data.code = 1
    } else {
      data.code = 0
    }
    return this.ok(data)
  }
}
