<template>
	<div class="nav">
		<div class="left">
			<img src="./asset/left.svg">
		</div>
		<div class="title">
			<h2>{{title}}</h2>
		</div>
		<div class="right">
			<!-- <img src="./asset/left.svg"> -->
		</div>
	</div>
</template>
<script type="text/javascript">
	export default{
		name:"navBar",
		props:{
			title:{
				type:String,
				default:"header title"
			}
		},
		data(){
			return {}
		}

	}
</script>
<style scoped  lang="scss" rel="stylesheet/scss">
	.nav{
		// margin:0 20px;
		width:100%;
		height:64px;
		// background-color: red;
		display: flex;
		align-items: center;
		justify-content: center;
		.left{
			// flex:1;
			width:60px;
			display:flex;
			justify-content: center;
			img{
				width:30px;
				height:30px;
			}
		}
		.title{
			flex:1;
			text-align: center;

		}
		.right{
			// flex:1;
			width:60px;
			img{
				width:30px;
				height:30px;
			}
		}
		
	}
</style>