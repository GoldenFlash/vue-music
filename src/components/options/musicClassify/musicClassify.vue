<template>
	<div>
		<div class="carousel">轮播图</div>
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
				<div class="item">
					<img src="http://p4.music.126.net/6VeadnVO3CbPlD3f3aptGA==/109951163109970962.jpg?param=200y200" alt="">
					<div class="description">华语速爆新歌</div>
				</div>
				<div class="item">
					<img src="http://p4.music.126.net/6VeadnVO3CbPlD3f3aptGA==/109951163109970962.jpg?param=200y200" alt="">
					<div class="description">华语速爆新歌</div>
				</div>
				<div class="item">
					<img src="http://p4.music.126.net/6VeadnVO3CbPlD3f3aptGA==/109951163109970962.jpg?param=200y200" alt="">
					<div class="description">华语速爆新歌</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
	import axios from 'axios';
 	import {getRecommendSongList} from 'api/recommend.js';
	export default {
	    data() {
	        return {

	        }
	    },
	    mounted(){
	    	// getRecommendSongList()
	    	axios.get('/personalized?limit=9')
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
	    text-align: center;
	    margin: 0.3rem;
	    .item {

	        flex: 1;
	        height: 2.8rem;
	        &>i, &>span {
	            display: block
	        }
	        &>i {
	            color: rgb(211, 58, 49);
	            font-size: 30px; // font-weight: 10;
	            margin-bottom: 0.2rem;
	        }
	        .songlist {
	            font-size: 0;
	            .fa-align-left {
	                font-size: 30px;
	                transform: rotateY(180deg) rotateZ(180deg);
	            }
	            span {
	                font-size: 30px;
	            }
	        }
	    }
	}
	.recommend {
	    .title {
	        margin-left: 0.2rem;
	        &>span {
	            font-size: $font-size-large
	        }
	        .fa-angle-right {
	            font-size: $font-size-large-l
	        }
	    }
	    .recommend-content {
	        margin-top: 0.2rem;
	        .item {
	            display: inline-block;
	            width: 32%;
	            height: 4.70rem; // background-color: yellow;
	            .description {
	                width: 3.6rem;
	                font-size: $font-size-medium;
	                margin-top: 0.1rem;
	                margin-left: 0.1rem
	            }
	        }
	    }
	}
</style>
