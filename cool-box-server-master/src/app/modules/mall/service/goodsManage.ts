import { Provide } from '@midwayjs/decorator';
import { BaseService } from '@cool-midway/core';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository } from 'typeorm';
import { GoodsEntity } from '../entity/goods';
import { CommentsEntity } from '../../userBase/entity/comments'
import * as _ from 'lodash';

/**
 * 商品查询
 */
@Provide()
export class GoodsService extends BaseService {
  @InjectEntityModel(GoodsEntity)
  GoodsEntity: Repository<GoodsEntity>;
  @InjectEntityModel(CommentsEntity)
  CommentsEntity: Repository<CommentsEntity>;


  /**
   * 商品条件查询接口
   */
  async goods_sel(ctx) {
    return this.GoodsEntity.find({
      select: ["id", 'title'],
      where: { brandId: ctx.request.body.brandId }
    });
  }

  /**
   * 修改项目状态
   */
  async goods_state(ctx) {
    const goods = await this.GoodsEntity.findOne({ id: ctx.request.body.id });
    goods.state = ctx.request.body.state
    return await this.GoodsEntity.update(goods.id, goods);
  }


  /*
  * 删除商品
  */
  async delete(ids) {
    let idArr;
    if (ids instanceof Array) {
      idArr = ids;
    } else {
      idArr = ids.split(',');
    }
    for (const id of idArr) {
      await this.GoodsEntity.delete({ id });

      await this.delComments(id)
    }
  }
  /*
 * 删除商品关联的评论
 */
  private async delComments(id: number) {
    const comment = await this.CommentsEntity.find({ goods_id: id });
    if (_.isEmpty(comment)) {
      return;
    }
    console.log(comment);

    const commentIds = comment.map(e => {
      return e.id;
    });
    await this.CommentsEntity.delete(commentIds);
    for (const commId of commentIds) {
      await this.delComments(commId);
    }
  }


}
