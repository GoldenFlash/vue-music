<template>
	<div class="musicDetail" @click="hiddenMuiscDetail">
		<div class="wrapper" @click.stop>
			<div class="title">
				<div class="playMethod">
					<span>{{playMethods}}</span>
					<span>({{musiclist.length}})</span>
				</div>
				<div class="delete"></div>
			</div>
			<div class="content">
				<scroll ref="scroll">
					<ul class="item-wrapper">
						<li class="item" v-for="(item,i) in musiclist" :class='{"active":index===i}' @click="playItem(i)">
							<span class="songs" @load="loadImage">{{item.name}} - {{item.singer}}</span>
							<span class="deleteSelf" @click.stop="deleteSongs(i)">
								<i class="fa fa-trash-o" aria-hidden="true"></i>
							</span>
						</li>
					</ul>
				</scroll>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
	import scroll from 'base/scroll/scroll2.vue'

	export default {
	    props: {
	        musiclist: Array,
	        index: Number,
	        playWay: String,

	    },
	    data() {
	        return {
	            playMethods: 'loop',
	        }
	    },
	    components: {
	        scroll
	    },
	    watch: {
	        playWay() {

	            this.playMethods = this.playWay;
	        }
	    },
	    methods: {
	        loadImage() {
	            this.$refs.scroll.refresh()
	        },
	        deleteSongs(index) {
	            this.$store.commit("deleteSongs", index)
	        },
	        playItem(i) {
	            this.$emit('emitIndex', i)
	        },
	        hiddenMuiscDetail() {

	            this.$emit('showMusicDetail')
	        }
	    },
	    mounted() {

	    }
	}
</script>
<style lang="scss" rel="stylesheet/scss">
	.musicDetail {
	    position: absolute;
	    top: 0;
	    bottom: 0;
	    left: 0;
	    right: 0;
	    .wrapper {
	        position: fixed;
	        bottom: 0;
	        background-color: #fff;
	        width: 100%;
	        height: 10rem;

	        .title {
	            padding: 0.3rem 0.2rem;
	            border-bottom: solid #e6e8e9 1px
	        }
	        .content {
	            height: 100%;
	            overflow: hidden;
	            .item-wrapper {

	                .item {
	                    padding: 0.3rem 0.2rem;
	                    .songs {}
	                    .deleteSelf {
	                        float: right;
	                        padding: 0.3rem;
	                        margin-top: -0.2rem;
	                    }
	                }
	            }

	            .active {
	                color: rgb(211, 58, 49)
	            }
	        }
	    }
	}
</style>
