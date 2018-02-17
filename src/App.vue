<template>
	<div id="app">
		<router-view/>
		<div v-if="showPlayer">
			<player></player>
		</div>
	</div>
</template>
<script>
import player from '@/components/player/player-music.vue'
	export default {
	    name: 'app',
	    components:{
	    	player,
	    },
	    computed:{
	    	showPlayer(){
	    		return this.$store.state.showPlayer;
	    	}
	    },
	}
</script>
<style>
	
</style>
