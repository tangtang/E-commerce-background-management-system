import { Inject, Post, Provide } from '@midwayjs/decorator';
import { CoolController, BaseController } from '@cool-midway/core';
import { CommentsEntity } from '../../entity/comments';
import { GoodsEntity } from '../../../mall/entity/goods';
import { Context } from 'egg';
import { CommentsService } from '../service/comments';

/**
 * 评论接口
 */
@Provide()
@CoolController({
  api: ['add', 'delete', 'update', 'info', 'list', 'page'],
  entity: CommentsEntity,
  pageQueryOp: {
    select: ['a.*', 'b.title AS goods_title', 'b.cover AS goods_cover'],
    join: [
      {
        entity: GoodsEntity,
        alias: 'b',
        condition: 'a.goods_id = b.id',
        type: 'leftJoin'
      },
    ]
  }
})
export class CommentsAdminController extends BaseController {
  @Inject()
  CommentsService: CommentsService
  @Post('/reply_Content')
  async reply_Content(ctx: Context) {
    return this.ok(await this.CommentsService.reply_Content(ctx))
  }
}
