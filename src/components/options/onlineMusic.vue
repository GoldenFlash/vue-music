<template>
	<div class="onlineMusic">
		<div class="onlineMusic-options">
			<span @click="goMusicClassify" :class="{'current':current==='MusicClassify'}
">音乐</span>
			<span @click="goMusicVideo" :class="{'current':current==='MusicVideo'}">视频</span>
			<span @click="goMusicRadio" :class="{'current':current==='MusicRadio'}">电台</span>
		</div>
		<router-view></router-view>
	</div>
</template>
<script type="text/javascript">
	export default {
	    data() {
	        return {
	            current: 'MusicClassify',
	        }
	    },
	    methods: {
	        goMusicClassify() {
	            this.$router.push('/onlineMusic/musicClassify');
	            this.current = 'MusicClassify';
	        },
	        goMusicVideo() {
	            this.$router.push('/onlineMusic/musicClassify');
	            this.current = 'MusicVideo';
	        },
	        goMusicRadio() {
	            this.$router.push('/onlineMusic/musicClassify');
	            this.current = 'MusicRadio';
	        },
	    },
	    mounted() {

	    }
	}
</script>
<style lang="scss" rel="stylesheet/scss">
	@import '../../common/style/variable.scss';
	.onlineMusic-options {
	    text-align: center;
	    margin-top: 0.3rem;
	    color: #666666;
	    .current {
	        color: rgb(211, 58, 49);

	        border-bottom: solid rgb(211, 58, 49) 2px;
	    }
	    &>span {
	        display: inline-block;
	        padding: 0.3rem 0.4rem;
	        margin: 0rem 1rem;
	        font-size: $font-size-large
	    }
	}
</style>
