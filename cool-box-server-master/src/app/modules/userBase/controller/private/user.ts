import { Inject, Post, Provide } from '@midwayjs/decorator';
import { CoolController, BaseController } from '@cool-midway/core';
import { UserEntity } from '../../entity/user';
import { UserService } from '../service/user';

/**
 * app端用户接口
 */
@Provide()
@CoolController({
  api: ['update', 'info'],
  entity: UserEntity,
})
export class UserPrivateController extends BaseController {
  @Inject()
  UserService: UserService
  @Post('/personUpdate')
  async personUpdate(param) {
    return this.ok(await this.UserService.personUpdate(param))
  }
}

