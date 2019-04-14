<template>
  <div class="recommend">
    <div class="title" @click="goSongsList">
      <h4>推荐歌单</h4>
      <!-- <img class="arrows" src="../../assets/right.svg" alt> -->
    </div>
    <div class="recommend-content" v-show="list">
      <div
        class="item"
        v-for="(item,index) in list"
        :key="index"
        @click="goSonglistDetail(item.id,item.picUrl)"
      >
        <img v-lazy="item.picUrl">
        <div class="description">{{item.name}}</div>
      </div>
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
    goSonglistDetail(id, picUrl) {
      this.$router.push({
        path: "/songListDetail",
        query: {
          id: id,
          picUrl: picUrl
        }
      });
    }
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
      width: 31%;
      img{
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
 