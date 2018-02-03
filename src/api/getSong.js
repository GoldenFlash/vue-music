import axios from 'axios';

export var getSong = function(id) {
  return axios.get('/music/url',{params:{id:id}})
};
