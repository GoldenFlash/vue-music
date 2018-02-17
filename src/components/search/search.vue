<template>
	<div id="searchId">
		<directer>
			<span>搜索</span>
		</directer>
		<div id="search">
			<div class="icon-search" @click="getResult">
				<i class="fa fa-search" aria-hidden="true"></i>
			</div>
			<input type="text" placeholder="请输入关键字" v-model="keywords">
		</div>
		<div class="content">
			<scroll :data="searchResult" ref="scroll">
				<ul>
					<li v-for="(item,index) in searchResult" class="item" @load="load" @click='goPlayer(index,"singleLoop")'>
						<div class="name">{{item.name}}</div>
						<div class="singer">{{item.singer}} - {{item.albumName}}</div>
					</li>
				</ul>
			</scroll>
			
		</div>
	</div>
</template>
<script type="text/javascript">
	import directer from '@/components/part/directer.vue';
	import scroll from '@/base/scroll/scroll2.vue'
	import {
	    searchResultFormate
	} from 'common/js/musicFormate.js'
	import axios from "axios"
	export default {
	    data() {
	        return {
	            keywords: '',
	            searchResult: [],
	        }
	    },
	    components: {
	        directer,
	        scroll
	    },
	    methods: {
	    	load() { 
		        setTimeout(()=>{
		        	 this.$refs.scroll.refresh()
		        },500)
		     },
	        goPlayer(index, loop) {
	            this.$store.commit('setMusiclist', this.searchResult)
	            this.$store.commit('setIndex', index);
	            if (loop) {
	                this.$store.commit('setPlayWay', loop);
	            }

	            this.$store.commit("setShowPlayer", false)
	            setTimeout(() => {
	                this.$store.commit("setShowPlayer", true)
	            }, 100)

	        },
	        getResult() {
	            axios.get('/search', {
	                params: {
	                    keywords: this.keywords
	                }
	            }).then((res) => {
	                if (res.data.code === 200) {
	                    this.searchResult = searchResultFormate(res.data.result.songs)
	                }
	            })

	        }
	    }
	}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
	#searchId {
		position:absolute;
		top:0;
		bottom:0;
		left:0;
		right:0;

	    #search {
	        text-align: center;
	        padding: 0.3rem 0;
	        .icon-search {
	            display: inline-block;
	            margin-right: 0.3rem;
	        }
	        input {
	            width: 80%;
	            height: 1rem;
	            border: solid #666 1px;
	            border-radius: 0.2rem;
	        }
	    }
	    .content {
	    	height:80vh;
	    	overflow:hidden;
	        .item {
	            margin-top: 0.5rem;
	            border-bottom: solid #e6e8e9 1px;
	            .name {
	                font-size: 0.6rem;
	                white-space: nowrap;
	                overflow: hidden;
	            }
	            .singer {
	                margin-top: 0.2rem;
	                color: #666;
	            }
	        }
	    }
	}
</style>
