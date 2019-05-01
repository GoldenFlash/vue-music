// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/* eslint-disable */

import Vue from 'vue'
import App from './App'
import router from './router'
import lazyload from 'vue-lazyload'
import vuex from 'vuex'

// import store from './store/store.js'

import './style/reset.css'
import './common/font-awesome-4.7.0/css/font-awesome.min.css'
import './common/style/index.scss'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

Vue.use(vuex);


Vue.config.productionTip = false

// 使用插件
// import FastClick from 'fastclick'

// FastClick.attach(document.body);


Vue.use(lazyload,{
    loading: 'http://p1.music.126.net/QWMV-Ru_6149AKe0mCBXKg==/1420569024374784.jpg',
    
    }
)
/* eslint-disable no-new */
var store = new vuex.Store({//store对象
  state: {
    states: 'turn-on'
  },
  mutations: {
    setTransition(state, states) {
      state.states = states
    }
  }
})

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
// new Vue({
//   el: '#app',
//   store,
//   router,
//   // template: '<App/>',
//   components: { App }
// })
