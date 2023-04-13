import axios from 'axios';

import { BASE_HOST, BASE_METHOD } from './request/config';

axios.get(`${BASE_HOST}${BASE_METHOD}`).then((res) => {
  console.log('url', `${BASE_HOST}${BASE_METHOD}`);
  console.log(res);
});
// axios的拦截器
