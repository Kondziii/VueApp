<template>
  <div id="app">
    <Header></Header>
    <router-view
      name="ProductsTable"
      v-bind:listToBuy="listToBuy"
    ></router-view>
    <router-view
      name="OrderedProductsTable"
      v-bind:listToBuy="listToBuy"
    ></router-view>
    <router-view name="Form" v-bind:listToBuy="listToBuy"></router-view>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from './components/Header';
import Footer from './components/Footer';

export default {
  name: 'App',
  components: {
    Header,
    Footer,
  },

  data: function() {
    return {
      listToBuy: [],
    };
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap');

#app {
  font-family: 'Roboto', sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;

  background-image: url('assets/image2.jpg');
  background-position: fixed;
  background-repeat: repeat;
  min-height: 100vh;
}
</style>
