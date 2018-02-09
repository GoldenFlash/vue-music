<template>
	<div class="recommend">
		<directer><span>每日推荐</span></directer>
		<div class="button"  @click='goPlayer(0,"loop")'>
			<div class="icon">
				<i class="fa fa-play-circle-o" ></i>
			</div>
			<div class="name">播放全部</div>
		</div>
		
		<div class="song-wrapper">
			<scroll :data="recommendSongs" ref="scroll">
				<div>
					<div class="item" v-for ="(item,index) in recommendSongs" @click='goPlayer(index,"singleLoop")'>
						<div class="img">
							<img v-lazy="item.picUrl" alt="" @load="loadImage">
						</div>
						<div class="detail">
							<div class="name">{{item.name}}</div>
							<div class="singer">{{item.name}} - {{item.name}}</div>
						</div>
					</div>
				</div>
			</scroll>
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
	import scroll from 'base/scroll/scroll2.vue'
	export default{
		data(){
			return{
				recommendSongs:[],
			}
		},
		components:{
			directer,
			loading,
			scroll
		},
		mounted(){
			
			this._getRecommendSongs()
		},
		methods:{
			loadImage() { // 图片加载完成后，让scroll组件重新计算高度，由于图片高度都是一样的，所以仅需调用一次
		          this.$refs.scroll.refresh()
		      },
			goPlayer(index,loop){
	    		this.$store.commit('setMusiclist',this.recommendSongs)
	    		this.$store.commit('setIndex', index);
	    		if(loop){
	    			this.$store.commit('setPlayWay', loop);
	    		}

	    		this.$router.push({
	    			path:'/player',
	    			
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
		position:fixed;
		top:0;
		buttom:0;
		left:0;
		right:0;
		
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
			height:82vh;
			// overflow:hidden;
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