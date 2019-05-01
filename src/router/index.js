import Vue from 'vue'
import Router from 'vue-router'

import index from '@/view/index/index.vue'
import detail from '@/view/detail/index.vue'

import A from '@/components/components/A'
import B from '@/components/components/B'
import C from '@/components/components/C'
import D from '@/components/components/D'

// import recommend from '@/components/recommend/recommend.vue'
// import songsList from '@/components/songsList/songsList.vue'
// import rankingList from '@/components/rankingList/rankingList.vue'
// import personalFM from '@/components/personalFM/personalFM.vue'
// import playerFm from '@/components/player/player-fm.vue'
import player from '@/components/player/player-music.vue'
// import songListDetail from '@/components/songsList/songListDetail.vue'
// import rankingListDetail from '@/components/rankingList/rankingListDetail.vue'
// import search from '@/components/search/search.vue'
// import scroll from '@/components/scroll/scroll.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: index,
      meta:{index:0}
    },
    {
      path:'/detail/:id',
      name:'detail',
      component:detail,
      meta:{index:1}
    },
     {
      path:'/player',
      name:'player',
      component:player,
       meta: {index: 10}
    },
    {
      path: '/A',
      component: A
    },
    {
      path: '/B',
      component: B
    },
    {
      path: '/C',
      component: C
    },
    {
      path: '/D',
      component: D
    }
  
  ]
})
