// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import lazyload from 'vue-lazyload'
import store from './store/store.js'
import {setrem} from 'common/js/setRem.js'

import './common/font-awesome-4.7.0/css/font-awesome.min.css'
import './common/style/index.scss'
Vue.config.productionTip = false
setrem();
window.onresize=function(){
	console.log(1)
	setrem();
}

// 使用插件
// import FastClick from 'fastclick'

// FastClick.attach(document.body);

Vue.use(lazyload,{
    loading: 'http://p1.music.126.net/QWMV-Ru_6149AKe0mCBXKg==/1420569024374784.jpg',
    
    }
)
var myMixin = {
  
 
}
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  // mixins:[myMixin],
  template: '<App/>',
  components: { App }
});
Vue.mixin({
	methods: {
	    clearTimer() {
	        clearInterval(this.timer);
	        clearInterval(this.setCurrentTime);
	        clearInterval(this.lyricTimer);
	    },
   }
})
