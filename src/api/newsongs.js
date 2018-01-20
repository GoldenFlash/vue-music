import axios from 'axios';

export function getNewSongs(){
	return axios.get('/personalized/newsong',{params:{limit:10}})
}