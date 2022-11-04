import { Provide } from '@midwayjs/decorator';
import { CoolController, BaseController } from '@cool-midway/core';
import { GoodsCategoryEntity } from '../../entity/goodsCategory';

/**
 * 商品分类接口
 */
@Provide()
@CoolController({
  api: ['list'],
  entity: GoodsCategoryEntity,
})
export class GoodsCategoryAppController extends BaseController { }
