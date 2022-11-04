import { Provide } from '@midwayjs/decorator';
import { CoolController, BaseController } from '@cool-midway/core';

import { BrandService } from '../../service/brand';
import { GoodsEntity } from '../../../mall/entity/goods';
import { BrandEntity } from '../../entity/brand';

// import { GoodsManageEntity } from '../../../mall/entity/goodManage';
// import { GoodsManageEntity } from '../../../mall/entity/goodManage';

/**
 * 品牌管理接口
 */
@Provide()
@CoolController({
  api: ['info', 'list', 'page'],
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
  service: BrandService
})
export class BrandAppController extends BaseController {


}
