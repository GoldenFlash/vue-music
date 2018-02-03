import axios from 'axios';

export var getLyric = function(id) {
  return axios.get('/lyric',{params:{id:id}})
};
