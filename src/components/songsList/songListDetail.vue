<template>
	<div class="songList-wrapper">
		<directer>
			<span>歌单</span>
		</directer>
		<div class="listTheme">
			<div class="listImg">
				<img :src="listPicUrl" alt="">
			</div>
			<div class="decoration">
				{{listName}}
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
						<li class="item" v-for="(item,index) in songList" @click='goPlayer(index,"singleLoop")'>
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
	import {
	    listDetailFormate
	} from 'common/js/musicFormate.js'
	import directer from '@/components/part/directer.vue';
	export default {
	    data() {
	        return {
	            listId: '',
	            listPicUrl: '',
	            listName: '',
	            songList: [],
	        }
	    },
	    components: {
	        directer,
	        scroll
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

	    		this.$store.commit("setShowPlayer",false)
	    		setTimeout(()=>{
	    			this.$store.commit("setShowPlayer",true)
	    		},100)
	    		
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

		postion:fixed;
		top:0;
		buttom:0;
	    .listTheme {
	        height: 4rem;
	        background-color: rgba(5, 24, 40, 0.8);
	        padding-top: 0.3rem;
	        display: flex;
	        .listImg {
	            height: 3rem;

	            margin: 0.1rem 0 0 0.6rem;
	            display: inline-block;
	            flex: 1;
	            img {
	                height: 100%;
	            }
	        }
	        .decoration {
	            display: inline-block;
	            white-space: normal;
	            flex: 2;
	            color: #FFFFFF;
	            font-size: 0.6rem;
	            margin-top: 0.2rem;
	            line-height: 0.9rem;
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
