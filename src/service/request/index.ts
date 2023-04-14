import axios from 'axios';
// 拦截器类型定义的时候AxiosRequestConfig已被AxiosRequestConfig代替
import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { ElLoading } from 'element-plus';

axios.defaults.timeout = 10000;

interface MyRequestInterceptor<T = AxiosResponse> {
  requestInterceptor?: (config: any) => any;
  requestInterceptorError?: (error: unknown) => unknown;
  responseInterceptor?: (config: T) => T;
  responseInterceptorError?: (error: unknown) => unknown;
}

interface MyRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors: MyRequestInterceptor<T>;
}

export class RequestClass {
  instance: AxiosInstance;
  interceptors: MyRequestInterceptor;

  constructor(config: MyRequestConfig) {
    this.instance = axios.create(config);
    this.interceptors = config.interceptors;

    this.instance.interceptors.response.use(
      this.interceptors.responseInterceptor,
      this.interceptors.responseInterceptorError
    );
    this.instance.interceptors.request.use(
      this.interceptors.requestInterceptor,
      this.interceptors.requestInterceptorError
    );
    const loadingInstance = ElLoading.service({
      lock: true,
      text: '正在加载中，请稍后···',
      background: 'rgba(0, 0, 0, .5)'
    });
    // 所有实例都有拦截器的操作
    this.instance.interceptors.request.use(
      (config) => {
        console.log('全局请求拦截');
        return config;
      },
      (error) => {
        console.log('全局请求拦截错误');
        console.log(error);
      }
    );
    this.instance.interceptors.response.use(
      (res) => {
        console.log('全局数据获取拦截');
        // loadingInstance.close();
        return res?.data;
      },
      (error) => {
        console.log('全局数据获取错误');
        loadingInstance.close();
        console.log(error);
      }
    );
  }
  // AxiosRequestConfig默认不含拦截器，MyRequestConfig包含拦截器，可以达到
  request<T>(config: MyRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config);
      }
      this.instance
        .request<any, T>(config)
        .then((res) => {
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res);
          }
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  get<T>(config: MyRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' });
  }

  post<T>(config: MyRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' });
  }

  delete<T>(config: MyRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' });
  }

  patch<T>(config: MyRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' });
  }
}
