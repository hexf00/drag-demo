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
    // eslint-disable-next-line
    // @ts-ignore
    console.log('ondragend', this.$root.item, this.$root.target, this.$root.$data.pos, this.$root.$data.status, e)

    this.$set(this.$root.$data, 'item', null)
    this.$set(this.$root.$data, 'target', null)
    this.$set(this.$root.$data, 'pos', null)
    this.$set(this.$root.$data, 'status', false)

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
    </div>
  }
}
