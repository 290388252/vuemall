import Vue from 'vue';
import Router from 'vue-router';
import GoodsList from '@/views/GoodsList.vue';
import Cart from '@/views/Cart.vue';
import Address from '@/views/Address';
import OrderConfirm from '@/views/OrderConfirm';
import OrderSuccess from '@/views/OrderSuccess';

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
    },
    {
      path: '/address',
      name: 'address',
      component: Address
    },
    {
      path: '/orderConfirm',
      name: 'orderConfirm',
      component: OrderConfirm
    },
    {
      path: '/orderSuccess',
      name: 'orderSuccess',
      component: OrderSuccess
    }
  ]
});
