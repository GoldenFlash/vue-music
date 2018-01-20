<template>
	<div class="onlineMusic">
		<div class="onlineMusic-options">
			<span @click="goMusicClassify" :class="{'current':current==='MusicClassify'}
">音乐</span>
			<span @click="goMusicVideo" :class="{'current':current==='MusicVideo'}">视频</span>
			<span @click="goMusicRadio" :class="{'current':current==='MusicRadio'}">电台</span>
		</div>
		<keep-alive>
			<!-- 利用缓存 -->
			<router-view></router-view>
		</keep-alive>
	</div>
</template>
<script type="text/javascript">

	export default {
	    data() {
	        return {
	            current: 'MusicClassify',
	        }
	    },
	    components:{
	    	scroll
	    },
	    methods: {
	        goMusicClassify() {
	            this.$router.push('/index/musicClassify');
	            this.current = 'MusicClassify';
	        },
	        goMusicVideo() {
	            this.$router.push('/index/musicClassify');
	            this.current = 'MusicVideo';
	        },
	        goMusicRadio() {
	            this.$router.push('/index/musicClassify');
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
	        font-size: 0.6rem
	    }
	}
</style>
