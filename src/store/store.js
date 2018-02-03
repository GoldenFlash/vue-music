import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
	state:{
		musiclist:[],
	},
	mutations:{
		setMusiclist(state,value){
			state.musiclist = value
		},
		addMusiclist(state,value){
			value.forEach((item)=>{
				state.musiclist.push(item)
			})
			
		}
	}
})