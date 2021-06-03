import { Vue, Component } from 'vue-property-decorator'
import { CreateElement } from 'vue'
@Component
export default class Index extends Vue {

  render(h: CreateElement) {
    return <div>
      Index
    </div>
  }
}
