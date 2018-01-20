<template>
	<div class="header">
		<span class="icon-menu">
			<i class="fa fa-bars"></i>
		</span>
		<span class="icon-music ">
			<i class="fa fa-music"></i>
		</span>
		<span class="icon-note current" >♪</span>
		<span class="icon-contact">
			<i class="fa fa-qq"></i>
		</span>
		<span class="icon-search">
			<i class="fa fa-search"></i>
		</span>
	</div>
</template>
<script type="text/javascript">
	export default {
	    data() {
	        return {

	        }
	    },
	  
	}
</script>
<style lang="scss" rel="stylesheet/scss">
	.header {
	    height: 1.6rem;
	    width: 100%;
	    background-color: rgb(211, 58, 49);
	    box-sizing: border-box;
	    padding: 0 0.5rem;
	    display: flex;
	    justify-content: center;
	    align-items: center;
	    .current {
	        color: #FFFF
	    }
	    .icon-menu {
	        flex: 2;
	        color: #ffff;
	    }
	    .icon-search {
	        flex: 0.5;
	        margin-left: 1rem
	    }
	}
	.icon-menu, .icon-music, .icon-note, .icon-contact, .icon-search {
	    font-size: 0.8rem;
	    flex: 1;
	}
	.icon-music, .icon-note, .icon-contact, .icon-search {
	    color: #e58983;
	}
</style>
