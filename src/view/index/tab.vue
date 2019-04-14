<template>
  <div>
    <div class="musicClassify">
      <div class="item" @click="goFM">
        <img class="icon" src="../../assets/FM.svg" alt>
        <span>私人FM</span>
      </div>
      <div class="item" @click="goSongsList">
        <img class="icon" src="../../assets/rcsongs.svg" alt>
        <span>歌单</span>
      </div>
      <div class="item" @click="goRankingList">
        <img class="icon" src="../../assets/rank.svg" alt>
        <span>排行榜</span>
      </div>
    </div>
  </div>
</template>  
<script>
export default {
  name: "tab",
  data() {
    return {};
  }
};
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
.musicClassify {
  display: flex;
  border-bottom: solid 1px #e6e8e9;
  text-align: center;
  margin: 20px 0;
  padding: 0.3rem;
  .item {
    flex: 1;
    height: 2rem;
    & > i,
    & > span {
      display: block;
    }
    & > i {
      color: rgb(211, 58, 49);
      font-size: 1rem; // font-weight: 10;
      margin-bottom: 0.2rem;
    }
    .songlist {
      font-size: 0;
      .fa-align-left {
        font-size: 1rem;
        transform: rotateY(180deg) rotateZ(180deg);
      }
      span {
        font-size: 1rem;
      }
    }
  }
}
</style>
 