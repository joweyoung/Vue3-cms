// service统一出口
import { RequestClass } from './request';
import { BASE_URL } from './request/config';

const serviceRequest = new RequestClass({
  baseURL: `${BASE_URL}`,
  interceptors: {
    requestInterceptor: (config) => {
      console.log('请求成功的拦截');
      if (config.headers?.token) {
        config.headers.Authorization = `Bearer ${config.headers?.token}`;
      }
      return config;
    },
    requestInterceptorError: (error) => {
      console.log('请求失败的拦截');
      return error;
    },
    responseInterceptor: (res) => {
      console.log('请求成功的拦截');
      return res;
    },
    responseInterceptorError: (error) => {
      console.log('请求成功的拦截');
      return error;
    }
  }
});
export default serviceRequest;
