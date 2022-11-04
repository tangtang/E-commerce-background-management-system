import { Provide } from '@midwayjs/decorator';
import { BaseService } from '@cool-midway/core';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository } from 'typeorm';
import { CommentsEntity } from '../../entity/comments';

/**
 * 评论管理
 */
@Provide()
export class CommentsService extends BaseService {
  @InjectEntityModel(CommentsEntity)
  CommentsEntity: Repository<CommentsEntity>;

  /**
   * 回复
   */
  async reply_Content(ctx) {
    const comments = await this.CommentsEntity.findOne({ id: ctx.request.body.id });
    comments.reply_Content = ctx.request.body.reply_Content
    await this.CommentsEntity.update(comments.id, comments);
    return
  }
  async add(param) {
    param.userId = this.ctx.private.userId
    await this.CommentsEntity.save(param);
    return param
  }
}
