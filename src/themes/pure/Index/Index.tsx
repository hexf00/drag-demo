import { Vue, Component } from 'vue-property-decorator'
import { CreateElement } from 'vue'
import Hello from '@/components/Hello/Hello'

@Component
export default class Index extends Vue {

  render(h: CreateElement) {
    return <div>
      <Hello text={'world!'} />
      <router-link to={{ path: 'test' }}>Test Page</router-link>
    </div>
  }
}
