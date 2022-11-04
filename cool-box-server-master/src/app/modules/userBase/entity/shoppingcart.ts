import { EntityModel } from '@midwayjs/orm';
import { BaseEntity } from '@cool-midway/core';
import { Column } from 'typeorm';

/**
 * 购物车
 */
@EntityModel('shopping_cart')
export class ShoppingCartEntity extends BaseEntity {

  @Column({ comment: '规格', nullable: true })
  spec: string;
  @Column({ comment: '价格' })
  price: string;
  @Column({ comment: '商品数量' })
  quantity: number;
  @Column({ comment: '商品id' })
  goods_id: number;
  @Column({ comment: '用户id' })
  userId: number;
  @Column({ comment: '选中 0 是选中 1是取消', default: 0 })
  selected: number;
}
