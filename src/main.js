import Vue from 'vue'
import App from './App'


/***创建根实例***/
new Vue({
  el: '#app',
  render: h => h(App),
  data: {
    Bus: new Vue() // 空的实例放到根组件下，所有的子组件都能调用
  }
}).$mount('#app')
