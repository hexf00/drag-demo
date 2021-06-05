import { Vue, Component } from 'vue-property-decorator'
import { CreateElement } from 'vue'
import TreeItem from '@/components/TreeItem/TreeItem'
import container from '@/store/Container'
@Component
export default class Index extends Vue {

  service = container.index

  data: ITree<{ value: string }> = [
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
  ]

  dragstart(e: DragEvent) {

    console.log('ondragstart', e)
  }

  dragend(e: DragEvent) {
    this.service.resetDragInfo()
  }

  dragenter(e: DragEvent) {
    console.log('ondragenter', e)
  }

  dragover(e: DragEvent) {
    console.log('ondragover', e)
    e.preventDefault()
  }

  dragleave(e: DragEvent) {
    console.log('ondragleave', e)
  }

  render(h: CreateElement) {
    const { dragstart, dragend, dragenter, dragover, dragleave } = this

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
