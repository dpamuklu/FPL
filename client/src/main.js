import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource'

Vue.config.productionTip = false

Vue.use(VueResource);

export const bus = new Vue();

new Vue({
  render: h => h(App),
}).$mount('#app')
