import { EntityModel } from '@midwayjs/orm';
import { BaseEntity } from '@cool-midway/core';
import { Column } from 'typeorm';

/**
 * Sku表
 */
@EntityModel('mall_goodsku')
export class GoodSkuEntity extends BaseEntity {
  @Column({ comment: '商品id' })
  good_id: string;
  @Column({ comment: 'sku的属性' })
  sku_attr_name: string;
  @Column({ comment: 'sku的属性值' })
  sku_attr_value: string;
  @Column({ comment: 'sku的图片' })
  sku_cover: string;
  @Column({ comment: 'sku的编号' })
  sku_number: string;
  @Column({ comment: 'sku的价格' })
  sku_price: string;
  @Column({ comment: '库存' })
  sku_stock: number;
  @Column({ comment: '是否上架' })
  sku_type: string;
}


