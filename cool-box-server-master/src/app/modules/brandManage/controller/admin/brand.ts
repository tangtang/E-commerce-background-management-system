import { Inject, Post, Provide } from '@midwayjs/decorator';
import { CoolController, BaseController } from '@cool-midway/core';

import { GoodsEntity } from '../../../mall/entity/goods';
import { BrandService } from '../../service/brand';
import { Context } from 'egg';
import { BrandEntity } from '../../entity/brand';

// import { GoodsManageEntity } from '../../../mall/entity/goodManage';

/**
 * 品牌接口
 */
@Provide()
@CoolController({
  api: ['add', 'delete', 'update', 'info', 'list', 'page'],
  entity: BrandEntity,
  pageQueryOp: {
    select: ['a.*', 'COUNT(b.id) AS goodsCount'],
    join: [
      {
        entity: GoodsEntity,
        alias: 'b',
        condition: 'a.id = b.brandId',
        type: 'leftJoin'
      },
    ],
    extend: async find => {
      find.groupBy('a.id')
    }
  },
})
export class BrandAdminController extends BaseController {
  @Inject()
  BrandService: BrandService;

  /*
  *状态管理
  */
  @Post('/b_state')
  async b_state(ctx: Context) {
    await this.BrandService.b_state(ctx)
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
