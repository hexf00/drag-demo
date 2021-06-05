import { Inject, InjectRef, Service } from 'ioc-di'

/** 拖拽信息 */
type IDragInfo = {
  status: boolean
  item: ITreeItem<{ value: string }> | undefined
  target: ITreeItem<{ value: string }> | undefined
  pos: 'before' | 'after' | 'inner' | undefined
}

@Service()
export default class IndexService {

  dragInfo: IDragInfo = {
    status: false,
    item: undefined,
    target: undefined,
    pos: undefined,
  }

  data: ITreeItem<{ value: string }>[] = [
    { value: 'a', children: [] },
    {
      value: 'b', children: [
        {
          value: 'b1', children: [
            { value: 'b11', children: [] },
            { value: 'b12', children: [] },
          ],
        },
        { value: 'b2', children: [] },
      ],
    },
  ].map(item => this.initParent(item))

  resetDragInfo() {
    this.dragInfo = {
      status: false,
      item: undefined,
      target: undefined,
      pos: undefined,
    }
  }

  initParent(item: ITreeItem<{ value: string }>, parent?: ITreeItem<{ value: string }>) {
    item.parent = parent
    item.toJSON = () => item.value
    item.children.map(it => this.initParent(it, item))
    return item
  }

  //运行拖拽
  drag() {
    const { status, item, target, pos } = this.dragInfo
    if (!status) return
  }

}