<template>
	<div class="player-wrapper">
		<audio :src="songUrl" ref='audio' @ended="songEnd"></audio>
		<div class="wrapper">
			<div class="img">
				<img :src="song.picUrl" alt="">
			</div>
			<div class="detail">
				<div class="name">
					{{song.name}}
				</div>
				<div class="singer">
					{{song.singer}}
				</div>
			</div>
			<div class="player-control">
				<div class="control">
					<div class="play" @click="play">
						<i :class="[playState?'fa-pause-circle-o':'fa-play-circle-o','fa']" aria-hidden="true"></i>
					</div>
				</div>
				<div class="musicDetail" v-show="musicDetail">
					<musicDetail :musiclist="musiclist" :index="index" :playWay="playWay" @showMusicDetail="showMusicDetail" @emitIndex="emitIndex($event)"></musicDetail>
				</div>
			</div>
			<div class="menu">
				<i class="fa fa-list" aria-hidden="true"></i>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
	import {
	    mapState
	} from 'vuex'
	import {
	    getSong
	} from 'api/getSong.js'
	import {
	    getFm
	} from 'api/getFm.js'
	import {
	    fmFormate
	} from 'common/js/musicFormate.js'
	import {
	    formateTime
	} from 'common/js/formateTime.js'
	import {
	    getLyric
	} from 'api/getLyric.js'
	import {
	    formateLyric
	} from 'common/js/formateLyric.js'
	import musicDetail from '@/components/musicDetail/musicDetail.vue'
	export default {
	    data() {
	        return {
	            type: '',
	            songUrl: '',
	            // index: 0,
	            song: {},
	            playState: false,
	            showLyric: false,
	            arrangeLyric: false,
	            progress: 0,
	            duration: 0,
	           
	            lyrics: '',
	            currentLyricIndex: 0,
	            lyricHeight: '',
	            songUrl: '',
	            musiclistLength: 10,
	            musicDetail: false,
	            // playWay:"loop",

	        }
	    },
	    components: {
	        musicDetail,
	    },
	    computed: {
	        ...mapState({
	            musiclist: 'musiclist',
	            index: 'index',
	            playWay: 'playWay',
	            currentTime:'currentTime',
	            volume:'volume',
	        })
	    },

	    methods: {
	        //子组件触发事件函数
	        emitIndex(value) {
	            this.$store.commit("setIndex", value)

	            if (this.musiclist.length) {
	                if (this.index >= this.musiclist.length - 1) {
	                    return
	                }

	                this._getSong();
	                this.clearTimer();
	                this.changeProgress();
	                this._renderLyric();

	            }
	        },
	        //显示歌曲详情
	        showMusicDetail() {
	            this.musicDetail = !this.musicDetail;
	        },
	        //设置播放方式
	        changePlayWay() {
	            if (this.playWay === "loop") {
	                this.$store.commit("setPlayWay", "random");

	            } else if (this.playWay === "random") {
	                this.$store.commit("setPlayWay", "singleLoop");

	            } else if (this.playWay === "singleLoop") {
	                this.$store.commit("setPlayWay", "loop");
	            }
	        },
	        randomPlay() {
	            var randomNumber = Math.floor(Math.random() * this.musiclistLength)
	            if (randomNumber != this.index) {
	                this.$store.commit("setIndex", randomNumber);
	            } else {
	                this.randomPlay();
	            }
	        },
	        loopPlay() {
	            if (this.index < this.musiclistLength - 1) {
	                this.$store.commit("setIndex", "increase");
	            } else {
	                this.$store.commit("setIndex", 0);
	            }
	        },
	        songEnd() {
	            this.initMuiscPlay()
	        },
	        _singleLoop() {
	            this.$store.commit("setIndex", this.index);
	            this.currentLyricIndex = 0;
	        },
	        _playWay(value) {

	            if (!value) {
	                if (this.playWay === "random") {
	                    this.randomPlay();

	                } else if (this.playWay === "loop") {
	                    this.loopPlay();

	                } else if (this.playWay === "singleLoop") {
	                    this._singleLoop();
	                }
	            }else if(value==="next"){
	            	this.loopPlay();
	            }
	        },

	        //改变进度条
	        setProgress($event) {
	            var pageX = $event.changedTouches[0].pageX;
	            var offsetLeft = this.$refs.process.offsetLeft;
	            var offsetWidth = this.$refs.process.offsetWidth;
	            var length = pageX - offsetLeft;
	            if (length > offsetWidth) {
	                return
	            };
	            var percent = (length * 100) / offsetWidth;
	            this.$refs.process.querySelector('.process-inner').style.width = percent + "%";
	            var secondTime = this.originDuration * percent / 100
	            this.currentTime = formateTime(secondTime)

	        },
	        //清楚定时器
	        clearTimer() {
	            clearInterval(this.timer);
	            clearInterval(this.setCurrentTime);
	           
	        },
	        // 设置歌曲进度
	        // changeProgress() {
	        //     this.$nextTick(() => {
	        //         if (this.$refs.audio) {
	        //             this.timer = setInterval(() => {
	        //                 this.progress = (this.$refs.audio.currentTime) * 100 / this.originDuration;
	        //                 this.$refs.progress.querySelector('.process-outer .process-inner').style.width = this.progress + "%";

	        //             }, 200)
	        //             this.setCurrentTime = setInterval(() => {
	        //                 this.currentTime = formateTime(this.$refs.audio.currentTime);
	        //             }, 980)

	        //             setTimeout(() => {
	        //                 this.duration = formateTime(this.$refs.audio.duration);
	        //                 //保存原格式的duration
	        //                 this.originDuration = this.$refs.audio.duration;
	        //             }, 1000)
	        //         };

	        //     });
	        // },
	      
	        // 播放暂停按钮
	        play() {

	            if (this.playState) {
	                this.playState = !this.playState;
	                this.$refs.audio.pause()
	                this.clearTimer();
	            } else {
	                this.playState = !this.playState;
	                this.$refs.audio.play();
	                // this.changeProgress();

	                // this._renderLyric();


	            }
	        },
	        //播放下一首
	        next() {
	           this.initMuiscPlay("next")
	        },
	        //播放上一首
	        previous() {
	            this.$store.commit("setIndex", "decrease")
	            // this._getSong();
	        },
	        initMuiscPlay(value){
	        	 if (this.musiclist.length) {
	                if (this.index >= this.musiclist.length - 1) {
	                    return
	                }
	                this._playWay(value);
	               
	                this.clearTimer();
	                // this.changeProgress();
	            }
	        },
	 
	   
	     
	        // 获取歌词
	        _getSong() {

	            if (this.musiclist.length) {
	                var index = this.index;
	                this.song = this.musiclist[index]
	                var id = this.song.id;
	                this.songUrl = `http://music.163.com/song/media/outer/url?id=${id}.mp3`
	                
	                if (this.playState) {

	                    this.$nextTick(() => {
	                        this.$refs.audio.loop = this.singleLoop;
	                        this.$refs.audio.play();
	                    })
	                }
	            }

	        },
	       
	       
	        // 刷新跳转
	        refresh() {
	            if (!this.$store.state.musiclist.length) {
	                this.$router.push({
	                    path: '/index'
	                })
	            }
	        }
	    },


	    mounted() {

	        //初始化音乐
	        this._getSong();
	        this.$nextTick(() => {
	        	this.$refs.audio.currentTime = this.currentTime;
	        	this.$refs.audio.volume = this.volume;
	            this.play();
	        });
	        this.clearTimer();
	    },

	}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
	.player-wrapper {
		
	}
</style>
