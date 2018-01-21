<template>
	<div class="recommend">
		<div class="title">
			<div class="icon" @click="gohistory(-1)">
				<i class="fa fa-arrow-left"></i>
			</div>
			<div class="name">每日推荐</div>
		</div>
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
	export default{
		data(){
			return{
				recommendSongs:[],
			}
		},
		mounted(){
			
			this._getRecommendSongs()
		},
		methods:{
			gohistory(value){
				this.$router.go(value)
			},
			_getRecommendSongs(){
				getRecommendSongs().then((res)=>{
					this.recommendSongs=res.data.recommend
				})
				
			},
			loginRefresh(){
				axios.get('/login/refresh')
			},
			login(){
				axios.get('http://localhost:3000/login/cellphone?phone=18655483280&password=wangwei531221571')
			}
		}
	}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
	.recommend{
		
		
		padding:0;
		width:100%;
		.title{
			box-sizing:border-box;
			width:100%;
			padding:0.5rem;
			
			background-color: rgb(211, 58, 49);
			.icon, .name{
				font-size:0.8rem;
				color:#FFFFFF;
				display:inline-block;
			}
			.icon{
				padding-right:0.4rem;
				font-size:1rem;
				font-weight:1
			}
		}
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
					width:80%;
					padding:0.1rem;
					.name{
						font-size:0.6rem;
						white-space:nowrap;
					}
					.singer{
						margin-top:0.2rem
					}
				}
			}
		}
	}
</style>