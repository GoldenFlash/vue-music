<template>
	<div>
		<directer>
			<span>歌单</span>
		</directer>
		<div class="songsList-wrapper">
			<scroll :data="songsList" ref="scroll">
				<div>
					<div class="item" v-for="(item ,i) in songsList" :key="i" @click="goSonglistDetail(item.id,item.coverImgUrl)">
						<div class="img">
							<img v-lazy="item.coverImgUrl" alt="" @load="loadImage">
						</div>
						<div class="name">{{item.name}}</div>
					</div>
				</div>
			</scroll>
			
		</div>
		<loading v-show="!songsList.length"></loading>
	</div>
</template>
<script type="text/javascript">
	import axios from 'axios';
	import directer from '@/components/part/directer.vue';
	import loading from '@/base/loading/loading.vue'
	import scroll from '@/base/scroll/scroll2.vue'
	export default {
	    data() {
	        return {
	            songsList: [],
	        }
	    },
	    components: {
	        directer,
	        loading,
	        scroll
	    },
	    mounted() {
	        this.getSongsList()
	    },
	    methods: {
	    	loadImage() { 
		          this.$refs.scroll.refresh()
		     },
	    	goSonglistDetail(id,picUrl){
	    		this.$router.push({
	    			path:'/songListDetail',
	    			query:{
	    				id:id,
	    				picUrl:picUrl,
	    			},
	    		})
	    	},
	        getSongsList() {
	            axios.get('/top/playlist').then((res) => {
	                this.songsList = res.data.playlists;
	            })
	        }
	    }
	}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
	.songsList-wrapper {
		height:88vh;
	    text-align: center;
	    padding-top: 0.3rem;

	    .item {
	        text-align: left;
	        margin-top: 0.3rem;
	        box-sizing: border-box;
	        display: inline-block;
	        padding: 0 0.1rem;
	        width: 50%;
	        height: 8rem;
	        overflow: hidden;
	        .name {
	            margin-top: 0.2rem;
	            font-size: 0.6rem;
	        }
	    }
	}
</style>
