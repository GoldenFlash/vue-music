import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import index from '@/view/index/index.vue'
import musicClassify from '@/components/content/musicClassify/musicClassify.vue'
import recommend from '@/components/recommend/recommend.vue'
import songsList from '@/components/songsList/songsList.vue'
import rankingList from '@/components/rankingList/rankingList.vue'
// import personalFM from '@/components/personalFM/personalFM.vue'
import playerFm from '@/components/player/player-fm.vue'
import player from '@/components/player/player-music.vue'
import songListDetail from '@/components/songsList/songListDetail.vue'
import rankingListDetail from '@/components/rankingList/rankingListDetail.vue'
import search from '@/components/search/search.vue'
import scroll from '@/components/scroll/scroll.vue'
Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      component: index
    },
    {
      path: '/recommend',
      name: 'recommend',
      component: recommend,
    },
    {
      path:'/songsList',
      name:'songsList',
      component:songsList
    } ,
    {
      path:'/rankingList',
      name:'rankingList',
      component:rankingList
    },
    {
      path:'/personalFM',
      name:'personalFM',
      component:playerFm
    },
    {
      path:'/player',
      name:'player',
      component:player,
    },
    {
      path:'/songListDetail',
      name:'songListDetail',
      component:songListDetail,
    },
    {
      path:'/rankingListDetail',
      name:'rankingListDetail',
      component:rankingListDetail,
    },
    {
      path:'/search',
      name:'search',
      component:search,
    },
    {
      path:'/scroll',
      name:'scroll',
      component:scroll,
    }
  ]
})
