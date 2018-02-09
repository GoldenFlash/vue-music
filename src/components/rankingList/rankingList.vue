<template>
	<div>
		<directer>
			<span>排行榜</span>
		</directer>
		<div class="ranking">
			<div class="title">官方榜</div>
			<scroll ref="scroll" >
				
					<div class="ranking-wrapper">
						<ranking :idx="3" class="item">
							<div>
								<img src="http://p1.music.126.net/DrRIg6CrgDfVLEph9SNh7w==/18696095720518497.jpg?param=150y150" alt="">
							</div>
						</ranking>
						<ranking :idx="0" class="item">
							<div>
								<img src="http://p1.music.126.net/N2HO5xfYEqyQ8q6oxCw8IQ==/18713687906568048.jpg?param=150y150" alt="">
							</div>
						</ranking>
						<ranking :idx="2" class="item">
							<div>
								<img src="http://p1.music.126.net/sBzD11nforcuh1jdLSgX7g==/18740076185638788.jpg?param=150y150" alt="">
							</div>
						</ranking>
						<ranking :idx="1" class="item">
							<div>
								<img src="http://p1.music.126.net/GhhuF6Ep5Tq9IEvLsyCN7w==/18708190348409091.jpg?param=150y150" alt="">
							</div>
						</ranking>
						<ranking :idx="22" class="item">
							<div>
								<img src="http://p1.music.126.net/vttjtRjL75Q4DEnjRsO8-A==/18752170813539664.jpg?param=150y150" alt="">
							</div>
						</ranking>
						<ranking :idx="7" class="item" @load="loadImage">
							<div>
								<img src="http://p1.music.126.net/H4Y7jxd_zwygcAmPMfwJnQ==/19174383276805159.jpg?param=150y150" alt="">
							</div>
						</ranking>
					</div>
				
			</scroll>
		</div>
	</div>
</template>
<script type="text/javascript">
	import directer from '@/components/part/directer.vue';
	import ranking from '@/components/part/ranking.vue'
	import scroll from "@/base/scroll/scroll2.vue"
	export default {
	    data() {
	        return {

	        }
	    },
	    components: {
	        directer,
	        ranking,
	        scroll
	    },
	    methods: {
	        loadImage() {
	            this.$refs.scroll.refresh()
	        },
	    }
	}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
	.ranking {
		height:90vh;
		overflow:hidden;
	    .title {
	        font-size: 0.6rem;
	        margin: 0.6rem 0.3rem;
	    }
	}
</style>
