<template>
	<div class="swiper-container" ref="scrollWrapper">
		<div class="swiper-wrapper"><slot></slot></div>
		
	</div>
</template>
<script type="text/javascript">
	import BScroll from 'better-scroll';
	export default {
	    props: {
	        probeType: {
	            type: Number,
	            default: 2
	        },
	        click: {
	            type: Boolean,
	            default: true
	        },
	        data: {
	            type: Array,
	            default: null
	        }
	    },
	    data() {
	        return {

	        }
	    },
	 
	    methods: {
	

	    },
	    watch: {
	        data() {
	            // this.refresh()
	        },
	    }
	}
</script>
<style lang="scss" rel="stylesheet/scss">
.swiper-container {
    width: 600px;
    // height: 300px;
}  
</style>
