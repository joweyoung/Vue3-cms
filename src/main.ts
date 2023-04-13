import { createApp } from 'vue';
import App from './App.vue';

import router from './router/index';
import store from './store';

import './service/axios';

const app = createApp(App);

app.use(router).use(store);

app.mount('#app');
