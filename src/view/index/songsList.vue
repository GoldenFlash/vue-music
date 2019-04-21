<template>
  <div class="recommend">
    <div class="title" @click="goSongsList">
      <h4>推荐歌单</h4>
    </div>
    <div class="recommend-content" v-show="list">
      <router-link  class="item" v-for="(item,index) in list"  :key="index" :to="'/detail/'+item.id">
        <div
        >
          <img v-lazy="item.picUrl" alt="">
          <div class="description">{{item.name}}</div>
        </div>
      </router-link> 
    </div>
  </div>
</template>  
<script>
export default {
  name: "songList",
  props: {
    list: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
    };
  },

  methods: {
    goSongsList() {
      this.$router.push({
        path: "/songsList"
      });
    },
   
  }
};
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
.recommend {
    margin-top: 20px;
  .arrows {
    width: 15px;
    height: 15px;
  }
  .title {
    display: flex;
    align-items: center;
    font-size: 18px;
    margin: 10px 15px;
    h4{
        font-weight: bold
    }
  }
  .recommend-content {
    padding:0 15px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .item {
      box-sizing: border-box;
      width:2.2rem;
      // height:2.2rem;
      margin:5px 0;
      border-radius: 6px;
      overflow: hidden;
      img{
        width:2.2rem;
        height:2.2rem;
        overflow: hidden;
        border-radius: 6px;
      }
      .description {
        margin: 5px 0;
        font-size: 12px;
        line-height: 1.5em;
      }
    }
  }
}
</style>
 