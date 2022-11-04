import { EntityModel } from '@midwayjs/orm';
import { BaseEntity } from '@cool-midway/core';
import { Column, JoinColumn, OneToOne } from 'typeorm';
import { GoodSkuEntity } from './goodManage_Sku'
/**
 * 商品
 */
@EntityModel('mall_goodmanage')
export class GoodsEntity extends BaseEntity {
  @Column({ comment: '商品标题' })
  title: string;
  @Column({ comment: '商品封面图' })
  cover: string;
  @Column({ comment: '商品轮播图', type: 'text' })
  imgData: string;
  @Column({ comment: '划线价价格' })
  row_price: string
  @Column({ comment: '商品价格' })
  price: string
  @Column({ comment: '所属分类' })
  category_id: string
  @Column({ comment: '商品备注' })
  remark: string
  // @Column({ comment: '要求添加收获地址 0 不需要 1需要' })
  // req_address: boolean
  @Column({ comment: '运费类型 0 包邮 1到付 ' })
  freight_type: number
  @Column({ comment: '到付价格', nullable: true })
  freight_price: string
  @Column({ comment: '商品库存' })
  inventory: number
  @Column({ comment: '商品详情', nullable: false, type: 'text' })
  goods_desc: string
  @Column({ comment: '单规格SKu 0 多规格Sku 1', default: 0 })
  sku_type: number
  @Column({ comment: 'sku', nullable: true, })
  sku_id: string
  @Column({ comment: '会场品牌id', nullable: true, })
  brandId: string
  @Column({ comment: '状态 0 上架 1下架', default: '0' })
  state: string

  @Column({ comment: '排序', default: 0 })
  sort: number

  @OneToOne(type => GoodSkuEntity)
  @JoinColumn()
  sku: GoodSkuEntity;

}
