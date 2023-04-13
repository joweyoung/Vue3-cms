import { createStore } from 'vuex';

const store = createStore({
  state: () => {
    return {
      name: 'Joey'
    };
  }
});

export default store;
