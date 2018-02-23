import Vue from 'vue';
import Router from 'vue-router';
import GoodsList from '@/views/GoodsList.vue';
import Cart from '@/views/Cart.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'goods',
      component: GoodsList
    },
    {
      path: '/cart',
      name: 'cart',
      component: Cart
    }
  ]
});
