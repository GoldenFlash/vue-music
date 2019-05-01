<template>
	<div class="songList-wrapper">
		
		<div class="background" >
			<div class="wrapper">
				<div v-if="playlist" class="cover" :style="{backgroundImage: 'url('+playlist.coverImgUrl+')',backgroundSize:'cover'}"></div>
				<navBar class="navbar">歌单</navBar>
			</div>
		</div>
		<div class="info">
			<div v-if="playlist" class="cover" :style="{backgroundImage: 'url('+playlist.coverImgUrl+')',backgroundSize:'cover'}"></div>
			<div class="wrapper">
				<div style="margin-top: 60px;display: flex;">
					<div class="listImg">
						<img :src="playlist.coverImgUrl" alt="">
					</div>
					<div class="decoration">
						<h3>{{playlist.name}}</h3>
						<div style="margin-top:10px">
							<div v-if="playlist" style="display: flex;align-items: center;">
								<img  style="width:30px;height: 30px;border-radius: 20px" :src="playlist.creator.avatarUrl">
								<span style="font-size: 14px;margin-left: 5px;color:rgba(255,255,255,0.6)">{{playlist.creator.nickname}}</span>
								<img style="height:15px" src="./asset/right.svg">
							</div>
							<div style="display: flex;align-items: center;margin-top:5px">
								<p class="description">{{playlist.description}}</p>
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
							<img src="./asset/cm4_list_icn_more@3x.png" alt="">
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
	            songList: [],
	            playlist:""
	        }
	    },
	    components: {
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
	        	var listId = this.$route.params.id;
	            axios.get('/playlist/detail', {
	                params: {
	                    id: listId
	                }
	            }).then((res) => {
	               console.log(res)
	               	this.playlist =res.data.playlist 
	                this.songList = listDetailFormate(res.data.playlist.tracks);	                
	            })
			},
			onScroll(){

				var el = document.documentElement||document.body
				window.onscroll=()=>{
					var scrollTop = el.scrollTop
					console.log("scrollTop",scrollTop)
				}
				
			}
	    },
	    mounted() {
			this.getsongListDetail();
			this.onScroll()
	    },
	}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
	.songList-wrapper {
		height:100%;
		
		.background{
			position: fixed;
			z-index: 9;
			height:50px;
			width:100%;
			overflow: hidden;
			.wrapper{
				height:280px;
				width:100%;
				// background-position:0 0;
				// position: relative;
				// overflow: hidden;
				.navbar{
					position: absolute;
					background-color: rgba(0,0,0,0.4);
					z-index: 10;
				}
				.cover{
					position: absolute;
					z-index: 10;
					// background-position:20px 20px;
					top:50%;
					left:50%;
					transform:translateX(-50%) translateY(-50%);
					width:140%;
					height:400px;
					background-color:rgba(255,255,255,1);
					-webkit-filter: blur(20px);
					-moz-filter: blur(20px);
					-ms-filter: blur(20px);
					-o-filter: blur(20px);
					filter: blur(20px);
				}
				
			}
			
		}
	    .info {
			height:280px;
			position: relative;
			overflow: hidden;
			.cover{
				position: absolute;
				top:50%;
				left: 50%;
				transform:translateX(-50%) translateY(-50%);
				width:140%;
				height:400px;
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
	        	top:0;
	        	left:0;
	        	right: 0;
				height:100%;
				background-color: rgba(0,0,0,0.4);
				padding:0 20px;
				padding-top:10px;
		        .listImg {
		           width:130px;
				   height: 130px;
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
		            line-height: 1.4;
		            overflow: hidden;
					text-overflow:ellipsis;
					.description{
						height:40px;
						line-height: 20px;
						overflow: hidden;
						text-overflow: ellipsis;
						font-size: 14px;
						margin-left: 5px;
						color:rgba(255, 255, 255, 0.6)
					}
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
			padding:0 15px;
	        .title {
				position:sticky;
				z-index: 11;
				width:100%;
				padding: 15px 0;
				background-color: #fff;
				top:50px;
	            .button {
	               display: flex;
	               align-items:center;
	            //    margin-top: 15px;
	            //    margin-left: 10px;
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
	            .item {
	               display: flex;
	               align-items:center;
	               margin:20px 0px;
	               .index{
					   margin-right:15px;
					   color:#999
	               }
	                .wrapper {
	                	flex:1;
	                    .name {
	                       font-size: 18px;
	                       color:#333
	                    }
	                    .singer {
	                        margin-top:10px;
	                        font-size:14px;
	                        color: #666;
	                    }
	                }
	                .menu {
	                	color:#666;
						float: right;
						img{
							width:30px;
							transform: rotate(90deg)
							
						}
	                }
	            }
	        }
	    }
	}
</style>
