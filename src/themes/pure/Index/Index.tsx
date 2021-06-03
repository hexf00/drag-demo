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
  render(h: CreateElement) {
    return <div>
      <ul>
        {this.data.map(it => <TreeItem item={it}></TreeItem>)}
      </ul>
    </div>
  }
}
