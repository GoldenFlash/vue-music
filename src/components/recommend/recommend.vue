<template>
	<div class="recommend">
		<directer><span>每日推荐</span></directer>
		<div class="button">
			<div class="icon">
				<i class="fa fa-play-circle-o" ></i>
			</div>
			<div class="name">播放全部</div>
		</div>
		<div class="song-wrapper">
			<div class="item" v-for ="item in recommendSongs">
				<div class="img">
					<img :src="item.album.picUrl" alt="" >
				</div>
				<div class="detail">
					<div class="name">{{item.name}}</div>
					<div class="singer">{{item.artists[0].name}} - {{item.album.name}}</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
	import {getRecommendSongs} from 'api/recommend.js'
	import axios from 'axios';
	import directer from '@/components/part/directer.vue'
	export default{
		data(){
			return{
				recommendSongs:[],
			}
		},
		components:{
			directer
		},
		mounted(){
			
			this._getRecommendSongs()
		},
		methods:{
			
			_getRecommendSongs(){
				getRecommendSongs().then((res)=>{
					this.recommendSongs=res.data.recommend
				})
			},
		}
	}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>

	.recommend{
		
		
		padding:0;
		
		
		.button{
			padding:0.5rem;
			.icon,.name{
				font-size:0.7rem;
				display:inline-block;
			}
			.name{
				margin-left:0.5rem;
			}

		}
		.song-wrapper{

			.item{
				padding:0.5rem;
				margin:0.2rem;
				border-bottom:solid #e6e8e9 1px;
				.img{
					display:inline-block;
					img{
						width:1.5rem;
						height:1.5rem;
					}
				}
				.detail{
					display:inline-block;
					vertical-align:top;
					margin-left:0.2rem;
					width:70%;
					padding:0.1rem;
					.name{
						font-size:0.6rem;
						white-space:nowrap;
						overflow:hidden;
					}
					.singer{
						margin-top:0.2rem
					}
				}
			}
		}
	}
</style>