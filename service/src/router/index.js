import Vue from 'vue';
import VueRouter from 'vue-router';
import MainPage from '../components/MainPage';
import ProductsTable from '../components/ProductsTable';
import FormProduct from '../components/FormProduct';
import UpdateOrders from '../components/UpdateOrders';
import DisplayOrders from '../components/DisplayOrders';

Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    {
      path: '/',
      components: { MainPage },
    },

    {
      path: '/products',
      components: {
        ProductsTable,
      },
    },

    {
      name: 'form',
      path: '/products/form',
      components: { FormProduct },
      props(route) {
        return { id: route.query.id };
      },
    },

    {
      path: '/update/orders',
      components: { UpdateOrders },
    },

    {
      path: '/display/orders',
      components: { DisplayOrders },
    },
  ],
  mode: 'history',
});
