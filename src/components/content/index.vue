<template>
	<div class="onlineMusic">
		<v-header></v-header>
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
		<!-- <div class="footer">
			<v-footer></v-footer>
		</div> -->
	</div>
</template>
<script type="text/javascript">
	import vHeader from '@/components/part/header.vue'
	import vFooter from '@/components/part/footer.vue'
	export default {
	    data() {
	        return {
	            current: 'MusicClassify',
	        }
	    },
	    components: {
	        scroll,
	        vHeader,
	        vFooter
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
<style lang="scss" rel="stylesheet/scss" scoped>
	@import '../../common/style/variable.scss';
	.onlineMusic-options {
	    width: 100%;
	    display: flex;
	    box-sizing: border-box;
	    margin-top: 0.3rem;
	    padding: 0 0.6rem;
	    justify-content: space-around;
	    color: #666666;
	    .current {
	        color: rgb(211, 58, 49);

	        border-bottom: solid rgb(211, 58, 49) 2px;
	    }
	    &>span {
	        text-align: center;
	        padding: 0.3rem 0.4rem; // margin: 0rem 1rem;
	        font-size: 0.6rem
	    }
	    .footer {
	        // position: fixed;
	        // bottom: 0;
	        width: 100%;
	        height: 100px;
	        overflow: hidden;
	    }
	}
</style>
