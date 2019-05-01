<template>
  <div class="songs">
    <div class="title">
        <h4>最新音乐</h4>
        <!-- <img class="arrows" src="../../assets/right.svg" alt> -->
    </div>
    <div class="newSongs-wrapper" v-show="list.length">
        <div
        class="item"
        v-for="(item,index) in list"
        :key="index"
        @click="goPlayer(index)"
        >
        <div class="songs-info">
            <div class="name">{{item.name}}</div>
            <div class="singer">{{item.singer}} - {{item.albumName}}</div>
        </div>
        <div class="icon-play">
            <img src="../../assets/player.svg" alt>
        </div>
        </div>
    </div>
    </div>
</template>  
<script>
import { getRecommendSongs } from "@/api/recommend.js";
import { fmFormate, newSongsFormate } from "@/common/js/musicFormate.js";

export default {
  name: "songs",
  props:{
    list:{
      type:Array,
      default:[]
    }
  },
  data() {
    return {
    };
  },
  methods: {
     goPlayer(index, loop) {
      this.$store.commit("setMusiclist", this.newSongs);
      this.$store.commit("setIndex", index);
      if (loop) {
        this.$store.commit("setPlayWay", loop);
      }

      this.$router.push({
        path: "/player"
      });
    },
  },
 
};
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
.icon {
  width: 30px;
  height: 30px;
  margin-bottom: 10px;
}
.arrows {
  width: 15px;
  height: 15px;
}
.title {
  display: flex;
  align-items: center;
  font-size: 18px;
  margin: 5px 15px;
  h4{
    font-weight: bold
  }
}
 .songs {
    margin-top: 20px;
    .newSongs-wrapper {
      padding: 0 15px;
      .item {
        color:#333;
        padding: 10px 0;
        border-bottom: solid #e6e8e9 1px;
        display: flex;
        align-items: center;
        .songs-info {
          flex:1;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          .name {
            width:100%;
            font-size: 18px;
            overflow: hidden;
            white-space: nowrap;
           
            text-overflow: ellipsis;
          }
          .singer {
            margin-top: 5px;
            font-size: 12px;
            color: #666;
          }
        }
        .icon-play {
          display: flex;
         margin-left:10px;
          justify-content: flex-end;
          img {
            width: 30px;
            height: 30px;
          }
        }
      }
    }
  }
</style>
 