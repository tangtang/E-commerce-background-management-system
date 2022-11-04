import { EntityModel } from '@midwayjs/orm';
import { BaseEntity } from '@cool-midway/core';
import { Column } from 'typeorm';
/**
 * 品牌表
 */
@EntityModel('brand_manage')
export class BrandEntity extends BaseEntity {
  @Column({ comment: '品牌方名称' })
  name: string;
  @Column({ comment: '品牌方logo' })
  logo: string;
  @Column({ comment: '品牌活动banner' })
  banner: string;
  @Column({ comment: '品牌方简介' })
  desc: string;
  @Column({ comment: '备注发货问题' })
  note: string;
  @Column({ comment: '排序' })
  sort: number;
  @Column({ comment: '状态', default: '0' })
  state: string;
  @Column({ comment: '品牌方搞活动的时间 截止时间', nullable: true })
  activity: Date;

}


