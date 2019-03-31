import axios from 'axios';

export var getFm = function() {
  return axios.get('/personal_fm',{params:{date:new Date()}})
};
