<template>
  <div class="container mt-5 text-center divTable">
    <table class="table table-striped table-bordered table-hover">
      <thead class="thead-dark">
        <tr>
          <th style="width: 20%">Name</th>
          <th style="width: 50%">Description</th>
          <th style="width: 10%">Price</th>
          <th style="width: 20%">Buy product</th>
        </tr>
      </thead>
      <tbody class="bg-light">
        <tr v-for="product in filteredProducts" v-bind:key="product.productId">
          <td class="align-middle">{{ product.name }}</td>
          <td class="align-middle">{{ product.description }}</td>
          <td class="align-middle">{{ product.price }}</td>
          <td class="align-middle">
            <button
              v-on:click="buyProduct(product)"
              v-if="!checkPresence(product)"
              type="button"
              class="btn btn-dark text-light"
            >
              <i class="fas fa-shopping-cart mr-2"></i>BUY
            </button>
            <button
              v-on:click="buyProduct(product)"
              v-else
              type="button"
              class="btn btn-dark text-light dis"
            >
              <i class="fas fa-shopping-cart mr-2"></i>BOUGHT
            </button>
          </td>
        </tr>
        <tr v-if="checkLength" class="emptyArray">
          <td colspan="4" class="align-middle">
            At this moment we don't have any products that refers to your
            search.
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';
import { bus } from '../bus';
import _ from 'lodash';

export default {
  name: 'ProductsTable',

  props: {
    listToBuy: Array,
  },

  data: function() {
    return {
      products: [],
      helpFilter: [],
      filteredProducts: [],
      content: '',
      isEmpty: false,
    };
  },

  computed: {
    checkLength: function() {
      return this.filteredProducts == 0;
    },
  },

  mounted: function() {
    axios.get('http://localhost:8081/products').then((res) => {
      this.products = res.data;
      this.filteredProducts = res.data;
      this.helpFilter = res.data;
    });

    bus.$on('searchCategory', (id) => {
      this.searchCategory(id);
    });

    bus.$on('searchName', (content) => {
      this.content = content;
      this.searchName(content);
    });

    bus.$on('goToHome', () => {
      this.searchCategory(0);
      this.isEmpty = false;
      this.searchName('');
    });
  },

  methods: {
    searchCategory: function(id) {
      if (id == 0) {
        this.helpFilter = this.products;
      } else {
        this.helpFilter = _.filter(this.products, {
          categoryId: id,
        });
      }
      this.filteredProducts = this.helpFilter;
      this.searchName(this.content);
      this.checkIfEmpty();
    },

    searchName: function(content) {
      let temp = [];
      for (let product of this.helpFilter) {
        if (_.includes(_.toLower(product.name), _.toLower(content))) {
          temp.push(product);
        }
      }
      this.filteredProducts = temp;
      this.checkIfEmpty();
    },

    checkIfEmpty: function() {
      if (this.filteredProducts.length == 0) {
        this.isEmpty = true;
      } else {
        this.isEmpty = false;
      }
    },

    buyProduct: function(product) {
      if (this.checkPresence(product)) {
        alert(
          "You have just added this product to your shopping cart. Let's move to the cart and establish its amount."
        );
      } else {
        this.listToBuy.push({
          product,
          amount: 1,
          totalPrice: product.price,
        });
      }
    },

    checkPresence: function(product) {
      return (
        this.listToBuy.filter((e) => e.product.productId === product.productId)
          .length > 0
      );
    },
  },
};
</script>

<style scoped>
.divTable {
  min-height: 75vh;
}

.dis {
  background-color: grey;
  pointer-events: none;
  cursor: not-allowed;
}
</style>
