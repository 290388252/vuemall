// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import _VueResource from 'vue-resource';
import axios from 'axios';
import VueLazyLoad from 'vue-lazyload';
import VueInfiniteScroll from 'vue-infinite-scroll';
import './assets/css/base.css';

Vue.config.productionTip = false;
Vue.use(_VueResource);
Vue.use(VueInfiniteScroll);
Vue.use(VueLazyLoad, {
  loading: './static/loading-svg/loading-bars.svg'
});
Vue.prototype.$axios = axios;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
