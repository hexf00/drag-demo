import { Vue, Component } from 'vue-property-decorator'
import { CreateElement } from 'vue'
import TreeItem from '@/components/TreeItem/TreeItem'
@Component
export default class Index extends Vue {

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
    console.log('ondragend', e)
  }

  dragenter(e: DragEvent) {
    console.log('ondragenter', e)
  }

  dragover(e: DragEvent) {
    console.log('ondragover', e)
  }

  drop(e: DragEvent) {
    console.log('ondrop', e)
  }

  dragleave(e: DragEvent) {
    console.log('ondragleave', e)
  }

  render(h: CreateElement) {
    const { dragstart, dragend, dragenter, dragover, drop, dragleave } = this

    return <div>
      <ul on={{
        dragend,
        dragenter, dragover, drop, dragleave,
      }}>
        {this.data.map(it => <TreeItem item={it}></TreeItem>)}
      </ul>
    </div>
  }
}
