import { Vue, Component, Prop } from 'vue-property-decorator'
import { CreateElement } from 'vue'
import style from './style.module.scss'

@Component
export default class TreeItem extends Vue {
  // 配置JSX中属性类型检查
  $props!: {
    item: ITreeItem<{ value: string }>
  }

  @Prop(Object) item!: ITreeItem<{ value: string }>

  dragstart(e: DragEvent) {
    this.$set(this.$root.$data, 'item', this.item.value)
    console.log('ondragstart', this.item.value, e)
  }

  dragenter(e: DragEvent) {
    this.$set(this.$root.$data, 'target', this.item.value)
    console.log('ondragenter', this.item.value, e)
  }

  dragover(e: DragEvent) {
    this.$set(this.$root.$data, 'target', this.item.value)

    const pos = this.calDropPosition(e)

    this.$set(this.$root.$data, 'pos', pos)
    console.log('ondragover', this.item.value, pos, e)

    // 说明：没有这句drop事件将不会被触发
    e.preventDefault()

    // 说明：事件应停止冒泡，否则会循环通知到父级
    e.stopPropagation()
  }

  drop(e: DragEvent) {
    console.log('ondrop', this.item.value, e)
    // 说明：事件应停止冒泡，否则会循环通知到父级
    e.stopPropagation()
  }

  dragleave(e: DragEvent) {
    console.log('ondragleave', this.item.value, e)
  }

  calDropPosition(e: DragEvent) {
    const target = e.target as HTMLElement
    const offsetTop = target.offsetTop
    const offsetHeight = target.offsetHeight
    const pageY = e.pageY
    const gapHeight = 0.2 * offsetHeight
    if (pageY > offsetTop + offsetHeight - gapHeight) {
      //放在目标节点后面-同级
      return 'after'
    }
    if (pageY < offsetTop + gapHeight) {
      //放在目标节点前面-同级
      return 'before'
    }
    //放在目标节点里面-作为子节点
    return 'inner'
  }

  render(h: CreateElement) {
    const { dragstart, dragenter, dragover, drop, dragleave } = this
    // eslint-disable-next-line
    // @ts-ignore
    const { item, target, pos } = this.$root.$data

    console.log(target === this.item.value)

    return <li on={{ dragenter, dragover, drop, dragleave }} class={`
      ${style.li}
      ${item === this.item.value && style.ondrag} 
      ${target === this.item.value && style.ondrop} 
      ${style[pos]}
     `}>
      {/* draggable 标记什么元素可以开始拖拽  */}

      <div><span draggable on={{ dragstart, drop }}>O</span> {this.item.value}</div>
      <ul>
        {this.item.children.map(it => <TreeItem item={it}></TreeItem>)}
      </ul>
    </li>
  }
}