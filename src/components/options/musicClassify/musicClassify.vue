<template>
	<div>
		<slider v-show="banners.length">
			<div v-for="item in banners"><img :src="item.pic"></div>
		</slider>
		<div class="musicClassify">
			<div class="item">
				<i class="fa fa-cc"></i>
				<span>私人FM</span>
			</div>
			<div class="item">
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
					<img :src="item.picUrl" alt="">
					<div class="description">{{item.name}}</div>
				</div>
			</div>
		</div>
		<div class="exclusive-broadcast">
			<div class="title">
				<span>独家放送</span>
				<i class="fa fa-angle-right"></i>
			</div>
			<div class="exclusive-broadcast-content">
				<div class="item" v-for="item in exclusivebroadcastSongList">
					<img :src="item.picUrl" alt="">
					<div class="description">{{item.name}}</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
	import {
	    ERR_OK
	} from 'api/code_config.js';
	import {
	    getRecommendSongList,
	    getexclusivebroadcastSongList,
	} from 'api/recommend.js';
	import {getBanner} from 'api/banner.js'
	import slider from 'base/slider/slider.vue'
	export default {
	    data() {
	        return {
	            recommendSongList: [],
	            exclusivebroadcastSongList: [],
	            banners:[],
	        }
	    },
	    components: {
	        slider
	    },
	    created() {
	        this._getRecommendSongList();
	        this._getexclusivebroadcastSongList();
	        this._getBanner();
	    },
	    methods: {
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
	        _getBanner(){
	        	getBanner().then((res)=>{
	        		 console.log(res.data.banners)
	                this.banners = res.data.banners;
	                
	        	})
	        }

	    }
	}
</script>
<style lang="scss" rel="stylesheet/scss">
	@import '../../../common/style/variable.scss';
	.carousel {
	    width: 100%;
	    height: 4.25rem;
	    background-color: yellow;
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
	.recommend, .exclusive-broadcast {
	    .title {
	        margin-left: 0.2rem;
	        &>span {
	            font-size: 0.6rem
	        }
	        .fa-angle-right {
	            font-size: 0.8rem
	        }
	    }
	    .recommend-content, .exclusive-broadcast-content {
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
</style>
