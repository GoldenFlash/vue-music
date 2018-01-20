<template>
	<div class="slider" ref="slider">
		<div class="slider-group" ref="sliderGroup">
			<slot></slot>
		</div>
		<div class="dots">
			<span class="dot" v-for="(item,index) in dots" :class="{active:currentPageIndex ===index}"></span>
		</div>
	</div>
</template>
<script type="text/javascript">
	import {addClass} from 'common/js/dom.js';
	import BScroll from 'better-scroll';
	name:'slider';
	export default{
		props:{
			loop:{ //是否循环播放
				type:Boolean,
				default:true,
			},
			autoPlay:{
				type:Boolean,
				default:true,
			},
			interval:{
				type:Number,
				default:4000,
			}
		},
		data(){
			return{
				dots:[], //小圆点
				currentPageIndex:0, //当前播放的index值
			}
		},
		mounted(){

			console.log('slider')
			setTimeout(()=>{
				this._setSliderWidth() //设置轮播总宽度
				this._initDots() //初始化dot
				this._initSlider() //初始化轮播 
				if(this.autoPlay){
					this._play() //自动播放
				}
			},20)
			window.addEventListener('resize',()=>{
				if(!this.slider){
					return;
				}
				this._setSliderWidth(true) //重新设置宽度
				this.slider.refresh()  //刷新轮播
			})
		},
		activated(){
			if(this.autoPlay){
				this._play()
			}
		},
		deactivated(){ //在销毁之前清除计时器
			clearTimeout(this.timer)
		},
		beforeDestroy(){
			clearTimeout(this.timer)
		},
		methods:{
			//设置轮播宽度
			_setSliderWidth(isResize){
				

				this.children = this.$refs.sliderGroup.children
				let width = 0;
				let sliderWidth = this.$refs.slider.clientWidth;
				for(let i=0;i<this.children.length;i++){
					let child = this.children[i];
					addClass(child,'slider-item');
					child.style.width = sliderWidth+'px';
					width +=sliderWidth //得到轮播图的总宽度
				}
				if(this.loop && !isResize){
					width +=2*sliderWidth; 
					// 如果是循环播放，在首尾各多一个，2倍大小
				}
				this.$refs.sliderGroup.style.width = width+'px';
			},
			_initSlider(){
				this.slider = new BScroll(this.$refs.slider,{
				  scrollX: true,      // 横向滚动
		          scrollY: false,
		          momentum: false,
		          snap: true,
		          snapLoop: this.loop,
		          snapThreshold: 0.3,
		          snapSpeed: 400
				});
				this.slider.on('scrollEnd', () => {
		          let pageIndex = this.slider.getCurrentPage().pageX  // 当前轮播序号，应该对首尾进行了处理
		          if (this.loop) {
		            pageIndex -= 1
		          }
		          this.currentPageIndex = pageIndex   // 设置小点激活状态

		          if (this.autoPlay) {    // 继续轮播
		            this._play()
		          }
		        })

		        this.slider.on('beforeScrollStart', () => {   // 解决自动播放与手动滑动的冲突
		          if (this.autoPlay) {
		            clearTimeout(this.timer)
		          }
		        })
		      },
		      _initDots() {
		      	console.log(this.children)
		        this.dots = new Array(this.children.length)  // 就是一个简单的数组
		      },
		      _play() {       // 轮播
		        let pageIndex = this.currentPageIndex + 1
		        if (this.loop) {    // 循环轮播是+2
		          pageIndex += 1
		        }
		        this.timer = setTimeout(() => {
		          this.slider.goToPage(pageIndex, 0, 400)  // 直接去到下一页
		        }, this.interval)
		      }	
		}
	}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
	.slider{
		position:relative;
		min-height:1px;
		overflow:hidden;
		.slider-group{
			position:relative;
			overflow:hidden;
			white-space:nowrap;
			.slider-item{
				float:left;
				box-sizing:border-box;
				overflow:hidden;
				text-align:center;
				a{
					display:block;
					width:100%;
					overflow:hidden;
					text-decoration:none;
					img{
						display:block;
						width:100%;
					}
				}
			}

		}
		.dots{
			position:absolute;
			right:0;
			left:0;
			bottom:12px;
			text-align:center;
			font-size:0;
			.dot{
				display:inline-block;
				margin:0 4px;
				height:8px;
				width:8px;
				border-radius:50%;
				// background-color:rgba(255, 255, 255, 0.5)
				background-color: #fff;
				&.active{
					width:20px;
					border-radius:5px;
					// background-color:rgba(255, 255, 255, 0.8)
				}
			}
		}
	}
</style>