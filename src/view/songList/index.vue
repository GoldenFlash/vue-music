<template>
	<div class="songList-wrapper">
		<navBar></navBar>
		<!-- <directer>
			<span>歌单</span>
		</directer> -->
		<div class="info" :style="{backgroundImage: 'url('+listPicUrl+')',backgroundSize:'cover'}">
			<div class="cover"></div>
			<div class="wrapper">
				<div class="listImg">
					<img :src="listPicUrl" alt="">
				</div>
				<div class="decoration">
					{{listName}}
				</div>
			</div>
		</div>
		<div class="content">
			<div class="title">
				<div class="button" @click='goPlayer(0,"loop")'>
					<div class="icon">
						<i class="fa fa-play-circle-o"></i>
					</div>
					<div class="name">播放全部</div>
				</div>
			</div>
			<div class="songs">
				<scroll ref="scroll" :data="songList">
					<ul>
						<li class="item" v-for="(item,index) in songList" :key = "index" @click='goPlayer(index,"singleLoop")'>
							<div class="wrapper">
								<div class="name">{{item.name}}</div>
								<div class="singer">
									{{item.singer}} - {{item.albumName}}
								</div>
							</div>
							<div class="menu">
								<i class="fa fa-list" aria-hidden="true"></i>
							</div>
						</li>
					</ul>
				</scroll>
				
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
import scroll from "@/base/scroll/scroll2.vue"
	import axios from 'axios'
	import {  listDetailFormate } from '@/common/js/musicFormate.js'
	// import directer from '@/components/part/directer.vue';
	import navBar from "../../components/nav/nav.vue"
	export default {
	    data() {
	        return {
	            listId: '',
	            listPicUrl: '',
	            listName: '',
	            songList: [],
	            color:"red"
	        }
	    },
	    components: {
	        // directer,
	        scroll,
	        navBar
	    },
	    methods: {
	    	loadImage() { 
		          this.$refs.scroll.refresh()
		     },
	    	goPlayer(index,loop){
	    		this.$store.commit('setMusiclist',this.songList)
	    		this.$store.commit('setIndex', index);
	    		if(loop){
	    			this.$store.commit('setPlayWay', loop);
	    		}

	    		this.$router.push({
	    			path:'/player',
	    			
	    		})
	    		
	    	},
	        getsongListDetail() {
	            axios.get('/playlist/detail', {
	                params: {
	                    id: this.listId
	                }
	            }).then((res) => {
	               
	                this.songList = listDetailFormate(res.data.playlist.tracks);
	                this.listName = res.data.playlist.name;
	                
	            })
	        }
	    },
	    mounted() {
	        this.listId = this.$route.query.id;
	        this.listPicUrl = this.$route.query.picUrl;
	        this.getsongListDetail();
	    },
	}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
	.songList-wrapper {
		// position:fixed;
		// top:0;
		// bottom:0;
	    .info {
	        // height: 4rem;
			width:100%;
			height:250px;
			position: relative;
			overflow: hidden;
			.cover{
				position: absolute;
				top:50%;
				left: 50%;
				transform:translateX(-50%) translateY(-50%);
				width:140%;
				height:300px;
				background-color:rgba(255,255,255,0.9);
        		-webkit-filter: blur(20px);
			    -moz-filter: blur(20px);
			    -ms-filter: blur(20px);
			    -o-filter: blur(20px);
			    filter: blur(20px);
			}
	        .wrapper{
	        	position: absolute;
	        	z-index: 1;
	        	width:100%;
				height:100%;
				
		        .listImg {
		           width:120px;
				   height: 120px;
		            img {
		                height: 100%;
						width:100%;
		            }
		        }
		        .decoration {
		           
		            flex: 1;
		            color: #FFFFFF;
		            font-size: 0.6rem;
		            margin-top: 0.2rem;
		            line-height: 0.9rem;
		        }
	        }
	
	    }
	    .content {
	        .title {
	            .button {
	                padding: 0.5rem;
	                .icon, .name {
	                    font-size: 0.7rem;
	                    display: inline-block;
	                }
	                .name {
	                    margin-left: 0.5rem;
	                }
	            }
	        }
	        .songs {
	        	height:62vh;
	        	overflow:hidden;
	            .item {
	                margin: 0.5rem 0.4rem;
	                border-bottom: solid #e6e8e9 1px;
	                padding-bottom: 0.2rem;
	                .wrapper {
	                	display:inline-block;
	                    .name {
	                        font-size: 0.6rem;
	                    }
	                    .singer {
	                        margin-top: 0.2rem;
	                        font-size: 0.45rem;
	                        color: #666;
	                    }
	                }
	                .menu {
	                	color:#666;
	                    float: right;
	                }
	            }
	        }
	    }
	}
</style>
