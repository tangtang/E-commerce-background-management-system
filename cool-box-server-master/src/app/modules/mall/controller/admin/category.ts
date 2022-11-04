import { Provide } from '@midwayjs/decorator';
import { CoolController, BaseController } from '@cool-midway/core';
import { GoodsCategoryEntity } from '../../entity/goodsCategory';

/**
 * 商品分类接口
 */
@Provide()
@CoolController({
  api: ['add', 'delete', 'update', 'info', 'list', 'page'],
  entity: GoodsCategoryEntity,
})
export class GoodsCategoryAdminController extends BaseController { }
