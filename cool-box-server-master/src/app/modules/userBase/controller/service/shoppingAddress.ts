import { Provide } from '@midwayjs/decorator';
import { BaseService } from '@cool-midway/core';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository } from 'typeorm';
import { ShoppingAddressEntity } from '../../entity/shoppingAddress';

/**
 * 购物车模块
 */
@Provide()
export class ShoppingAddressService extends BaseService {
  @InjectEntityModel(ShoppingAddressEntity)
  ShoppingAddressEntity: Repository<ShoppingAddressEntity>;

  /**
   * 新增购物车
   */
  async add(param) {
    param.userId = this.ctx.private.userId
    await this.ShoppingAddressEntity.save(param);
    return param
  }
  /**
  * 修改购物车
  */
  async update(param) {
    param.userId = this.ctx.private.userId
    await this.ShoppingAddressEntity.save(param);
    return param
  }
}
