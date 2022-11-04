import { Provide } from '@midwayjs/decorator';
import { CoolController, BaseController } from '@cool-midway/core';
import { BannerManageEntity } from '../../entity/bannerManage';

/**
 * 描述
 */
@Provide()
@CoolController({
  api: ['add', 'delete', 'update', 'info', 'list', 'page'],
  entity: BannerManageEntity,
})
export class BannerManageAdminController extends BaseController { }
