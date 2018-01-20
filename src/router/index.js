import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import index from '@/components/content/index.vue'
import musicClassify from '@/components/content/musicClassify/musicClassify.vue'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/HelloWorld',
      component: HelloWorld
    },
    {
      path: '/',
      redirect: {
        path: '/index/musicClassify'
      },
    },
    {
      path: '/index',
      redirect: {
        path: '/index/musicClassify'
      },
      name: 'index',
      component: index,
      children: [{
        path: 'musicClassify',
        component: musicClassify
      }]
    }
  ]
})
