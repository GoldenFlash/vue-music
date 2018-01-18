import axios from 'axios';
export function getRecommendSongList() {
  let param = {
    limit: 9
  }
  return axios.get('/personnalized', {params: param})
}
