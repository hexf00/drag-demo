import { Inject, InjectRef, Service } from 'ioc-di'

/** 拖拽信息 */
type IDragInfo = {
  status: boolean
  item: string | undefined
  target: string | undefined
  pos: string | undefined
}

@Service()
export default class IndexService {

  dragInfo: IDragInfo = {
    status: false,
    item: undefined,
    target: undefined,
    pos: undefined,
  }

  resetDragInfo() {
    this.dragInfo = {
      status: false,
      item: undefined,
      target: undefined,
      pos: undefined,
    }
  }

}