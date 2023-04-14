import { createApp } from 'vue';
import App from './App.vue';

import router from './router/index';
import store from './store';
import serviceRequest from './service';

const app = createApp(App);

app.use(router).use(store);

app.mount('#app');

serviceRequest.request({
  interceptors: {
    requestInterceptor: (config) => {
      console.log('单独请求的config');
      // config.headers.token = '123';
      return config;
    },
    responseInterceptor: (res) => {
      console.log('单独响应的response');
      return res;
    }
  }
});
