<template>
	<div class="header">
		<input class="input" type="text">
	</div>
</template>
<script type="text/javascript">
import axios from 'axios';
	export default {
		name:"header",
	    data() {
	        return {
				position:"fixed"
	        }
		},
		mounted() {
			window.onscroll = (e)=>{
				// var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
				// console.log(scrollTop)
				// if(scrollTop>=1){
				// 	 this.position = "fixed"
				// }else{
				// 	this.position = "static"
				// }
				
			}
		},
	    methods:{
	    	search(){
	    		this.$router.push({
	    			path:'/search',
	    		})
	    	},
	    	login(){
	    		axios.get('/login/cellphone?phone=18655483280&password=wangwei531221571').then((res)=>{
	    			console.log('登录成功')
	    		})
	    	}
	    }
	  
	}
</script>
<style lang="scss" rel="stylesheet/scss">
	.header {
	    height:60px;
		width: 100%;
		position: fixed;
		z-index: 10;
	    background-color:#FFF;
		box-sizing: border-box;
		display: flex;
		align-items:center;
		justify-content: center;
	   .input{
			width:85%;
			height:35px;
			background-color: #EEEEEE;
	   }
	}
	
</style>
