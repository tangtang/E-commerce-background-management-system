import { EntityModel } from '@midwayjs/orm';
import { BaseEntity } from '@cool-midway/core';
import { Column } from 'typeorm';

/**
 * 商品评论
 */
@EntityModel('user_comments')
export class CommentsEntity extends BaseEntity {
  @Column({ comment: '用户id', nullable: true })
  user_id: number;
  @Column({ comment: '商品id' })
  goods_id: number;
  @Column({ comment: '用户名称', nullable: true })
  userName: string;
  @Column({ comment: '用户头像', nullable: true })
  userImg: string;
  @Column({ comment: '商品分数', default: 0 })
  goods_score: number;
  @Column({ comment: '服务分数', default: 0 })
  service_score: number;
  @Column({ comment: '评价图片', nullable: true })
  comm_img: string;
  @Column({ comment: '评论内容' })
  comm_Content: string;
  @Column({ comment: '回复内容', nullable: true })
  reply_Content: string;
  @Column({ comment: '评论类型 0 是虚拟评论 1 是用户评论', default: 0 })
  comm_type: number;
  @Column({ comment: '评价时间', nullable: true })
  comm_date: Date;
}
