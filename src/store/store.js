import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
	state:{
		musiclist:[],
		index:0,
		playWay:'loop',
		musicOptions:'MusicClassify',
		showPlayer:false,
	},
	mutations:{
		setVolume(state,value){
			state.volume = value;
		},
		setCurrentTime(state,value){
			state.currentTime = value;
		},
		
		setShowPlayer(state,value){
			state.showPlayer = value;
			
		},
		setMusicOptions(state,value){
			state.musicOptions = value;
		},
		setMusiclist(state,value){
			state.musiclist = value
		},
		addMusiclist(state,value){
			value.forEach((item)=>{
				state.musiclist.push(item)
			})	
		},
		deleteSongs(state,value){
			state.musiclist.splice(value,1)	
		},
		setIndex(state,value){
			if(value==="increase"){	
				state.index++;
			}else if(value==="decrease"){
				if(state.index>0){
					state.index--;
				}
			}else{
				state.index = value;
			}
		},
		setPlayWay(state,value){
			state.playWay = value;
		}
	}
})