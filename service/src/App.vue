<template>
  <div id="app">
    <Header></Header>
    <router-view name="MainPage"></router-view>
    <router-view
      name="ProductsTable"
      v-bind:listProducts="listProducts"
    ></router-view>
    <router-view
      name="FormProduct"
      v-bind:listProducts="listProducts"
    ></router-view>
    <router-view name="UpdateOrders"></router-view>
    <router-view name="DisplayOrders"></router-view>
  </div>
</template>

<script>
import Header from './components/Header';
import axios from 'axios';
import { bus } from './bus';

export default {
  name: 'App',
  components: {
    Header,
  },

  data() {
    return {
      listProducts: [],
    };
  },

  mounted() {
    this.getProducts();

    bus.$on('productUpdatedCorrectly', () => {
      this.getProducts();
      this.$router.push('/products');
    });

    bus.$on('productUpdatedBadly', () => {
      this.getProducts();
    });
  },

  methods: {
    getProducts: function() {
      axios.get('http://localhost:8081/products').then((res) => {
        this.listProducts = res.data;
      });
    },
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap');

#app {
  margin: 0;
  padding: 0;
  font-family: 'Roboto', sans-serif;

  box-sizing: border-box;
  padding-bottom: 5vh;

  background-image: url('assets/image2.jpg');
  background-position: fixed;
  background-repeat: repeat;
  min-height: 100vh;
}
</style>
