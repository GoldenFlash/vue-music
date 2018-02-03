<template>
	<div>
		<directer><span>歌单</span></directer>
		<div class="songsList-wrapper">
			<div class="item" v-for="item in songsList">
				<div class="img">
					<img v-lazy="item.coverImgUrl" alt="" >
				</div>
				<div class="name">{{item.name}}</div>
			</div>
		</div>
		<loading v-show="!songsList.length"></loading>
	</div>
</template>
<script type="text/javascript">
import axios from 'axios';
import directer from '@/components/part/directer.vue';
import loading from '@/base/loading/loading.vue'
	export default{
		data(){
			return{
				songsList:[],
			}
		},
		components:{
			directer,
			loading
		},
		mounted(){
			this.getSongsList()
		},
		methods:{
			getSongsList(){
				axios.get('/top/playlist').then((res)=>{
					console.log(res.data.playlists);
					this.songsList = res.data.playlists;
				})
			}
		}
	}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
	.songsList-wrapper{
		text-align:center;
		margin-top:0.3rem;

		.item{
			text-align:left;
			margin-top:0.3rem;
			box-sizing:border-box;
			display:inline-block;
			padding:0 0.1rem;
			width:50%;
			height:8rem;
			overflow:hidden;
			.name{
				margin-top:0.2rem;
				font-size:0.6rem;
			}
		}
	}
</style>