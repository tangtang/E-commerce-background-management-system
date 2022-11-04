import { Provide } from '@midwayjs/decorator';
import { CoolController, BaseController } from '@cool-midway/core';
import { BannerManageEntity } from '../../entity/bannerManage';

/**
 * 轮播图接口
 */
@Provide()
@CoolController({
  api: ['list'],
  entity: BannerManageEntity,
})
export class BannerManageAppController extends BaseController { }
