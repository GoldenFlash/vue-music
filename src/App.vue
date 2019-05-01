<template>
  <div id="app">
    <transition :name="transitionName" mode="out-in">
      <keep-alive include="index">
        <router-view/>
      </keep-alive>
    </transition>
  </div>
</template>
<script>
export default {
  name: "app",
  data() {
    return {
      transitionName: ""
    };
  },
  watch: {
    $route(to, from) {
      console.log("routechange", to, from);
      if (to.meta.index > from.meta.index) {
        this.transitionName = "slide-left";
      } else {
        this.transitionName = "slide-right";
      }
    }
  }
};
</script>


<style>
/* 'Chinese Quote', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC',
    'Hiragino Sans GB', 'Microsoft YaHei', 'Helvetica Neue', Helvetica, Arial, sans-serif, 'Apple Color Emoji',
	'Segoe UI Emoji', 'Segoe UI Symbol' */
html,
body {
  font-family: Helvetica, sans-serif;

  margin: 0;
  background-color: #ffffff !important;
  /* width:100%;
		height:100vh;
		overflow: scroll; */
}
#app {
}

.slide-fade{
  position: absolute;left:0;right: 0;
}
.slide-fade-enter-active {
  transition: all 1.2s ease;
}
.slide-fade-leave-active {

  transition: all .1s cubic-bezier(2.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
{
  left:0;right: 0;
  transform: translateX(50px);
  opacity: 0;
}

.slide-left,
.slide-right{
 position: absolute;
	left:0;
	right:0
}
.slide-left-enter-active,
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-leave-active {
  will-change: transform;
  transition: all 400ms ease;
 
}
.slide-right-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
  left: 0;
}
.slide-right-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
  left: 0;
}
.slide-left-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
  right: 0;
}
.slide-left-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
  right: 0;
}
</style>
