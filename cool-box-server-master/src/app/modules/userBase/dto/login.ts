import { Rule, RuleType } from '@midwayjs/decorator';
/**
 * 登录参数校验
 */
export class LoginDTO {
  // 用户名
  @Rule(RuleType.string().required())
  phone: string;

  // 密码
  @Rule(RuleType.string().required())
  password: string;


}
