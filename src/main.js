import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Antd from 'ant-design-vue';
import http from './tools/http'
import filter from './tools/filters'
import utils from './tools/utils'

import 'normalize.css'
import 'ant-design-vue/dist/antd.css'; // or 'ant-design-vue/dist/antd.less'
Vue.config.productionTip = false

Vue.mixin(filter)
Vue.use(Antd);
Vue.prototype.Util = utils
Vue.prototype.Http = http

const app = new Vue({
  router,
  components: { App },
  template: '<App/>',
  render: h => h(App)
}).$mount('#app')

export default app
