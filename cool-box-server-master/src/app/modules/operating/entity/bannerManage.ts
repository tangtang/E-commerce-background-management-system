import { EntityModel } from '@midwayjs/orm';
import { BaseEntity } from '@cool-midway/core';
import { Column } from 'typeorm';

/**
 * 描述
 */
@EntityModel('operating/operating_banner')
export class BannerManageEntity extends BaseEntity {
  @Column({ comment: 'banner名称' })
  title: string;
  @Column({ comment: 'banner图片' })
  img: string;
  @Column({ comment: '跳转的url', nullable: true })
  url: string;
  @Column({ comment: '排序', default: 0 })
  sort: number;
}
