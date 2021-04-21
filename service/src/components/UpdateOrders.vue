<template>
  <div class="container mt-5 text-center">
    <table class="table table-striped table-bordered table-hover">
      <thead class="thead-dark">
        <th>ID</th>
        <th>Client</th>
        <th>Client's email</th>
        <th>Approval date</th>
        <th>Total value</th>
        <th>Products</th>
        <th>Change state</th>
      </thead>
      <tbody class="bg-light">
        <tr v-for="order in orders" :key="order.orderId">
          <td class=" align-middle">{{ order.orderId }}</td>
          <td class=" align-middle">{{ order.user_name }}</td>
          <td class=" align-middle">{{ order.email }}</td>
          <td class=" align-middle">{{ order.approval_date }}</td>
          <td class=" align-middle">{{ computeTotalPrice(order) }}</td>
          <td class=" align-middle">
            <ol>
              <li v-for="product in order.products" :key="product.productId">
                {{ product.name }}:
                <b> x{{ product.order_product.amount }}</b>
              </li>
            </ol>
          </td>
          <td class="align-middle align-items-center" style="border:none;">
            <div class="btn-group">
              <button
                type="button"
                class="btn btn-danger text-light"
                v-on:click="updateOrder(order, 'CANCELED')"
              >
                <i class="fas fa-times-circle"></i>
              </button>
              <button
                type="button"
                class="btn btn-success text-light ml-1"
                v-on:click="updateOrder(order, 'REALIZED')"
              >
                <i class="fas fa-check-circle"></i>
              </button>
            </div>
          </td>
        </tr>
        <tr v-if="checkIfEmpty">
          <td colspan="7">There isn't any approved orders at this moment</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'UpdateOrders',

  data() {
    return {
      orders: [],
    };
  },

  mounted() {
    axios.get('http://localhost:8081/orders/APPROVED').then((res) => {
      this.orders = res.data;
    });
  },

  computed: {
    checkIfEmpty: function() {
      return this.orders.length == 0;
    },
  },

  methods: {
    computeTotalPrice: function(order) {
      let totalPrice = 0;
      for (let product of order.products) {
        totalPrice += product.price * product.order_product.amount;
      }
      return parseFloat(totalPrice.toFixed(2));
    },

    updateOrder: function(order, state) {
      axios
        .put('http://localhost:8081/orders/' + order.orderId + '/' + state)
        .then((res) => {
          console.log(res);

          axios.get('http://localhost:8081/orders/APPROVED').then((res) => {
            this.orders = res.data;
          });
        });
    },
  },
};
</script>

<style scoped></style>
