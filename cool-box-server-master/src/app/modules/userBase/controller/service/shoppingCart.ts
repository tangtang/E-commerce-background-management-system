import { Provide } from '@midwayjs/decorator';
import { BaseService } from '@cool-midway/core';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository } from 'typeorm';
import { ShoppingCartEntity } from '../../entity/shoppingCart';
import { GoodsEntity } from '../../../mall/entity/goods';


/**
 * 购物车接口
 */
@Provide()
export class ShoppingCartService extends BaseService {
  @InjectEntityModel(ShoppingCartEntity)
  ShoppingCartEntity: Repository<ShoppingCartEntity>;
  @InjectEntityModel(GoodsEntity)
  GoodsEntity: Repository<GoodsEntity>;


  /**
   * 新增购物车
   */
  async add(param) {
    const scart = await this.ShoppingCartEntity.findOne({ goods_id: param.goods_id });
    param.userId = this.ctx.private.userId
    if (scart) {
      Number(param.quantity)
      param.quantity = Number(scart.quantity) + Number(param.quantity)
      await this.ShoppingCartEntity.update(scart.id, { quantity: param.quantity });
    } else {
      await this.ShoppingCartEntity.save(param);
    }
    return param.id
  }


  /**
 * 分页查询
 * @param query
 * @param option
 * @param connectionName
 */

  async page(query) {
    const sql = `
      SELECT
        a.*,COUNT( b.id ) AS goodsCount,( SELECT JSON_ARRAYAGG( JSON_OBJECT('id', b.id, 'cover', b.cover, 'price', b.price,'title',b.title) )
      FROM 
        mall_goodmanage b
        WHERE 
    
          b.brandId = a.id AND b.state = '0' LIMIT 3  ) AS goods 
      FROM
         brand_manage a
      LEFT JOIN mall_goodmanage b ON b.brandId = a.id 	 WHERE a.state = '0'  GROUP BY a.id`;
    return this.sqlRenderPage(sql, query);
  }


}
