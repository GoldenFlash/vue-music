import axios from 'axios';

let param = {
  limit: 9
}
export var getRecommendSongList = function() {
  return axios.get('/personalized', {
    params: param
  })
};
export var getexclusivebroadcastSongList = function() {
  return axios.get('/personalized/privatecontent', {
    params: {
    	limit:4
    }
  })
}
