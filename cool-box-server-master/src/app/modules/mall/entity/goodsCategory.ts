import { EntityModel } from '@midwayjs/orm';
import { BaseEntity } from '@cool-midway/core';
import { Column } from 'typeorm';

/**
 * 商品分类
 */
@EntityModel('mall_goodcategory')
export class GoodsCategoryEntity extends BaseEntity {
  @Column({ comment: '商品分类标题' })
  title: string;
  @Column({ comment: '商品分类的图标', nullable: true })
  cover: string;
  @Column({ comment: '父ID', default: 0, nullable: false })
  parentId: number;
  @Column({ comment: '排序', default: 0 })
  sort: number
  @Column({ comment: '状态', default: true })
  status: boolean
}
