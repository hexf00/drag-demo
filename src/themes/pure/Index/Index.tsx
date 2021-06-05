import { Vue, Component } from 'vue-property-decorator'
import { CreateElement } from 'vue'
import TreeItem from '@/components/TreeItem/TreeItem'
import container from '@/store/Container'
@Component
export default class Index extends Vue {

  service = container.index

  dragend(e: DragEvent) {
    this.service.drag()
    this.service.resetDragInfo()
  }

  render(h: CreateElement) {
    const { dragend } = this

    return <div>
      <ul on={{
        dragend,
      }}>
        {this.service.data.map(it => <TreeItem item={it} key={it.value}></TreeItem>)}
      </ul>
      {JSON.stringify(this.service.dragInfo)}
    </div>
  }
}
