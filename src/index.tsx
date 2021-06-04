import Vue from 'vue'

import router from '@/router'
import Nav from './components/Nav/Nav'

new Vue({
  router,
  data() {
    return {
      item: null,
      target: null,
      pos: null,
    }
  },
  computed: {
    links() {
      return this.$router.options.routes || []
    },
  },
  render(h) {
    return <div>
      <Nav links={this.links}></Nav>
      <router-view></router-view>
    </div>
  },
}).$mount('#app')
