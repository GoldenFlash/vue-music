<template>
	<div>
		<directer>
			<span>搜索</span>
		</directer>
		<div class="search">
			<div class="icon-search" @click="getResult">
				<i class="fa fa-search" aria-hidden="true"></i>
			</div>
			<input type="text" placeholder="请输入关键字" v-model="keywords">
		</div>
		<div class="content">
			<ul>
				<li v-for="(item,index) in searchResult" class="item" @click='goPlayer(index,"singleLoop")'>
					<div class="name">{{item.name}}</div>
					<div class="singer">{{item.singer}} - {{item.albumName}}</div>
				</li>
			</ul>
		</div>
	</div>
</template>
<script type="text/javascript">
	import directer from '@/components/part/directer.vue';
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
	    },
	    methods: {
	        goPlayer(index, loop) {
	            this.$store.commit('setMusiclist', this.searchResult)
	            this.$store.commit('setIndex', index);
	            if (loop) {
	                this.$store.commit('setPlayWay', loop);
	            }

	            this.$router.push({
	                path: '/player',

	            })

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
	.search {
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
	    .item {
	        margin-top: 0.3rem;
	        border-bottom:solid .name {
	            font-size: 0.7rem;
	        }
	        .singer {
	            margin-top: 0.2rem;
	            color: #666;
	        }
	    }
	}
</style>
