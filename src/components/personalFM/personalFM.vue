<template>
	<div>
		<directer><span>私人FM</span></directer>
		<loading v-show="fmList"></loading>
	</div>
</template>
<script type="text/javascript">
import directer from '@/components/part/directer.vue'
import loading from '@/base/loading/loading.vue'
	export default{
		data(){
			return{
				fmList:[],
			}
		},
		components:{
			directer,
			loading
		}
	}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>

</style>