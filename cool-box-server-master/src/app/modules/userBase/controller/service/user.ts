import { Provide } from '@midwayjs/decorator';
import { BaseService, CoolCommException } from '@cool-midway/core';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository } from 'typeorm';
import { UserEntity } from '../../entity/user';
import * as _ from 'lodash';
import * as md5 from 'md5';

/**
 * 用户
 */
@Provide()
export class UserService extends BaseService {
  @InjectEntityModel(UserEntity)
  UserEntity: Repository<UserEntity>;


  /**
   * 新增
   * @param param
   */
  async add(param) {
    const exists = await this.UserEntity.findOne({
      phone: param.phone,
    });
    if (!_.isEmpty(exists)) {
      throw new CoolCommException('用户已经存在');
    }
    param.password = md5(param.password);
    await this.UserEntity.save(param);
    return param.id;
  }
  /**
   * 修改
   * @param param 数据
   */
  async update(param) {
    if (!_.isEmpty(param.password)) {
      param.password = md5(param.password);

      const userInfo = await this.UserEntity.findOne({ id: param.id });
      if (!userInfo) {
        throw new CoolCommException('用户不存在');
      }
    } else {
      delete param.password;
    }

    await this.UserEntity.save(param);
  }


  /**
   * 根据ID获得信息
   * @param id
   */
  public async info(id) {
    const info = await this.UserEntity.findOne({ id });
    if (info) {
      delete info.password;
    }
    delete info.password;
    return info;
  }

  /**
    * 修改个人信息
    * @param id
    */
  public async personUpdate(param) {
    if (!_.isEmpty(param.password)) {
      param.password = md5(param.password);
      const userInfo = await this.UserEntity.findOne({ id: param.id });
      if (!userInfo) {
        throw new CoolCommException('用户不存在');
      }
    } else {
      delete param.password;
    }
    await this.UserEntity.save(param);
  }
}


