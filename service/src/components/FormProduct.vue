<template>
  <div class="container bg-light p-5 border rounded">
    <form>
      <div class="form-group">
        <label for="name">Name</label>
        <input
          type="text"
          class="form-control"
          id="name"
          v-model="product.name"
        />
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <input
          type="text"
          class="form-control"
          id="description"
          v-model="product.description"
        />
      </div>
      <div class="form-group">
        <label for="price">Price</label>
        <input
          type="text"
          class="form-control"
          id="price"
          v-model="product.price"
        />
      </div>
      <div class="form-group">
        <label for="weight">Weight</label>
        <input
          type="text"
          class="form-control"
          id="weight"
          v-model="product.weight"
        />
      </div>
      <div class="form-group">
        <label for="category">Category</label>
        <select class="form-control" v-model="product.categoryId">
          <option
            v-for="category in categories"
            id="category"
            v-bind:value="category.categoryId"
            :key="category.categoryId"
            >{{ category.name }}</option
          >
        </select>
      </div>
      <button
        class="btn btn btn-outline-dark my-2 my-sm-0"
        type="button"
        v-on:click="updateProduct"
      >
        UPDATE
      </button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import { bus } from '../bus';

export default {
  name: 'FormProduct',

  props: {
    listProducts: Array,
  },

  data: function() {
    return {
      id: '',
      product: '',
      categories: [],
      list: [],
    };
  },

  mounted: function() {
    axios.get('http://localhost:8081/categories').then((res) => {
      this.categories = res.data;
    });
    this.id = this.$route.query.id;
    this.product = this.listProducts[this.id - 1];
  },

  methods: {
    updateProduct: function() {
      axios
        .put('http://localhost:8081/products/' + this.id, {
          name: this.product.name,
          description: this.product.description,
          price: this.product.price,
          weight: this.product.weight,
          categoryId: this.product.categoryId,
        })
        .then((res) => {
          console.log(res);
          bus.$emit('productUpdatedCorrectly');
        })
        .catch((err) => {
          alert(err + ' ' + JSON.stringify(err.response.data));
          bus.$emit('productUpdatedBadly');
        });
    },
  },
};
</script>

<style scoped></style>
