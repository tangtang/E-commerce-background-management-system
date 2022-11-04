import { Provide } from '@midwayjs/decorator';
import { CoolController, BaseController } from '@cool-midway/core';
import { SudokuEntity } from '../../entity/sudokuManage';

/**
 * 九宫格接口
 */
@Provide()
@CoolController({
  api: ['list'],
  entity: SudokuEntity,
})
export class SudokuAppController extends BaseController { }
