<template>
	<div class="player-wrapper">
		<audio :src="songUrl" ref='audio' @ended="next"></audio>
		<div class="title">
			<div class="icongo" @click="goHistory">
				<i class="fa fa-arrow-left" aria-hidden="true"></i>
			</div>
			<div class="iconfm">
				<div>
					<i class="fa fa-cc" aria-hidden="true"></i>
				</div>
				<span class="name">私人fm</span>
			</div>
		</div>
		<div class="content" @click="_showLyric">
			<div class="content-wrapper" v-show="!showLyric">
				<div class="img">
					<img :src="song.picUrl" alt="">
				</div>
				<div class="detail">
					<div class="songName">{{song.name}}</div>
					<div class="singerName">{{song.singer}}</div>
				</div>
			</div>
			<div class="lyric-wrapper" v-show="showLyric">
				<div class="voice">
					<div class="icon">
						<i class="fa fa-volume-up"></i>
					</div>
					<div class="bar" ref = "voice" 
						@touchstart = "vtouchstart($event)"
						@touchmove = "vtouchmove($event)"
						@click.stop
						>
						<div class="bar-outer">
							<div class="bar-inner"></div>
						</div>
					</div>
				</div>
				<div class="lyric" v-if="lyrics.length">
					<div v-show='typeof(lyrics)==="object"'>
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
				<div class="time-wrapper"><span class="time" v-show="currentTime">{{currentTime}}</span></div>
				<div class="process-wrapper" @touchstart="ptouchstart($event)" @touchend="ptouchend($event)" @touchmove="ptouchmove($event)" >
					<div class="process-outer" ref = "process" >
						<div class="process-inner"></div>
					</div>
				</div>
				<div class="time-wrapper"><span class="time" v-show="duration">{{duration}}</span></div>
			</div>
			<div class="control">
				<div class="delete">
					<i class="fa fa-trash-o" aria-hidden="true"></i>
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
				<div class="comment">
					<i class="fa fa-commenting-o" aria-hidden="true"></i>
				</div>
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

	export default {
	    data() {
	        return {
	            type: '',
	            songUrl: '',
	            index: 0,
	            song: {},
	            playState: false,
	            showLyric: false,
	            arrangeLyric:false,
	            progress: 0,
	            duration: 0,
	            currentTime: 0,
	            lyrics: '',
	            currentLyricIndex:0,
	            lyricHeight:'',
	            songUrl:'',
	        }
	    },
	    computed: {
	        ...mapState({
	            musiclist: 'musiclist'
	        })
	    },

	    methods: {
	    	vtouchstart($event){
	    		this.setvoice($event)
	    	},
	    	vtouchmove($event){
	    		this.setvoice($event)
	    	},
	    	initvolume(){
	    		var barInner = this.$refs.voice.querySelector(".bar-outer .bar-inner")
	    		var volume = this.$refs.audio.volume;
	    		volume = 0.1;
	    		barInner.style.width = volume*100+"%";
	    	},
	    	setvoice($event){
	    		
	    		var barOuter = this.$refs.voice.querySelector(".bar-outer")
	    		var voice = this.$refs.voice.querySelector(".bar-outer .bar-inner")
	    		var pageX = $event.changedTouches[0].pageX;
	    		var offsetWidth = barOuter.offsetWidth;
	    		var offsetLeft = barOuter.offsetLeft;
	    		voice.style.width = (pageX - offsetLeft)*100/offsetWidth+"%";
	    		var volume = (pageX - offsetLeft)/offsetWidth;
	    		if(volume>=0 && volume<=1){
	    			this.$refs.audio.volume = volume;
	    		}
	    	},
	    	//点击进度条调整歌曲进度
	    	ptouchstart($event){
	    		this.clearTimer();
	    		this.setProgress($event);
	    	},
	    	ptouchmove($event){
	    		this.setProgress($event)
	    	},
	    	ptouchend($event){
	    		
	    		var pageX = $event.changedTouches[0].pageX;
	    		var offsetLeft = this.$refs.process.offsetLeft;
	    		var offsetWidth = this.$refs.process.offsetWidth;
	    		var length = pageX-offsetLeft;
	    		
	    		var percent = length/offsetWidth;
	    		this.$refs.audio.currentTime = this.originDuration*percent;
	    		this.changeProgress();
	    		this._renderLyric();

	    	},
	    	setProgress($event){
	    		var pageX = $event.changedTouches[0].pageX;
	    		var offsetLeft = this.$refs.process.offsetLeft;
	    		var offsetWidth = this.$refs.process.offsetWidth;
	    		var length = pageX-offsetLeft;
	    		if(length>offsetWidth){
	    			return
	    		};
	    		var percent = (length*100)/offsetWidth;
	    		this.$refs.process.querySelector('.process-inner').style.width = percent+"%";
	    		var secondTime = this.originDuration*percent/100
	    		this.currentTime = formateTime(secondTime)
	    		
	    	},
	        clearTimer() {
	            clearInterval(this.timer);
	            clearInterval(this.setCurrentTime);
	            clearInterval(this.lyricTimer);
	        },
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
	        _showLyric() {
	        	this.arrangeLyric = !this.arrangeLyric;
	            this._renderLyric();
	            this.showLyric = !this.showLyric;
	        },
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
	        next() {
	            if (this.musiclist.length) {
	                if (this.index >= this.musiclist.length) {
	                    return
	                }
	                this.index++;
	                this._getSong();
	                this.clearTimer();
	                this.changeProgress();
	                this._renderLyric();
	                if (this.type === 'fm') {
	                    this.addFm();
	                }

	            }
	        },
	        previous() {
	            this.index--;
	            this._getSong();
	        },

	        _getLyric() {
	            if (this.musiclist.length) {
	                var index = this.index;
	                this.currentLyricIndex = 0;
	                this.song = this.musiclist[index]
	                var id = this.song.id;
	                getLyric(id).then((res) => {
	                    
	                   if(res.data.code ===200){
		                   	if(res.data.nolyric){
		                   		this.lyric = "纯音乐请欣赏"
		                   	}else{
		                   		var lyrics = formateLyric(res.data.lrc.lyric)
			                    this.lyrics = lyrics;
			                    this.$nextTick(()=>{
			                   	this.renderLyric();
			                   	});
		                   	};
	                   	 	
	                   };

	                });
	            };
	        },
	        _renderLyric(){
	        	if(this.arrangeLyric && this.lyrics.length && typeof(this.lyrics)==="object"){
		        	this.$nextTick(()=>{
		        		this.lyricTimer = setInterval(this.renderLyric,500);
		        	})
	        	}else{
	        		clearInterval(this.lyricTimer)
	        	}
	        },
	        renderLyric() {
	            
	           
	            var length = this.lyrics.length;
	            var lyricDom = this.$refs.lyric.children;
	           //设置第一行歌词高度

	        	if(!this.lyricHeight){
	        		this.lyricHeight = lyricDom[0].offsetHeight;
	        		
	        	}
	        	
	        	
	            for (var  i = 0; i < length-1; i++){
	                
                	var curT = lyricDom[i].getAttribute("data-time");
                	
                	var nexT = lyricDom[i + 1].getAttribute("data-time");
                	
                	var curTime = this.$refs.audio.currentTime;
               		 if ((curTime > curT) && (curT < nexT)) { 
               		 	this.currentLyricIndex = i;
               		 	
		                if(this.lyricHeight){
		                	this.$refs.lyric.style.top = -this.lyricHeight*(i-2) + "px";  
		                }   
               	 	};
	            };
	        },
	        _getSong() {
	            
	            	if (this.musiclist.length) {
		                var index = this.index;
		                this.song = this.musiclist[index]
		                var id = this.song.id;
		                this.songUrl = `http://music.163.com/song/media/outer/url?id=${id}.mp3`
		                this._getLyric();
		                if (this.playState) {

		                    this.$nextTick(() => {
		                        this.$refs.audio.play();
		                    })
		                }
		            }
	            
	        },
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
	        goHistory() {
	            this.clearTimer();
	            this.$router.go(-1);
	        },
	        refresh(){
		        if(!this.$store.state.musiclist.length){
		       		this.$router.push({
		       			path:'/index'
		       		})
		        }
	        }
	    },
	    created() {
	    	
	       	this.refresh();
	      
	    },

	    mounted() {

	        this.type = this.$route.query.type;
	        this._getSong();
	        this.$nextTick(() => {
	            this.play();
	        });
	        this.clearTimer();  
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
	        .icongo {
	            color: #c0c0c0;
	            vertical-align: middle;
	            display: inline-block;
	        }
	        .iconfm {
	            vertical-align: top;
	            font-size: 0.9rem;
	            color: #c0c0c0;
	            margin-left: 35%;
	            display: inline-block;
	            .name {
	                margin-top: -0.3rem;
	                font-size: 0.5rem;
	            }
	            .fa {
	                transform: translateX(0.2rem)
	            }
	        }
	    }
	    .content {
	        height: 13.5rem;
	        padding: 0.2rem 0.6rem;
	        overflow: hidden;
	        .content-wrapper {
	            .img {
	            	margin:0 auto;
	                    width: 10rem;
	                    height: 10rem;
	                img {
	                	width:100%;
	                }
	            }
	            .detail {
	                text-align: center;
	                margin-top: 0.6rem;
	                .songName {
	                    font-size: 0.8rem;
	                    color: #eee
	                }
	                .singerName {
	                    margin-top: 0.4rem;
	                    font-size: 0.6rem;
	                    color: rgb(167, 166, 166)
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
	                	vertical-align:middle;
	                    display: inline-block;
	                    width: 80%;
	                    margin-left: 0.8rem;
	                    padding:0.5rem 0;
	                    .bar-outer {
	                        height: 3px;
	                        width: 100%;
	                        background-color: rgba(167, 166, 166, 0.5);
	                        
	                        .bar-inner {
	                            height: 3px;
	                            width:0;
	                            background-color: rgba(171, 184, 179, 0.9);
	                            position:relative;
	                            &:after{
	                            	content:'';
	                            	display:inline-block;
	                            	width:0px;
	                            	height:0px;
	                            	border:solid #FFFFFF 4px ;
									border-radius:50%;
									position:absolute;
									right:0;
									top:-2px;
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
	                    top:3.6rem ;

	                    .item {
	                        width: 100%;
	                        box-sizing:border-box;
	                        height:1.8rem;

	                        text-align: center;
	                        
	                        font-size: 0.6rem;
	                        color: rgb(200, 200, 200)
	                    }
	                    .active {
	                        color: #FFFFFF;
	                    }
	                     .nolyric{
	                    	font-size:0.8rem;
	                    	color:#FFFFFF;
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
	            .play, .next, .previous, .delete, .comment {
	                padding: 0.2rem;
	                flex:1;
	                text-align:center;
	            }
	        }
	        .process {
	            text-align: center;
	            margin-top:10px;
	            .time-wrapper{
	            	display:inline-block;
	            	width:12%;
	            	.time {
		                color: rgb(200, 200, 200);
		                vertical-align:middle;
		            }
	            }
	            .process-wrapper{
	            	vertical-align:middle;
	            	padding:10px 0;
	            	margin: 0 0.5rem;
	            	height: 3px;
	            	width:60%;
	            	display: inline-block;
	            	.process-outer {
		                height: 3px;
		                width: 100%;
		                background-color: rgb(167, 166, 166);
		                text-align:left;
		                .process-inner {
		                    height: 3px;
		                    width: 0;
		                    // display:inline-block;
		                    background-color: #c70c0c;
		                   position:relative;
		                    &:after{
		                    	content:'';
		                    	width:4px;
		                    	height:4px;
		                    	display:inline-block;
		                    	border:solid #FFFFFF 6px;
		                    	border-radius:50%;
								position:absolute;
								right:0;
								top:-6px;
								background-color:#c70c0c;
		                    }
		                }

		            }
	            }
	        }
	    }
	}
</style>
