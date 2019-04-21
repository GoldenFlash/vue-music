import Vue from 'vue'
import Router from 'vue-router'

import index from '@/view/index/index.vue'
import detail from '@/view/detail/index.vue'

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
  routes: [{
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
    // {
    //   path: '/recommend',
    //   name: 'recommend',
    //   component: recommend,
    // },
    // {
    //   path:'/songsList',
    //   name:'songsList',
    //   component:songsList
    // } ,
    // {
    //   path:'/rankingList',
    //   name:'rankingList',
    //   component:rankingList
    // },
    // {
    //   path:'/personalFM',
    //   name:'personalFM',
    //   component:playerFm
    // },
    // {
    //   path:'/player',
    //   name:'player',
    //   component:player,
    // },
   
    // {
    //   path:'/rankingListDetail',
    //   name:'rankingListDetail',
    //   component:rankingListDetail,
    // },
    // {
    //   path:'/search',
    //   name:'search',
    //   component:search,
    // },
    // {
    //   path:'/scroll',
    //   name:'scroll',
    //   component:scroll,
    // }
  ]
})
