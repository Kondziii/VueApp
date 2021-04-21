import Vue from 'vue';
import VueRouter from 'vue-router';
import ProductsTable from '../components/ProductsTable.vue';
import OrderedProductsTable from '../components/OrderedProductsTable.vue';
import Form from '../components/Form.vue';
Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    {
      path: '/',
      components: { ProductsTable },
    },
    {
      path: '/cart',
      components: { OrderedProductsTable, Form },
    },
  ],
  mode: 'history',
});
