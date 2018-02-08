<template>
	<div class="player-wrapper">
		<audio :src="songUrl" ref='audio' @ended="songEnd"></audio>
		<div class="title">
			<div class="icongo" @click="goHistory">
				<i class="fa fa-arrow-left" aria-hidden="true"></i>
			</div>
			<div class="detail">
				<div class="songName">{{song.name}}</div>
				<div class="singerName">{{song.singer}}</div>
			</div>
		</div>
		<div class="content" @click="_showLyric">
			<div class="content-wrapper" v-show="!showLyric">
				<div class="img">
					<img :src="song.picUrl" alt="">
				</div>
				<div class="personal-function">
					<div class="icon">
						<div class="like">
							<i class="fa fa-heart-o" aria-hidden="true"></i>
						</div>
						<div class="download">
							<i class="fa fa-download" aria-hidden="true"></i>
						</div>
						<div class="comment">
							<i class="fa fa-commenting-o" aria-hidden="true"></i>
						</div>
					</div>
				</div>
			</div>
			<div class="lyric-wrapper" v-show="showLyric">
				<div class="voice">
					<div class="icon">
						<i class="fa fa-volume-up"></i>
					</div>
					<div class="bar" ref="voice" @touchstart="vtouchstart($event)" @touchmove="vtouchmove($event)" @click.stop>
						<div class="bar-outer">
							<div class="bar-inner"></div>
						</div>
					</div>
				</div>
				<div class="lyric" v-if="lyrics.length">
					<div v-if='typeof(lyrics)==="object"'>
						<ul ref="lyric" class="item-wrapper">
							<li v-for="(value,index) in lyrics" :data-time="value.time" :class='[{"active":currentLyricIndex===index},"item"]'>
								{{value.text}}
							</li>
						</ul>
					</div>
					<div v-show='typeof(lyrics)==="string"' class="item-wrapper">
						<div class="nolyric">
							{{lyrics}}
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="player-control">
			<div class="process" ref="progress">
				<div class="time-wrapper">
					<span class="time" v-show="currentTime">{{currentTime}}</span>
				</div>
				<div class="process-wrapper" @touchstart="ptouchstart($event)" @touchend="ptouchend($event)" @touchmove="ptouchmove($event)">
					<div class="process-outer" ref="process">
						<div class="process-inner"></div>
					</div>
				</div>
				<div class="time-wrapper">
					<span class="time" v-show="duration">{{duration}}</span>
				</div>
			</div>
			<div class="control">
				<div class="loop">
					<i :class='[{"fa-random":playWay==="random", "fa-repeat":playWay==="loop", "fa-superpowers":playWay==="singleLoop"}, "fa"]' @click.stop="changePlayWay">
					</i>
				</div>
				<div class="previous" @click="previous">
					<i class="fa fa-step-backward" aria-hidden="true"></i>
				</div>
				<div class="play" @click="play">
					<i :class="[playState?'fa-pause-circle-o':'fa-play-circle-o','fa']" aria-hidden="true"></i>
				</div>
				<div class="next" @click="next">
					<i class="fa fa-step-forward" aria-hidden="true"></i>
				</div>
				<div class="list" @click="showMusicDetail">
					<i class="fa fa-sliders" aria-hidden="true"></i>
				</div>
			</div>
		</div>
		<div class="musicDetail" v-show="musicDetail">
			<musicDetail :musiclist="musiclist" :index="index" :playWay="playWay" @showMusicDetail="showMusicDetail" @emitIndex="emitIndex($event)"></musicDetail>
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
	            currentTime: 0,
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
	            // currentTime:'currentTime',
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

	        //调整音量
	        vtouchstart($event) {
	            this.setvoice($event)
	        },
	        vtouchmove($event) {
	            this.setvoice($event)
	        },
	        initvolume() {
	            var barInner = this.$refs.voice.querySelector(".bar-outer .bar-inner")
	            var volume = 0.3;
	            this.$refs.audio.volume = volume;

	            barInner.style.width = volume * 100 + "%";
	        },
	        setvoice($event) {

	            var barOuter = this.$refs.voice.querySelector(".bar-outer")
	            var voice = this.$refs.voice.querySelector(".bar-outer .bar-inner")
	            var pageX = $event.changedTouches[0].pageX;
	            var offsetWidth = barOuter.offsetWidth;
	            var offsetLeft = barOuter.offsetLeft;
	            voice.style.width = (pageX - offsetLeft) * 100 / offsetWidth + "%";
	            var volume = (pageX - offsetLeft) / offsetWidth;
	            if (volume >= 0 && volume <= 1) {
	                this.$refs.audio.volume = volume;
	            }
	        },
	        //点击进度条调整歌曲进度
	        ptouchstart($event) {
	            this.clearTimer();
	            this.setProgress($event);
	        },
	        ptouchmove($event) {
	            this.setProgress($event)
	        },
	        ptouchend($event) {

	            var pageX = $event.changedTouches[0].pageX;
	            var offsetLeft = this.$refs.process.offsetLeft;
	            var offsetWidth = this.$refs.process.offsetWidth;
	            var length = pageX - offsetLeft;

	            var percent = length / offsetWidth;
	            this.$refs.audio.currentTime = this.originDuration * percent;
	            this.changeProgress();
	            this._renderLyric();

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
	            clearInterval(this.lyricTimer);
	        },
	        // 设置歌曲进度
	        changeProgress() {
	            this.$nextTick(() => {
	                if (this.$refs.audio) {
	                    this.timer = setInterval(() => {
	                        this.progress = (this.$refs.audio.currentTime) * 100 / this.originDuration;
	                        this.$refs.progress.querySelector('.process-outer .process-inner').style.width = this.progress + "%";

	                    }, 200)
	                    this.setCurrentTime = setInterval(() => {
	                        this.currentTime = formateTime(this.$refs.audio.currentTime);
	                    }, 980)

	                    setTimeout(() => {
	                        this.duration = formateTime(this.$refs.audio.duration);
	                        //保存原格式的duration
	                        this.originDuration = this.$refs.audio.duration;
	                    }, 1000)
	                };

	            });
	        },
	        //控制歌词显隐藏
	        _showLyric() {
	            this.arrangeLyric = !this.arrangeLyric;
	            this._renderLyric();
	            this.showLyric = !this.showLyric;
	        },
	        // 播放暂停按钮
	        play() {

	            if (this.playState) {
	                this.playState = !this.playState;
	                this.$refs.audio.pause()
	                this.clearTimer();
	            } else {
	                this.playState = !this.playState;
	                this.$refs.audio.play();
	                this.changeProgress();

	                this._renderLyric();


	            }
	        },
	        //播放下一首
	        next() {
	           this.initMuiscPlay("next")
	        },
	        //播放上一首
	        previous() {
	            this.$store.commit("setIndex", "decrease")
	            this._getSong();
	        },
	        initMuiscPlay(value){
	        	 if (this.musiclist.length) {
	                if (this.index >= this.musiclist.length - 1) {
	                    return
	                }
	                this._playWay(value);
	                this._getSong();
	                this.setFirstLyricLine();
	                this.clearTimer();
	                this.changeProgress();
	                this._renderLyric();
	               

	            }
	        },
	        //设置第一行歌词显示的位置
	        setFirstLyricLine() {
	            if (this.lyricHeight) {
	                this.$refs.lyric.style.top = -this.lyricHeight * (this.currentLyricIndex - 2) + "px";
	            }
	        },
	        //获取歌词
	        _getLyric() {
	            if (this.musiclist.length) {
	                var index = this.index;
	                this.currentLyricIndex = 0;
	                this.song = this.musiclist[index]
	                var id = this.song.id;
	                getLyric(id).then((res) => {

	                    if (res.data.code === 200) {
	                        if (res.data.nolyric) {
	                            this.lyrics = "纯音乐请欣赏"
	                        } else if (res.data.uncollected) {
	                            this.lyrics = "暂无歌词"
	                        } else {
	                            var lyrics = formateLyric(res.data.lrc.lyric)
	                            this.lyrics = lyrics;
	                            this.$nextTick(() => {
	                                this.renderLyric();
	                            });
	                        }

	                    }

	                });
	            };
	        },
	        // 歌词显示控制
	        _renderLyric() {

	            if (this.arrangeLyric && this.lyrics.length && typeof(this.lyrics) === "object") {
	                this.$nextTick(() => {
	                    this.lyricTimer = setInterval(this.renderLyric, 500);
	                })
	            } else {
	                clearInterval(this.lyricTimer)
	            }
	        },
	        // 歌词显示方式
	        renderLyric() {


	            var length = this.lyrics.length;
	            var lyricDom = this.$refs.lyric.children;
	            //设置第一行歌词高度

	            if (!this.lyricHeight) {
	                this.lyricHeight = lyricDom[0].offsetHeight;

	            }


	            for (var i = 0; i < length - 1; i++) {

	                var curT = lyricDom[i].getAttribute("data-time");

	                var nexT = lyricDom[i + 1].getAttribute("data-time");

	                var curTime = this.$refs.audio.currentTime;
	                if ((curTime > curT) && (curT < nexT)) {
	                    this.currentLyricIndex = i;

	                    if (this.lyricHeight) {
	                        this.$refs.lyric.style.top = -this.lyricHeight * (i - 2) + "px";
	                    }
	                };
	            };
	        },
	        // 获取歌词
	        _getSong() {

	            if (this.musiclist.length) {
	                var index = this.index;
	                this.song = this.musiclist[index]
	                var id = this.song.id;
	                this.songUrl = `http://music.163.com/song/media/outer/url?id=${id}.mp3`
	                this._getLyric();
	                if (this.playState) {

	                    this.$nextTick(() => {
	                        this.$refs.audio.loop = this.singleLoop;
	                        this.$refs.audio.play();
	                    })
	                }
	            }

	        },
	        // 添加fm列表
	        addFm() {

	            if (this.index === this.musiclist.length - 1) {
	                getFm().then((res) => {
	                    if (res.data.code === 200) {
	                        var data = res.data.data;
	                        data = fmFormate(data);
	                        this.$store.commit('addMusiclist', data);
	                    }
	                })
	            }

	        },
	        //回到上一页
	        goHistory() {
	            this.clearTimer();
	            this.$router.go(-1);
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
	    created() {

	        this.refresh();

	    },

	    mounted() {
	        //初始化路由参数
	        // this.type = this.$route.query.type;
	        // this.index = this.$route.query.index;
	        // this.musiclistLength = this.musiclist.length;

	        // if( this.$route.query.singleLoop){
	        // 	this.playWay = this.$route.query.singleLoop;
	        // };
	        //初始化音乐
	        this._getSong();
	        this.$nextTick(() => {
	            this.play();
	        });

	        this.clearTimer();
	        // 初始化音量
	        this.initvolume();


	    },

	}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
	.player-wrapper {
	    position: absolute;
	    background-color: rgba(53, 53, 53, 0.8);
	    left: 0;
	    top: 0;
	    right: 0;
	    bottom: 0;
	    .title {
	        font-size: 1rem;
	        margin-top: 1rem;
	        margin-left: 0.5rem;
	        display: flex;
	        .icongo {
	            color: #c0c0c0;
	            vertical-align: middle; // display: inline-block;
	        }
	        .detail {
	            vertical-align: middle;
	            white-space: nowrap;
	            overflow: hidden;
	            text-overflow: ellipsis;
	            text-align: left;
	            margin-left: 0.6rem;

	            .songName {
	                font-size: 0.6rem;
	                color: #eee
	            }
	            .singerName {
	                margin-top: 0.4rem;
	                font-size: 0.4rem;
	                color: rgb(167, 166, 166)
	            }
	        }
	    }
	    .content {
	        height: 14rem;
	        padding: 0.2rem 0.6rem;
	        overflow: hidden;
	        .content-wrapper {
	            height: 11rem;
	            .img {
	                width: 6.5rem;
	                margin: 1.2rem auto;

	                border: solid #1B1A1A 1.5rem;
	                height: 6.5rem;
	                border-radius: 50%;
	                img {
	                    border-radius: 50%;
	                    width: 100%;
	                    height: 100%
	                }
	            }
	            .personal-function {
	                padding-top: 0.8rem;
	                .icon {
	                    width: 60%;
	                    margin: 0 auto;
	                    display: flex;
	                    font-size: 0.8rem;
	                    color: #FFFFFF;
	                    justify-content: center space-between;
	                    .like, .download, .comment {
	                        flex: 1;
	                        text-align: center;
	                        padding: 0.2rem 0;
	                    }
	                }
	            }
	        }
	        .lyric-wrapper {
	            text-align: center;
	            .voice {
	                text-align: center;
	                .icon {
	                    display: inline-block;
	                    font-size: 0.8rem;
	                    vertical-align: middle;
	                    color: rgb(192, 192, 192);
	                }
	                .bar {
	                    vertical-align: middle;
	                    display: inline-block;
	                    width: 80%;
	                    margin-left: 0.8rem;
	                    padding: 0.5rem 0;
	                    .bar-outer {
	                        height: 3px;
	                        width: 100%;
	                        background-color: rgba(167, 166, 166, 0.5);

	                        .bar-inner {
	                            height: 3px;
	                            width: 0;
	                            background-color: rgba(171, 184, 179, 0.9);
	                            position: relative;
	                            &:after {
	                                content: '';
	                                display: inline-block;
	                                width: 0px;
	                                height: 0px;
	                                border: solid #FFFFFF 4px;
	                                border-radius: 50%;
	                                position: absolute;
	                                right: 0;
	                                top: -2px;
	                            }
	                        }
	                    }
	                }
	            }
	            .lyric {
	                overflow: hidden;
	                position: relative;
	                height: 13.5rem;
	                .slide-fade-enter-active {
	                    transition: all .3s ease;
	                }
	                .slide-fade-leave-active {
	                    transition: all .8s;
	                }
	                .slide-fade-enter, .slide-fade-leave-to
	                /* .slide-fade-leave-active for below version 2.1.8 */
	                {
	                    transform: translateX(10px);
	                }
	                .item-wrapper {
	                    width: 100%;
	                    position: absolute;
	                    top: 3.6rem;

	                    .item {
	                        width: 100%;
	                        box-sizing: border-box;
	                        height: 1.8rem;

	                        text-align: center;

	                        font-size: 0.6rem;
	                        color: rgb(200, 200, 200)
	                    }
	                    .active {
	                        color: #FFFFFF;
	                    }
	                    .nolyric {
	                        font-size: 0.8rem;
	                        color: #FFFFFF;
	                    }
	                }
	            }
	        }
	    }
	    .player-control {
	        .control {
	            color: #eee;
	            display: flex;
	            font-size: 1rem;
	            justify-content: space-between;
	            align-items: center;
	            padding: 0 0.5rem;
	            margin-top: 0.8rem;
	            .play {
	                font-size: 1.5rem;
	            }
	            .play, .next, .previous, .loop, .list {
	                padding: 0.2rem;
	                flex: 1;
	                text-align: center;
	            }
	        }
	        .process {
	            text-align: center;
	            margin-top: 10px;
	            .time-wrapper {
	                display: inline-block;
	                width: 12%;
	                .time {
	                    color: rgb(200, 200, 200);
	                    vertical-align: middle;
	                }
	            }
	            .process-wrapper {
	                vertical-align: middle;
	                padding: 10px 0;
	                margin: 0 0.5rem;
	                height: 3px;
	                width: 60%;
	                display: inline-block;
	                .process-outer {
	                    height: 3px;
	                    width: 100%;
	                    background-color: rgb(167, 166, 166);
	                    text-align: left;
	                    .process-inner {
	                        height: 3px;
	                        width: 0; // display:inline-block;
	                        background-color: #c70c0c;
	                        position: relative;
	                        &:after {
	                            content: '';
	                            width: 4px;
	                            height: 4px;
	                            display: inline-block;
	                            border: solid #FFFFFF 6px;
	                            border-radius: 50%;
	                            position: absolute;
	                            right: 0;
	                            top: -6px;
	                            background-color: #c70c0c;
	                        }
	                    }
	                }
	            }
	        }
	    }
	}
</style>
