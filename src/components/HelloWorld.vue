<template>
  <div>
    <button>click</button>
    <scroll>
    <div class="hello">
      1231231231211111111111111111111111111111111111111111111111111111111111111
      111111111
      1
      1
      1
      1
      1
      1
      1
      1
      1
      1
      1
      
    </div>
  </scroll>
  </div>
</template>
<script>
  import scroll from 'base/scroll/scroll2.vue';
  export default {
      name: 'HelloWorld',
      data() {
          return {
              msg: 'Welcome to Your Vue.js App'
          }
      },
      components: {
          scroll
      }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss">
  .hello {
    height:1000px;
      background-color: yellow;
      border:solid blue 1px .title {
          color: red
      }
  }
</style>
