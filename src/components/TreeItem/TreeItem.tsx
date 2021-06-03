import { Vue, Component, Prop } from 'vue-property-decorator'
import { CreateElement } from 'vue'

@Component
export default class TreeItem extends Vue {
  // 配置JSX中属性类型检查
  $props!: {
    item: ITreeItem<{ value: string }>
  }

  @Prop(Object) item!: ITreeItem<{ value: string }>

  dragstart(e: DragEvent) {
    console.log('ondragstart', this.item.value, e)
  }

  dragenter(e: DragEvent) {
    console.log('ondragenter', this.item.value, e)
  }

  dragover(e: DragEvent) {
    console.log('ondragover', this.item.value, e)
  }

  drop(e: DragEvent) {
    console.log('ondrop', this.item.value, e)
  }

  dragleave(e: DragEvent) {
    console.log('ondragleave', this.item.value, e)
  }

  render(h: CreateElement) {
    const { dragstart, dragenter, dragover, drop, dragleave } = this
    return <li on={{ dragenter, dragover, drop, dragleave }}>
      {/* draggable 标记什么元素可以开始拖拽  */}
      <span draggable on={{ dragstart }}>O</span>
      {this.item.value}
      <ul>
        {this.item.children.map(it => <TreeItem item={it}></TreeItem>)}
      </ul>
    </li>
  }
}