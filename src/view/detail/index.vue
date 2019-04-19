<template>
	<div class="songList-wrapper">
		<navBar style="position: fixed;z-index: 10">歌单</navBar>
		<div class="info" :style="{backgroundImage: 'url('+playlist.coverImgUrl+')',backgroundSize:'cover'}">
			<div class="cover"  :style="{backgroundImage: 'url('+playlist.coverImgUrl+')',backgroundSize:'cover'}"></div>
			<div class="wrapper">
				<div style="margin-top: 60px;display: flex;">
					<div class="listImg">
						<img :src="playlist.coverImgUrl" alt="">
					</div>
					<div class="decoration">
						<p>{{playlist.name}}</p>
						<div>
							<div style="display: flex;align-items: center;">
								<img style="width:30px;height: 30px;border-radius: 20px" :src="playlist.creator.avatarUrl">
								<span style="font-size: 14px;margin-left: 5px;color:#e6e6e6">{{playlist.creator.nickname}}</span>
								<img style="height:15px" src="./asset/right.svg">
							</div>
						</div>
					</div>
				</div>
				<div class ="icon-wrapper">
					<div class="itemIcon">
						<img  src="./asset/cm6_list_detail_icn_cmt@3x.png">
						<span >{{playlist.commentCount}}</span>
					</div>
					<div class="itemIcon">
						<img src="./asset/cm6_list_detail_icn_share@3x.png">
						<span>{{playlist.shareCount}}</span>
					</div>
					<div class="itemIcon">
						<img src="./asset/cm6_list_detail_icn_dld@3x.png">
						<span>下载</span>
					</div>
					<div class="itemIcon">
						<img  src="./asset/cm6_list_detail_icn_multi@3x.png">
						<span>多选</span>
					</div>
				</div>
			</div>
		</div>
		<div class="content">
			<div class="title">
				<div class="button" @click='goPlayer(0,"loop")'>
					<div class="icon">
						<img src="./asset/cm2_list_icn_play@3x.png">
					</div>
					<div class="name">播放全部</div>
				</div>
			</div>
			<div class="songs">
				<ul>
					<li class="item" v-for="(item,index) in songList" :key = "index" @click='goPlayer(index,"singleLoop")'>
						<div class="index"><span>{{index+1}}</span></div>
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
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
	import axios from 'axios'
	import {  listDetailFormate } from '@/common/js/musicFormate.js'
	import navBar from "../../components/nav/nav.vue"
	export default {
	    data() {
	        return {
	            listId: '',
	            listPicUrl: '',
	            listName: '',
	            songList: [],
	            color:"red",
	            playlist:{}
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
	        	// console.log(" this.$route", this.$route)
	        	var listId = this.$route.params.id;
	        	// this.listPicUrl = this.$route.query.picUrl;
	            axios.get('/playlist/detail', {
	                params: {
	                    id: listId
	                }
	            }).then((res) => {
	               console.log(res)
	               	this.playlist =res.data.playlist 
	                this.songList = listDetailFormate(res.data.playlist.tracks);
	                // this.listName = res.data.playlist.name;
	                
	            })
	        }
	    },
	    mounted() {
	        
	        this.getsongListDetail();
	    },
	}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
	.songList-wrapper {
		height:100%;
	    .info {
			// width:100%;
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
				background-color:rgba(255,255,255,1);
        		-webkit-filter: blur(20px);
			    -moz-filter: blur(20px);
			    -ms-filter: blur(20px);
			    -o-filter: blur(20px);
			    filter: blur(20px);
			}
	        .wrapper{
	        	position: absolute;
	        	z-index: 1;
	        	// width:100%;
	        	top:0;
	        	left:0;
	        	right: 0;
				height:100%;
				// border:solid yellow 1px;
				background-color: rgba(0,0,0,0.4);
				padding:0 20px;
		        .listImg {
		           width:120px;
				   height: 120px;
		            img {
		                height: 100%;
						width:100%;
						border-radius: 6px;
		            }
		        }
		        .decoration {
		           margin-left: 20px;
		            flex: 1;
		            color: #FFFFFF;
		            font-size:16px;
		            margin-top: 0.2rem;
		            line-height: 0.9rem;
		            overflow: hidden;
					text-overflow:ellipsis;
		        }
		        .icon-wrapper{
		        	display: flex;
		        	justify-content: center;

		        	margin-top: 10px;
		        	.itemIcon{
			        	flex:1;
			        	display: flex;
			        	justify-content:center;
			        	align-items:center;
			        	flex-direction:column;
			        	img{
			        		// height:30px;
			        		width:30px
			        	}
			        	span{
			        		color:#FFF;
			        		margin-top:5px;
			        		font-size: 13px
			        	}
			        }
		        }
		        
	        }
	
	    }
	    .content {
	        .title {
	            .button {
	               display: flex;
	               align-items:center;
	               margin-top: 15px;
	               margin-left: 10px;
	                .icon{
	                   width:22px;
	                   height:22px;
	                }
	                .name {
	                    margin-left:5px;
	                    font-size: 18px;
	                    font-weight: bold
	                }
	            }
	        }
	        .songs {
	        	height:62vh;
	        	overflow:hidden;
	            .item {
	               display: flex;
	               align-items:center;
	               margin:20px 10px;
	               .index{
	               	margin:0 10px;
	               }
	                .wrapper {
	                	flex:1;
	                    .name {
	                       font-size: 18px;
	                       color:#333
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
