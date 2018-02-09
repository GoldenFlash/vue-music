<template>
	<div class="wrapper" :data="refresh">
		<div class="button">
			<button @click="click">click</button>
		</div>
		<scroll ref="scroll">
			<div class="test">
				12312311111111111111111111111111111111
				1111111111
				1
				1
				1

				111111111111111111111
				1

				1
				1
				1
				1

			</div>
		</scroll>
	</div>
</template>
<script type="text/javascript">
import scroll from "@/base/scroll/scroll2.vue"

	export default{
		data(){
			return{
				refresh:[1,2,3,1],
			}
		},
		components:{
			scroll
		},
		methods:{
			click(){
				
				this.$refs.scroll.refresh()
				
				setTimeout(()=>{
					this.refresh = [1,2,3]
				},3000)
			}
		}
	}
</script>
<style lang="scss" rel="stylesheet/scss">
	.wrapper{
		height:400px;
		overflow:hidden;
		.test{
			height:1000px;
			background-color: blue;
		}
	}
</style>