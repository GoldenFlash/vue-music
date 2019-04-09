<template>
	<div class="wrapper">
		<header style="height:50px">
			<v-header ></v-header>
		</header>
        
		<div style="flex:1">
		<scroll :data="newSongs" ref="scroll">
			<div>
				<!-- <div class="slider-wrapper">
					<slider v-if="banners.length">
						<div v-for="(item,index) in banners" :key="index">
							<img :src="item.pic" @load="loadImage">
						</div>
					</slider>
				</div> -->
				<div class="musicClassify">
					<div class="item" @click="goFM">
						<img class="icon" src="../../assets/FM.svg" alt="">
						<span>私人FM</span>
					</div>
					
					<div class="item" @click="goSongsList">
						<img class="icon" src="../../assets/rcsongs.svg" alt="">
						<span>歌单</span>
					</div>
					<div class="item" @click="goRankingList">
						<img class="icon" src="../../assets/rank.svg" alt="">
						<span>排行榜</span>
					</div>
				</div>
				<div class="recommend">
					<div class="title" @click="goSongsList">
						<span>推荐歌单</span>
						<img class="arrows" src="../../assets/right.svg" alt="">
					</div>
					<div class="recommend-content" v-show="recommendSongList.length">
						<div class="item" v-for="(item,index) in recommendSongList" :key="index" @click="goSonglistDetail(item.id,item.picUrl)">
							<img v-lazy="item.picUrl" @load="loadImage">
							<div class="description">{{item.name}}</div>
						</div>
					</div>
				</div>
				<div class="newSongs">
					<div class="title">
						<span>最新音乐</span>
						<img class="arrows" src="../../assets/right.svg" alt="">
					</div>
					<div class="newSongs-wrapper" v-show="newSongs.length">
						<div class="item" v-for="(item,index) in newSongs" :key="index" @click="goPlayer(index)">
							<div class="songs-info">
								<div class="name">{{item.name}}</div>
								<div class="singer">
									{{item.singer}} - {{item.albumName}}
								</div>
							</div>
							<div class="icon-play">
								<img src="../../assets/player.svg" alt="">
							</div>
						</div>
					</div>
				</div>
			</div>
			<!-- <loading v-show="!loading"></loading> -->
		</scroll>
		</div>
	</div>
</template>
<script type="text/javascript">
	import vHeader from '@/components/part/header.vue'

	import scroll from '@/base/scroll/scroll2.vue'
	import slider from '@/base/slider/slider.vue';
	import loading from '@/base/loading/loading.vue'
	import { ERR_OK } from '@/api/code_config.js';
	import { getRecommendSongList, getexclusivebroadcastSongList,} from '@/api/recommend.js';
	import {  getBanner } from '@/api/banner.js'
	import { getNewSongs } from '@/api/newsongs'
	import { getRecommendSongs } from '@/api/recommend.js'
	import { getFm } from '@/api/getFm.js'
	import { fmFormate, newSongsFormate } from '@/common/js/musicFormate.js'

	export default {
	    data() {
	        return {
	            recommendSongList: [],
	            exclusivebroadcastSongList: [],
	            banners: [],
	            newSongs: [],
	            
	        }
	    },
	    components: {
	        slider,
	        scroll,
            loading,
            vHeader
	    },

	    mounted() {
	    	
	        this._getRecommendSongList();
	        this._getexclusivebroadcastSongList();
	        this._getBanner();
	        this._getNewSongs();

	    },
	    computed: {
	    	
	        loading() {
	            if (this.recommendSongList.length && this.exclusivebroadcastSongList.length && this.banners.length && this.newSongs.length) {
	                return true
	            } else {
	                return false
	            }
	        }
	    },
	    methods: {
	    	loadImage() { 
		          this.$refs.scroll.refresh()
		    },
	        goSonglistDetail(id, picUrl) {
	            this.$router.push({
	                path: '/songListDetail',
	                query: {
	                    id: id,
	                    picUrl: picUrl,
	                },
	            })
	        },
	        goPlayer(index, loop) {
	            this.$store.commit('setMusiclist', this.newSongs)
	            this.$store.commit('setIndex', index);
	            if (loop) {
	                this.$store.commit('setPlayWay', loop);
	            }

	            this.$router.push({
	                path: '/player',

	            })

	        },
	        goFM() {
	            this._getFm().then(() => {
	                this.$router.push({
	                    path: '/personalFM',
	                    query: {
	                        type: 'fm'
	                    }
	                })

	            });

	        },
	        _getFm() {
	            return new Promise((resolve, reject) => {
	                getFm().then((res) => {
	                    if (res.data.code === 200) {
	                        var data = res.data.data;
	                        data = fmFormate(data);

	                        this.$store.commit('setMusiclist', data);
	                        resolve();
	                    }
	                })
	            })
	        },

	        goRankingList() {
	            this.$router.push({
	                path: '/rankingList'
	            })
	        },
	        goSongsList() {
	            this.$router.push({
	                path: '/songsList'
	            })
	        },
	        goRecommend() {
	            this.$router.push({
	                path: '/recommend'
	            })
	        },
	        Imageloaded() {
	            this.$refs.scroll.refresh();
	            this.refresh = [1, 1, 2, 2]
	        },
	        _getRecommendSongList() {
	            var _this = this;
	            getRecommendSongList().then(function(res) {
	                if (res.data.code === 200) {
	                    _this.recommendSongList = res.data.result;
	                } else {
	                    console.log("获取数据失败")
	                };
	            });

	        },
	        _getexclusivebroadcastSongList() {
	            var _this = this;
	            getexclusivebroadcastSongList().then(function(res) {
	                if (res.data.code === 200) {
	                    _this.exclusivebroadcastSongList = res.data.result;
	                } else {
	                    console.log("获取数据失败")
	                };
	            });
	        },
	        _getBanner() {
	            getBanner().then((res) => {

	                this.banners = res.data.banners;

	            })
	        },
	        _getNewSongs() {
	            getNewSongs().then((res) => {
	                if (res.data.code === 200) {
	                    this.newSongs = newSongsFormate(res.data.result);
	                }
	            })
	        },


	    }
	}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
	@import '@/common/style/variable.scss';
	.wrapper {
		height:100vh;
		display: flex;
		flex-direction: column;
		// overflow:scroll;
	    .loading {
	        position: absolute;
	    }
	    .slider-wrapper {
	        width: 100%;
	        text-align: center
	    }
	    .musicClassify {
	        display: flex;
	        border-bottom: solid 1px #e6e8e9;
	        text-align: center;
	        margin:20px 0;
	        padding: 0.3rem;
	        .item {

	            flex: 1;
	            height: 2rem;
	            &>i, &>span {
	                display: block
	            }
	            &>i {
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
	    .recommend {
	        
	        .recommend-content {
	            margin-top: 0.2rem;
	            margin-left: 0.1rem;
				display: flex;
				flex-wrap: wrap;
				justify-content: space-around;
	            .item {
	                box-sizing: border-box;
					border-radius: 6px;
	                width: 30%;
	                // padding: 1px;
	                .description {
						margin: 5px 0;
	                  	font-size: 12px;
						  line-height:1.5em;
	                	// color: #666;
	                }
	            }
	        }
	    }
	    .newSongs {
	        .newSongs-wrapper {
				padding:0 10px;
	            .item {
	                padding: 0.4rem 0;
	                border-bottom: solid #e6e8e9 1px;
					display: flex;
					align-items: center;
	                .songs-info {
	                    display: inline-block;
	                    width: 70%;
	                    white-space: nowrap;
	                    overflow: hidden;
	                    text-overflow: ellipsis;
	                    .name {
	                        font-size:18px;
	                    }
	                    .singer {
							margin-top:10px;
	                        font-size: 13px;
	                        color: #666;
	                    }
	                }
					.icon-play {
						display: flex;
						flex:1;
						justify-content: flex-end;
						img{
							width:30px;
							height: 30px;
						}
					}
	            }
	           
	        }
	    }
    }
    .icon{
        width:30px;
        height:30px;
        margin-bottom: 10px
    }
	.arrows{
		width:15px;
		height:15px;
	}
	.title {
		display:flex;
		align-items:center;
		font-size: 18px;
		margin: 5px 10px;
	}
</style>
