<template>
  <div class="container mt-5 text-center divTable">
    <table class="table table-striped table-bordered table-hover">
      <thead class="thead-dark">
        <th style="width: 25%">Product name</th>
        <th style="width: 25%">Amount</th>
        <th style="width: 25%">Total price</th>
        <th style="width: 25%">Delete from order</th>
      </thead>
      <tbody class="bg-light">
        <tr v-for="(product, index) in listToBuy" :key="index">
          <td class="align-middle">{{ product.product.name }}</td>
          <td
            class="amount row align-middle justify-content-center group align-middle"
          >
            <button
              type="button"
              class="btn-dark mr-2"
              v-on:click="decrementAmount(index)"
              :disabled="checkAmount(index)"
            >
              <i class="fas fa-angle-left mr-2 counter"></i>
            </button>
            <span>{{ product.amount }}</span>
            <button
              type="button"
              class="btn-dark ml-2"
              v-on:click="incrementAmount(index)"
            >
              <i class="fas fa-angle-right ml-2 counter"></i>
            </button>
          </td>
          <td class="align-middle">{{ product.totalPrice }}</td>
          <td>
            <button
              type="button"
              class="btn btn-dark text-light"
              v-on:click="deleteProduct(index)"
            >
              DELETE
            </button>
          </td>
        </tr>
        <tr v-if="isEmpty">
          <td colspan="4" class="align-middle">
            <p>
              Your cart at this moment is empty. Go to home page and just buy
              something.
            </p>
          </td>
        </tr>
        <tr v-if="!isEmpty">
          <td colspan="2" class="align-middle">
            <span>Total sum to pay</span>
          </td>
          <td class="align-middle">{{ totalSum }}</td>
        </tr>
      </tbody>
    </table>
    <router-view name="Form"></router-view>
  </div>
</template>

<script>
import { bus } from '../bus';

export default {
  name: 'OrderedProductsTable',

  props: {
    listToBuy: Array,
  },

  data: function() {
    return {
      totalSum: 0,
      isEmpty: true,
    };
  },

  mounted: function() {
    bus.$on('goToCart', () => {
      this.checkIfEmpty();
    });
    this.computeTotalSum();
  },

  methods: {
    incrementAmount: function(index) {
      this.listToBuy[index].amount++;
      this.computeTotalPrice(index);
    },

    decrementAmount: function(index) {
      if (this.listToBuy[index].amount >= 2) {
        this.listToBuy[index].amount--;
        this.computeTotalPrice(index);
      }
      this.computeTotalSum();
    },

    computeTotalPrice: function(index) {
      this.listToBuy[index].totalPrice = parseFloat(
        (
          this.listToBuy[index].product.price * this.listToBuy[index].amount
        ).toFixed(2)
      );
      this.computeTotalSum();
    },

    checkAmount: function(index) {
      if (this.listToBuy[index].amount == 1) {
        return true;
      }
      return false;
    },

    deleteProduct: function(index) {
      this.listToBuy.splice(index, 1);
      this.checkIfEmpty();
      this.computeTotalSum();
    },

    checkIfEmpty: function() {
      if (this.listToBuy.length == 0) {
        this.isEmpty = true;
      } else {
        this.isEmpty = false;
      }
    },

    computeTotalSum: function() {
      this.totalSum = 0;
      for (let product of this.listToBuy) {
        this.totalSum += product.product.price * product.amount;
      }
      this.totalSum = parseFloat(this.totalSum.toFixed(2));
    },
  },
};
</script>

<style scoped>
.counter {
  font-size: 1.3rem;
}

.group {
  border: none;
}
</style>
