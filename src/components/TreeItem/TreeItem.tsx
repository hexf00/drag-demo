import { Vue, Component, Prop } from 'vue-property-decorator'
import { CreateElement } from 'vue'

@Component
export default class TreeItem extends Vue {
  // 配置JSX中属性类型检查
  $props!: {
    item: ITreeItem<{ value: string }>
  }

  @Prop(Object) item!: ITreeItem<{ value: string }>

  render(h: CreateElement) {
    return <li>
      {this.item.value}
      <ul>
        {this.item.children.map(it => <TreeItem item={it}></TreeItem>)}
      </ul>
    </li>
  }
}
