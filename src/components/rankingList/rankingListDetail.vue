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
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
	import axios from 'axios'
	import {
	    listDetailFormate
	} from 'common/js/musicFormate.js'
	import directer from '@/components/part/directer.vue';
	import {rankingDetailFormate} from 'common/js/musicFormate.js'
	export default {
	    data() {
	        return {
	            
	            listPicUrl: '',
	            listName: '',
	            songList: [],
	        }
	    },
	    components: {
	        directer,
	    },

	    methods: {
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
	       getRankinglist(){
				axios.get('/top/list',{params:{idx:this.idx, }}).then((res)=>{
					
	        		this.listPicUrl = res.data.playlist.coverImgUrl;
	        		this.listName = res.data.playlist.name;
					let list =rankingDetailFormate(res.data.playlist.tracks);
					
					this.songList = list
					
				})
			}
	    },
	    mounted() {
	        this.idx = this.$route.query.idx;
	        this.getRankinglist();
	    },
	}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
	.songList-wrapper {
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
