import { Provide } from '@midwayjs/decorator';
import { CoolController, BaseController } from '@cool-midway/core';
import { UserEntity } from '../../entity/user';
import { UserService } from '../service/user';

/**
 * 用户管理
 */
@Provide()
@CoolController({
  api: ['add', 'delete', 'update', 'info', 'list', 'page'],
  entity: UserEntity,
  service: UserService
})
export class UserAdminController extends BaseController { }
