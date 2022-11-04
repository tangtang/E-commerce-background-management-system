import { ALL, Body, Inject, Post, Provide } from '@midwayjs/decorator';
import { CoolController, BaseController } from '@cool-midway/core';
import { UserEntity } from '../../entity/user';
import { UserBaseLoginService } from '../service/login';
import { LoginDTO } from '../../dto/login';


/**
 * 用户管理
 */
@Provide()
@CoolController({
  api: ['info'],
  entity: UserEntity,
})

export class UserAppController extends BaseController {
  @Inject()
  UserBaseLoginService: UserBaseLoginService

  @Post('/login')
  async login(@Body(ALL) login: LoginDTO) {
    return this.ok(await this.UserBaseLoginService.login(login));
  }
}
