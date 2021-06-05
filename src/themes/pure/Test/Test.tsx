import { Vue, Component } from 'vue-property-decorator'
import { CreateElement } from 'vue'
import Entry from './examples/Entry'
@Component
export default class Test extends Vue {

  render(h: CreateElement) {
    const entry = new Entry()
    return <div>
      DI Test
    </div>
  }
}
