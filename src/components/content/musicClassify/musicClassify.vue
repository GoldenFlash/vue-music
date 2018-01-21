<template>
	<div>
		<scroll :data="refresh" ref="scroll">
			<div>
				<div class="slider-wrapper">
				<slider v-if="banners.length">
					<div v-for="item in banners">
						<img :src="item.pic" >
					</div>
				</slider>
			</div>
			<div class="musicClassify">
				<div class="item" >
					<i class="fa fa-cc"></i>
					<span>私人FM</span>
				</div>
				<div class="item" @click="goRecommend">
					<i class="fa fa-calendar"></i>
					<span>每日推荐</span>
				</div>
				<div class="item">
					<i class="songlist">
						<i class="fa fa-align-left"></i>
						<span>♪</span>
					</i>
					<span>歌单</span>
				</div>
				<div class="item">
					<i class="fa fa-bar-chart"></i>
					<span>排行榜</span>
				</div>
			</div>
			<div class="recommend">
				<div class="title">
					<span>推荐歌单</span>
					<i class="fa fa-angle-right"></i>
				</div>
				<div class="recommend-content">
					<div class="item" v-for="item in recommendSongList">
						<img :src="item.picUrl" alt="" >
						<div class="description">{{item.name}}</div>
					</div>
				</div>
			</div>
			<div class="newSongs">
				<div class="title">
					<span>最新音乐</span>
					<i class="fa fa-angle-right"></i>
				</div>
				<div class="newSongs-wrapper">
					<div class="item" v-for="item in newSongs ">
						<div class="songs-info">
							<div class="name">{{item.song.name}}</div>
							<div class="singer">
								{{item.song.artists[0].name}} - {{item.song.album.name}}
							</div>
						</div>
						<div class="icon-play">
							<i class="fa fa-play-circle-o"></i>
						</div>
					</div>
				</div>
			</div>
			</div>
		</scroll>
	</div>
</template>
<script type="text/javascript">
	import scroll from 'base/scroll/scroll2.vue'
	import slider from 'base/slider/slider.vue';
	import {ERR_OK} from 'api/code_config.js';
	import {getRecommendSongList,getexclusivebroadcastSongList,} from 'api/recommend.js';
	import {getBanner} from 'api/banner.js'
	import {getNewSongs} from 'api/newsongs'
	import {getRecommendSongs} from 'api/recommend.js'

	export default {
	    data() {
	        return {
	            recommendSongList: [],
	            exclusivebroadcastSongList: [],
	            banners: [],
	            newSongs:[],
	            refresh:[],
	        }
	    },
	    components: {
	        slider,
	        scroll
	    },
	    mounted() {
	        this._getRecommendSongList();
	        this._getexclusivebroadcastSongList();
	        this._getBanner();
	        this._getNewSongs();
	        this.refresh()
	    },
	    methods: {
	    	refresh(){
	    		setTimeout(()=>{
	            	this.$refs.scroll.refresh();
	            },5000)
	    	},
	    	goRecommend(){
	    		this.$router.push({
	    			path:'/recommend'
	    		})
	    	},
	    	Imageloaded(){
	    		this.$refs.scroll.refresh();
	    		this.refresh=[1,1,2,2]
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
	                console.log(res.data.banners)
	                this.banners = res.data.banners;

	            })
	        },
	        _getNewSongs(){
	        	getNewSongs().then((res)=>{
	        		console.log(res)
	        		if(res.data.code ===200){
	        			console.log(res.data)
	        			this.newSongs = res.data.result
	        		}
	        	})
	        },
	        _getRecommendSongs(){
				getRecommendSongs().then((res)=>{
					console.log(res.data)
				})
			},

	    }
	}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
	@import '../../../common/style/variable.scss';
	.slider-wrapper {
	    width: 100%;
	    text-align: center
	}
	.musicClassify {
	    display: flex;
	    border-bottom: solid 1px #e6e8e9;
	    text-align: center;
	    margin: 0.3rem 0.3rem 0.5rem 0.3rem;
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
	    .title {
	        margin-left: 0.2rem;
	        &>span {
	            font-size: 0.6rem
	        }
	        .fa-angle-right {
	            font-size: 0.8rem
	        }
	    }
	    .recommend-content{
	        margin-top: 0.2rem;
	        margin-left: 0.1rem;
	        .item {
	            box-sizing: border-box;
	            display: inline-block;
	            width: 33%;
	            height: 5.1rem; // background-color: yellow;
	            padding: 1px;
	            .description {
	                width: 3.6rem;
	                font-size: $font-size-small;
	                margin-top: 0.1rem;
	                margin-left: 0.1rem;
	                white-space: nowrap;
	                overflow: hidden;
	                text-overflow: ellipsis
	            }
	        }
	    }
	}
	.newSongs{
		.title {
	        margin-left: 0.2rem;
	        &>span {
	            font-size: 0.6rem
	        }
	        .fa-angle-right {
	            font-size: 0.8rem
	        }
	    }
	    .newSongs-wrapper{
	    	margin-top:0.2rem;
	    	margin-left:0.2rem;
	    	.item{
				padding:0.4rem 0;
				border-bottom:solid #e6e8e9 1px;
				.songs-info{
					display:inline-block;
					width:70%;
					white-space:nowrap;
					overflow:hidden;
					text-overflow:ellipsis;
					.name{
						font-size:0.6rem;
					}
					.singer{
						margin-top:0.3rem;
						font-size:0.5rem	
					}

				}
	    	}
	    	.icon-play{
				// width:10px;
				display:inline-block;
				font-size:0.8rem;
				margin-left:1.6rem;
				vertical-align:top;
				margin-top:0.3rem;
				color:#AAAAAA;
			}
	    }
	}
</style>
