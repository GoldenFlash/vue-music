<template>
	<div class="loading">
		<div class="wrapper">
			<img width="60" height="60" src="./loading.gif">
			<p class="desc">{{title}}</p>
		</div>
	</div>
</template>
<script type="text/ecmascript-6">
	export default {
	    props: {
	        title: { // 接受一个默认的加载描述参数
	            type: String,
	            default: '正在载入...'
	        }
	    }
	}
</script>
<style scoped lang="scss" rel="stylesheet/scss">
	.loading {

	    position: relative;
	    width: 100%;
	    height: 400px;
	    .wrapper {

	       
	        margin: auto;

	        position: absolute;
	        width:90px;
	        height:100px;
	        top: 0;
	        left: 0;
	        bottom: 0;
	        right: 0;
	        text-align:left;
	        img{
	        	transform:translateX(5px);
	        }
	        .desc {

	            font-size: 0.6rem;
	            color: #333;
	        }
	    }
	}
</style>
