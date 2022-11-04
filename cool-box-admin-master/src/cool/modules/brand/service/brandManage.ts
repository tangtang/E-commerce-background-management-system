import { BaseService, Service } from "/@/cool";


@Service('brandManage/brand')
class BrandManage extends BaseService {
  goods_sel() {
    return this.request({
      url: "/goods_sel"
    });
  }

}

export default BrandManage