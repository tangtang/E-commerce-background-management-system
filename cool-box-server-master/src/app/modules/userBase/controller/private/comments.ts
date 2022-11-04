import { Provide } from '@midwayjs/decorator';
import { CoolController, BaseController } from '@cool-midway/core';
import { CommentsEntity } from '../../entity/comments';
import { CommentsService } from '../service/comments';

/**
 * 用户商品评论
 */
@Provide()
@CoolController({
  api: ['add', 'delete', 'list', 'page'],
  entity: CommentsEntity,
  service: CommentsService
})
export class CommentsPrivateController extends BaseController { }
