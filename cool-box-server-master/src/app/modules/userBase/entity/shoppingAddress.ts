import { EntityModel } from '@midwayjs/orm';
import { BaseEntity } from '@cool-midway/core';
import { Column } from 'typeorm';

/**
 * 用户收货地址
 */
@EntityModel('shopping_address')
export class ShoppingAddressEntity extends BaseEntity {
  @Column({ comment: '收货人' })
  name: string;
  @Column({ comment: '手机号' })
  phone: number;
  @Column({ comment: '地区' })
  region: string;
  @Column({ comment: '标签 0 家 1 公司 2学校', default: 0 })
  label: number;
  @Column({ comment: '状态 0 默认 1否', default: 0 })
  default: number;
  @Column({ comment: '用户id' })
  userId: number;

}
