<template>
	<div class="vue-scroll" ref="scrollWrapper">
		<slot></slot>
	</div>
</template>
<script type="text/javascript">
	import BScroll from 'better-scroll';
	export default{
		props:{
			probeType:{
				type:Number,
				default:2
			},
			click:{
				type:Boolean,
				default:true
			},
			data:{
				type:Array,
				default:null
			}
		},
		data(){
			return{

			}
		},
		mounted(){
			setTimeout(()=>{
				this._initScroll()
			},20)
		},
		methods:{
			_initScroll(){
				console.log(1)
				if(!this.$refs.scrollWrapper){
					return
				};
				this.scroll = new BScroll(this.$refs.scrollWrapper,{
					probeType:1,
					click:this.click,
					scrollY:true,
					scrollX:false
				})
			},
			enable(){
				this.scroll && this.scroll.enable()
			},
			disable(){
				this.scroll && this.scroll.disable()
			},
			refresh(){
				this.scroll && this.scroll.refresh()
			},
		},
		watch:{
			data(){
				setTimeout(()=>{
					this.refresh()
				},20)
			},
		}
	}
</script>
<style lang="scss" rel="stylesheet/scss">

</style>