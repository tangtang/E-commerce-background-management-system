import { EntityModel } from '@midwayjs/orm';
import { BaseEntity } from '@cool-midway/core';
import { Column } from 'typeorm';

/**
 * 九宫格管理
 */
@EntityModel('operating/operating_sudoku')
export class SudokuEntity extends BaseEntity {
  @Column({ comment: '标题' })
  title: string;
  @Column({ comment: '图标' })
  icon: string;
  @Column({ comment: '链接地址' })
  url: string;
  @Column({ comment: '是否显示', default: true })
  type: boolean
  @Column({ comment: '排序', default: 0 })
  sort: number
}
