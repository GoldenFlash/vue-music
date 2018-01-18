import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import onlineMusic from '@/components/options/onlineMusic.vue'
import musicClassify from '@/components/options/musicClassify/musicClassify.vue'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/onlineMusic',
      redirect: {
        path: '/onlineMusic/musicClassify'
      },
      name: 'onlineMusic',
      component: onlineMusic,
      children: [{
        path: 'musicClassify',
        component: musicClassify
      }]
    }
  ]
})
