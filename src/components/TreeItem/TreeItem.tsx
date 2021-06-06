import { Vue, Component, Prop } from 'vue-property-decorator'
import { CreateElement } from 'vue'
import style from './style.module.scss'
import TreeItemService from './TreeItem.service'
import container from '@/store/Container'
import { Concat } from 'ioc-di'
import { isParent } from '@/libs/TreeHelper'
import classnames from 'classnames'

@Component
export default class TreeItem extends Vue {
  service = Concat(container, new TreeItemService)

  // 配置JSX中属性类型检查
  $props!: {
    item: ITreeItem<{ value: string }>
  }

  @Prop(Object) item!: ITreeItem<{ value: string }>

  dragstart(e: DragEvent) {
    this.service.index.dragInfo.item = this.item
  }

  dragover(e: DragEvent) {
    // 说明：这两句必须在return前执行
    // 说明：没有这句drop事件将不会被触发
    e.preventDefault()
    // 说明：事件应停止冒泡，否则会递归通知到父级
    e.stopPropagation()

    const target = this.item
    const { item } = this.service.index.dragInfo

    // 说明：限制不能移动到自身、子节点上
    if (item && isParent(target, item)) {
      this.service.index.dragInfo.pos = undefined
      return
    }

    this.service.index.dragInfo.target = this.item
    this.service.index.dragInfo.pos = this.calDropPosition(e)
  }

  drop(e: DragEvent) {
    // 说明：事件应停止冒泡，否则会循环通知到父级
    e.stopPropagation()

    this.service.index.dragInfo.status = true
  }

  calDropPosition(e: DragEvent) {

    const findParent = (node: HTMLElement, condition: (node: HTMLElement) => boolean) => {
      let parent: HTMLElement | null = node

      while (parent && parent !== document.body) {
        if (condition(parent)) {
          return parent
        }
        parent = parent.parentElement
      }
    }

    const target = e.target as HTMLElement
    // 找到最近的可放置的父节点
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

    {/* droppable 标记什么元素可以接受放置  */ }
    return <li droppable on={{
      dragover: this.dragover,
      drop: this.drop,
    }} class={classnames(style.li,
      item === this.item && style.ondrag,
      target === this.item && pos && style.ondrop + ' ' + style[pos])}>
      {/* draggable 标记什么元素可以开始拖拽  */}
      <div>
        <span draggable class={style.draggable} on={{
          dragstart: this.dragstart,
        }}>O</span> {this.item.value}
      </div>
      <ul>
        {this.item.children.map(it => <TreeItem item={it} key={it.value}></TreeItem>)}
      </ul>
    </li>
  }
}