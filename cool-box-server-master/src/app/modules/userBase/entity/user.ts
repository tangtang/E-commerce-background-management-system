import { EntityModel } from '@midwayjs/orm';
import { BaseEntity } from '@cool-midway/core';
import { Column } from 'typeorm';

/**
 * 用户表
 */
@EntityModel('user')
export class UserEntity extends BaseEntity {
  @Column({ comment: '密码' })
  password: string;

  @Column({ comment: '昵称', nullable: true })
  nickName: string;

  @Column({ comment: '头像', nullable: true })
  headImg: string;

  @Column({ comment: '手机', length: 20 })
  phone: string;

  @Column({ comment: '邮箱', nullable: true })
  email: string;

  @Column({ comment: '备注', nullable: true })
  remark: string;

  @Column({ comment: '状态 0:禁用 1：启用', default: 1, type: 'tinyint' })
  status: number;
}
