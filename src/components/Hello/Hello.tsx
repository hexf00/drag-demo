import { Vue, Component, Prop } from 'vue-property-decorator'
import { CreateElement } from 'vue'

@Component
export default class Hello extends Vue {
  // 配置JSX中属性类型检查
  $props!: {
    text: string
  }

  @Prop(String) text!: string

  render(h: CreateElement) {
    return <div> Hello {this.text} </div>
  }
}
