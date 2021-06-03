import { Vue, Component, Prop } from 'vue-property-decorator'
import { CreateElement } from 'vue'
import style from './style.module.scss'
export interface ILink {
  path: string
}

@Component
export default class Nav extends Vue {
  // 配置JSX中属性类型检查
  $props!: {
    links: ILink[]
  }

  @Prop(Array) links!: ILink[]

  render(h: CreateElement) {
    return <ul>
      {this.links.map(it => <router-link class={style.link} to={{ path: it.path }} key={it.path}>{it.path}</router-link>)}
    </ul>
  }
}
