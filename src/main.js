// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import _VueResource from 'vue-resource';
import Vuex from 'vuex';
import axios from 'axios';
import VueLazyLoad from 'vue-lazyload';
import VueInfiniteScroll from 'vue-infinite-scroll';
import './assets/css/base.css';

Vue.config.productionTip = false;
Vue.use(_VueResource);
Vue.use(VueInfiniteScroll);
Vue.use(Vuex);
Vue.use(VueLazyLoad, {
  loading: './static/loading-svg/loading-bars.svg'
});
Vue.prototype.$axios = axios;

const store = new Vuex.Store({
  state: {
      nickName: '',
      cartCounts: 0
  },
  mutations: {
    updateUserInfo(state, nickName) {
      state.nickName = nickName;
    },
    getUserCartListCount(state, cartCounts) {
      state.cartCounts = cartCounts;
    }
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
