import axios from 'axios';

export var getBanner = function() {
  return axios.get('/banner')
};
