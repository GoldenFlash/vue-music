<template>
  <div id="app">
    <transition :name="transitionName">
      <keep-alive>
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
        this.transitionName = "turn-on";
      } else {
        this.transitionName = "turn-off";
      }
    }
	},
	// methods: {
  //   clickLink() {
  //     this.$store.commit("setTransition", "turn-on");
  //   }
  // },
  // mounted() {
  //   var _this = this;
  //   window.addEventListener(
  //     "popstate",
  //     function(e) {
  //       _this.$store.commit("setTransition", "turn-off");
  //     },
  //     false
  //   );
  // }
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
  
}
#app {
	width:100%
}
.turn-on-enter {
  transform: translate3d(100%, 0, 0);
}
.turn-on-leave-to {
  /* transform: translate3d(-20%, 0, 0); */
}
.turn-on-enter-active,
.turn-on-leave-active {
  transition: transform 0.4s ease;
}
.turn-off-enter {
  /* transform: translate3d(-20%, 0, 0); */
}
.turn-off-leave-to {
  transform: translate3d(100%, 0, 0);
}
.turn-off-enter-active,
.turn-off-leave-active {
  transition: transform 0.4s ease;
}
.turn-off-leave-active {
  z-index: 2;
}


</style>
