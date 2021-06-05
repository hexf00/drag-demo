import { Vue, Component, Prop } from 'vue-property-decorator'
import { CreateElement } from 'vue'
import style from './style.module.scss'
import TreeItemService from './TreeItem.service'
import container from '@/store/Container'
import { Concat } from 'ioc-di'

@Component
export default class TreeItem extends Vue {
  service = Concat(container, new TreeItemService)

  // 配置JSX中属性类型检查
  $props!: {
    item: ITreeItem<{ value: string }>
  }

  @Prop(Object) item!: ITreeItem<{ value: string }>

  dragstart(e: DragEvent) {
    this.service.index.dragInfo.item = this.item.value
  }

  dragover(e: DragEvent) {
    this.service.index.dragInfo.target = this.item.value
    this.service.index.dragInfo.pos = this.calDropPosition(e)

    // 说明：没有这句drop事件将不会被触发
    e.preventDefault()

    // 说明：事件应停止冒泡，否则会循环通知到父级
    e.stopPropagation()
  }

  drop(e: DragEvent) {
    this.service.index.dragInfo.status = true

    // 说明：事件应停止冒泡，否则会循环通知到父级
    e.stopPropagation()
  }

  calDropPosition(e: DragEvent) {

    const findParent = (node: HTMLElement, condition: (node: HTMLElement) => boolean) => {
      let pNode = node.parentElement

      while (pNode && pNode !== document.body) {
        if (condition(pNode)) {
          return pNode
        }
        pNode = pNode.parentElement
      }
    }

    const target = e.target as HTMLElement
    const li = findParent(target, (node) => !!node.getAttribute('droppable'))
    if (!li) {
      return
    }

    const { offsetTop, offsetLeft, offsetHeight } = li
    const { pageX, pageY } = e
    const gapHeight = 0.5 * offsetHeight

    if (pageY < offsetTop + gapHeight) {

      //放在目标节点前面-同级
      return 'before'
    }
    if (pageX < offsetLeft + 30) {
      //放在目标节点后面-同级
      return 'after'
    }
    //放在目标节点里面-作为子节点
    return 'inner'
  }

  render(h: CreateElement) {

    const { item, target, pos } = this.service.index.dragInfo

    return <li droppable on={{
      dragover: this.dragover,
      drop: this.drop,
    }} class={`
      ${style.li}
      ${item === this.item.value && style.ondrag} 
      ${target === this.item.value && target !== item && style.ondrop} 
      ${pos && style[pos]}
     `}>
      {/* draggable 标记什么元素可以开始拖拽  */}

      <div><span draggable on={{
        dragstart: this.dragstart,
        drop: this.drop,
      }}>O</span> {this.item.value}</div>
      <ul>
        {this.item.children.map(it => <TreeItem item={it}></TreeItem>)}
      </ul>
    </li>
  }
}