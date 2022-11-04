import { Provide } from '@midwayjs/decorator';
import { BaseService } from '@cool-midway/core';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository } from 'typeorm';
import { BrandEntity } from '../entity/brand';

/**
 * 描述
 */
@Provide()
export class BrandService extends BaseService {
  @InjectEntityModel(BrandEntity)
  BrandEntity: Repository<BrandEntity>;


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

  async b_state(ctx) {
    const brand = await this.BrandEntity.findOne({ id: ctx.request.body.id });
    brand.state = ctx.request.body.state
    return await this.BrandEntity.update(brand.id, brand)
  }

}
