<template>
	<div class="recommend">
		<directer><span>每日推荐</span></directer>
		<div class="button"  @click='goPlayer(0)'>
			<div class="icon">
				<i class="fa fa-play-circle-o" ></i>
			</div>
			<div class="name">播放全部</div>
		</div>
		<div class="song-wrapper">
			<div class="item" v-for ="(item,index) in recommendSongs" @click='goPlayer(index,"singleLoop")'>
				<div class="img">
					<img v-lazy="item.picUrl" alt="" >
				</div>
				<div class="detail">
					<div class="name">{{item.name}}</div>
					<div class="singer">{{item.name}} - {{item.name}}</div>
				</div>
			</div>
		</div>
		<loading v-show="!recommendSongs.length"></loading>
	</div>
</template>
<script type="text/javascript">
	import {getRecommendSongs} from 'api/recommend.js'
	import axios from 'axios';
	import directer from '@/components/part/directer.vue'
	import loading from '@/base/loading/loading.vue'
	import {fmFormate} from 'common/js/musicFormate.js'
	export default{
		data(){
			return{
				recommendSongs:[],
			}
		},
		components:{
			directer,
			loading
		},
		mounted(){
			
			this._getRecommendSongs()
		},
		methods:{
			goPlayer(index,singleLoop){
	    		this.$store.commit('setMusiclist',this.recommendSongs)

	    		this.$router.push({
	    			path:'/player',
	    			query:{
	    				index:index,
	    				singleLoop:singleLoop,
	    			}
	    		})
	    		
	    	},
			_getRecommendSongs(){
				getRecommendSongs().then((res)=>{
					this.recommendSongs=fmFormate(res.data.recommend)
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
						color:#666;
						margin-top:0.2rem
					}
				}
			}
		}
	}
</style>