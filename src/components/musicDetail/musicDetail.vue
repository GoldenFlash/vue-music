<template>
	<div class="musicDetail" @click.stop="hiddenMuiscDetail">
		<div class="wrapper" @click.stop>
			<scroll ref="scroll">
				<div>
					<div class="title">
						<div class="playMethod" @click="changePlayWay">
							<span class="methods">{{playMethods}}</span>
							<span>({{musiclist.length}})</span>
						</div>
						<div class="delete"></div>
					</div>
					<div class="content">
						<ul class="item-wrapper">
							<li class="item" v-for="(item,i) in musiclist" :class='{"active":index===i}' @click="playItem(i)">
								<span class="songs" @load="loadImage">{{item.name}} - {{item.singer}}</span>
								<span class="deleteSelf" @click.stop="deleteSongs(i)">
									<i class="fa fa-trash-o" aria-hidden="true"></i>
								</span>
							</li>
						</ul>
					</div>
				</div>
			</scroll>
		</div>
	</div>
</template>
<script type="text/javascript">
	import scroll from 'base/scroll/scroll2.vue'

	export default {
	    props: {
	        musiclist: Array,
	        index: Number,
	      

	    },
	    data() {
	        return {
	           
	        }
	    },
	    components: {
	        scroll
	    },
	    computed:{
	    	playMethods(){
	    		return this.$store.state.playWay;
	    	}
	    },
	   
	    methods: {
	    	changePlayWay(){
	    		if(this.playMethods==="loop"){
	    			this.$store.commit("setPlayWay","random")
	    		}else if(this.playMethods==="random"){
	    			this.$store.commit("setPlayWay","singleLoop")
	    		}else if(this.playMethods==="singleLoop"){
	    			this.$store.commit("setPlayWay","loop")
	    		}
	    		
	    	},
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
	    	this.$nextTick(()=>{
	    		setTimeout(()=>{
	    			this.loadImage()
	    		},2000)
	    	})
	    }
	}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
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
	        overflow: hidden;
	        font-size:0.5rem;

	        .title {
	            padding: 0.3rem 0.2rem;
	            border-bottom: solid #e6e8e9 1px;
	            .playMethod{
	            	.methods{
	            		text-align:center;
	            		display:inline-block;
	            		width:2.3rem;
	            	}
	            }
	        }
	        .content {
	            // height: 45vh;
	            // overflow: hidden;
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
