import { Inject, Provide, Config } from '@midwayjs/decorator';
import {
  BaseService,
  ICoolCache,
  CoolCommException,
  CoolConfig,
  RESCODE,
} from '@cool-midway/core';
import { LoginDTO } from '../../dto/login';
import * as svgCaptcha from 'svg-captcha';
import { v1 as uuid } from 'uuid';
import { Repository } from 'typeorm';
import { InjectEntityModel } from '@midwayjs/orm';
import * as md5 from 'md5';
import * as _ from 'lodash';
import * as jwt from 'jsonwebtoken';
import { Context } from 'egg';
import * as svgToDataURL from 'mini-svg-data-uri';
import { UserEntity } from '../../entity/user';

/**
 * 登录
 */
@Provide()
export class UserBaseLoginService extends BaseService {
  @Inject('cool:cache')
  coolCache: ICoolCache;

  @InjectEntityModel(UserEntity)
  UserEntity: Repository<UserEntity>;

  @Inject()
  ctx: Context;

  @Config('module.base')
  coolConfig: CoolConfig;

  /**
   * 登录
   * @param login
   */
  async login(login: LoginDTO) {
    const { phone, password } = login;

    const user = await this.UserEntity.findOne({ phone });
    console.log('11111111');
    console.log(md5(password));
    console.log(password);

    console.log(user);
    console.log('11111111');

    // 校验用户
    if (user) {
      // 校验用户状态及密码
      if (user.status === 0 || user.password !== md5(password)) {
        throw new CoolCommException('账户或密码不正确~');
      }
    } else {
      throw new CoolCommException('账户或密码不正确~');
    }


    // 生成token
    const { expire, refreshExpire } = this.coolConfig.jwt.token;
    const result = {
      expire,
      token: await this.generateToken(user, expire),
      refreshExpire,
      refreshToken: await this.generateToken(
        user,
        refreshExpire,
        true
      ),
      userId: user.id,
      nickName: user.nickName,
      headImg: user.headImg,
      phone: user.phone
    };



    await this.coolCache.set(`admin:token:${user.id}`, result.token);
    await this.coolCache.set(`admin:token:refresh:${user.id}`, result.token);

    return result;

  }

  /**
   * 验证码
   * @param type 图片验证码类型 svg
   * @param width 宽
   * @param height 高
   */
  async captcha(type: string, width = 150, height = 50) {
    const svg = svgCaptcha.create({
      ignoreChars: 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM',
      width,
      height,
    });
    const result = {
      captchaId: uuid(),
      data: svg.data.replace(/"/g, "'"),
    };
    // 文字变白
    const rpList = [
      '#111',
      '#222',
      '#333',
      '#444',
      '#555',
      '#666',
      '#777',
      '#888',
      '#999',
    ];
    rpList.forEach(rp => {
      result.data = result.data['replaceAll'](rp, '#fff');
    });
    if (type === 'base64') {
      result.data = svgToDataURL(result.data);
    }
    // 半小时过期
    await this.coolCache.set(
      `verify:img:${result.captchaId}`,
      svg.text.toLowerCase(),
      1800
    );
    return result;
  }

  /**
   * 退出登录
   */
  async logout() {
    const { userId } = this.ctx.admin;
    await this.coolCache.del(`admin:department:${userId}`);
    await this.coolCache.del(`admin:perms:${userId}`);
    await this.coolCache.del(`admin:token:${userId}`);
    await this.coolCache.del(`admin:token:refresh:${userId}`);
  }

  /**
   * 检验图片验证码
   * @param captchaId 验证码ID
   * @param value 验证码
   */
  async captchaCheck(captchaId, value) {
    const rv = await this.coolCache.get(`verify:img:${captchaId}`);
    if (!rv || !value || value.toLowerCase() !== rv) {
      return false;
    } else {
      this.coolCache.del(`verify:img:${captchaId}`);
      return true;
    }
  }

  /**
   * 生成token
   * @param user 用户对象
   * @param roleIds 角色集合
   * @param expire 过期
   * @param isRefresh 是否是刷新
   */
  async generateToken(user, expire, isRefresh?) {
    await this.coolCache.set(
      `admin:passwordVersion:${user.id}`,
      user.passwordV
    );
    const tokenInfo = {
      isRefresh: false,
      username: user.username,
      userId: user.id,
      passwordVersion: user.passwordV,
    };
    if (isRefresh) {
      tokenInfo.isRefresh = true;
    }
    return jwt.sign(tokenInfo, this.coolConfig.jwt.secret, {
      expiresIn: expire,
    });
  }

  /**
   * 刷新token
   * @param token
   */
  async refreshToken(token: string) {
    try {
      const decoded = jwt.verify(token, this.coolConfig.jwt.secret);
      if (decoded && decoded['isRefresh']) {
        delete decoded['exp'];
        delete decoded['iat'];

        const { expire, refreshExpire } = this.coolConfig.jwt.token;
        decoded['isRefresh'] = false;
        const result = {
          expire,
          token: jwt.sign(decoded, this.coolConfig.jwt.secret, {
            expiresIn: expire,
          }),
          refreshExpire,
          refreshToken: '',
        };
        decoded['isRefresh'] = true;
        result.refreshToken = jwt.sign(decoded, this.coolConfig.jwt.secret, {
          expiresIn: refreshExpire,
        });
        await this.coolCache.set(
          `admin:passwordVersion:${decoded['userId']}`,
          decoded['passwordVersion']
        );
        return result;
      }
    } catch (err) {
      console.log(err);
      this.ctx.status = 401;
      this.ctx.body = {
        code: RESCODE.COMMFAIL,
        message: '登录失效~',
      };
      return;
    }
  }
}
