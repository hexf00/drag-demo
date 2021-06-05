import { Vue, Component } from 'vue-property-decorator'
import { CreateElement } from 'vue'
import TreeItem from '@/components/TreeItem/TreeItem'
import container from '@/store/Container'
@Component
export default class Index extends Vue {

  service = container.index

  data: ITreeItem<{ value: string }>[] = this.initParent([
    { value: 'a', children: [] },
    {
      value: 'b', children: [
        {
          value: 'b1', children: [
            { value: 'b11', children: [] },
          ],
        },
        { value: 'b2', children: [] },
      ],
    },
  ])

  initParent(data: ITreeItem<{ value: string }>[]) {
    return data
  }

  dragend(e: DragEvent) {
    this.service.resetDragInfo()
  }

  render(h: CreateElement) {
    const { dragend } = this

    return <div>
      <ul on={{
        dragend,
      }}>
        {this.data.map(it => <TreeItem item={it}></TreeItem>)}
      </ul>
      {JSON.stringify(this.service.dragInfo)}
    </div>
  }
}
