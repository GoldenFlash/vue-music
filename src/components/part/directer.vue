<template>
	<div class="title">
		<div class="icon" @click="gohistory(-1)">
			<i class="fa fa-arrow-left"></i>
		</div>
		<div class="name"><slot></slot></div>
	</div>
</template>
<script type="text/javascript">
	export default {
	    data() {
	        return {

	        }
	    },
	    methods:{
	    	gohistory(value){
				this.$router.go(value)
			},
	    }
	}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
	.title{
			box-sizing:border-box;
			
			padding:0.5rem;
			font-size:0;
			background-color: rgb(211, 58, 49);
			.icon, .name{
				font-size:0.8rem;
				color:#FFFFFF;
				display:inline-block;
			}
			.icon{
				padding-right:0.4rem;
				font-size:1rem;
				font-weight:1
			}
		}
</style>
