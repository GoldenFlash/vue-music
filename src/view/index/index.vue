<template>
  <div class="wrapper">
    <v-header></v-header>
    <div class="home">
      <div>
        <div v-if="banners.length" class="slider-wrapper" ref="sliderWrapper">
          <slider>
            <div v-for="(item,index) in banners" :key="index">
              <img :src="item.imageUrl">
            </div>
          </slider>
        </div>
        <songList v-if="recommendSongList.length" :list="recommendSongList"></songList>
        <songs v-if="songs.length" :list="songs"></songs>
      </div>
      <loading v-show="!loading"></loading>
    </div>
  </div>
</template>
<script type="text/javascript">
import vHeader from "@/components/part/header.vue";
import songList from "./songsList.vue";
import songs from "./songs.vue";

import slider from "@/base/slider/slider.vue";
import loading from "@/base/loading/loading.vue";

import { ERR_OK } from "@/api/code_config.js";

import { getRecommendSongList } from "@/api/recommend.js";
import { getBanner } from "@/api/banner.js";
import { getNewSongs as getSongs } from "@/api/newsongs";
import { getRecommendSongs } from "@/api/recommend.js";
import { getFm } from "@/api/getFm.js";

import { fmFormate, newSongsFormate } from "@/common/js/musicFormate.js";

export default {
  data() {
    return {
      recommendSongList: [],
      banners: [],
      songs: []
    };
  },
  components: {
    slider,
    scroll,
    loading,
    vHeader,
    songList,
    songs
  },

  mounted() {
    this._getRecommendSongList();
    this._getBanner();
    this._getSongs();
  },
  computed: {
    loading() {
      if (
        this.recommendSongList.length &&
        this.banners.length &&
        this.songs.length
      ) {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    _getRecommendSongList() {
      var _this = this;
      getRecommendSongList().then(function(res) {
        if (res.data.code === 200) {
          _this.recommendSongList = res.data.result;
        } else {
          console.log("获取数据失败");
        }
      });
    },
    _getSongs() {
      getSongs().then(res => {
        if (res.data.code === 200) {
          this.songs = newSongsFormate(res.data.result);
        }
      });
    },
    _getBanner() {
      getBanner().then(res => {
        console.log("banners", res);
        this.banners = res.data.banners;
      });
    }

    // goFM() {
    //   this._getFm().then(() => {
    //     this.$router.push({
    //       path: "/personalFM",
    //       query: {
    //         type: "fm"
    //       }
    //     });
    //   });
    // },
    // _getFm() {
    //   return new Promise((resolve, reject) => {
    //     getFm().then(res => {
    //       if (res.data.code === 200) {
    //         var data = res.data.data;
    //         data = fmFormate(data);

    //         this.$store.commit("setMusiclist", data);
    //         resolve();
    //       }
    //     });
    //   });
    // },
  }
};
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
@import "@/common/style/variable.scss";
.wrapper {
  height: 100%;
  width: 100%;
}
.home {
  width: 100%;
  margin-top: 60px;
  .scroll {
    height: 100%;
    width: 100%;
  }
  .loading {
    position: absolute;
  }
  .slider-wrapper {
    width: 100%;
    overflow: hidden;
  }
}
</style>
