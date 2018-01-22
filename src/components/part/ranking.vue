<template>
	<div>
		<div class="rankingList">
			<div class="wrapper">
				<div class="img">
					<slot></slot>
				</div>
				<div class="detail">
					<div class="item" v-for="(item,index) in rankingList">
						<div class="descript">{{index+1}}.{{item.name}} - {{item.ar[0].name}}</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
	import axios from 'axios';

	export default{
		props:{
			idx:{
				type:Number,
				default:1
			}
		},
		data(){
			return{
				rankingList:[],
			}
		},
		mounted(){
			this.getRankinglist();
		},
		methods:{
			getRankinglist(){
				axios.get('/top/list',{params:{idx:this.idx, }}).then((res)=>{
					let list = res.data.playlist.tracks
					this.rankingList = list.slice(0,3)
				})
			}
		}
	}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
	.rankingList{
		.wrapper{
			.img{
				display:inline-block;
				vertical-align:top;
				width:30%;
			}
			.detail{
				margin-left:0.1rem;
				display:inline-block;
				font-size:0.55rem;
				width:68%;
				.item{
					margin:0.55rem 0;
					
					.descript{
						overflow:hidden;
						white-space:nowrap;
					}
				}

			}
		}
	}
</style>