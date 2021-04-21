<template>
  <div class="container mt-5 text-center">
    <select class="form-control mb-4 w-25" @change="filterList($event)">
      <option value="0"> All</option>
      <option
        v-for="state in states"
        :key="state.order_stateId"
        :value="state.order_stateId"
        >{{ state.name }}</option
      >
    </select>
    <table class="table table-striped table-bordered table-hover">
      <thead class="thead-dark">
        <th>ID</th>
        <th>Client</th>
        <th>Client's email</th>
        <th>Approval date</th>
        <th>Total value</th>
      </thead>
      <tbody class="bg-light">
        <tr v-for="order in filteredOrders" :key="order.orderId">
          <td class=" align-middle">{{ order.orderId }}</td>
          <td class=" align-middle">{{ order.user_name }}</td>
          <td class=" align-middle">{{ order.email }}</td>
          <td class=" align-middle">{{ order.approval_date }}</td>
          <td class=" align-middle">{{ computeTotalPrice(order) }}</td>
        </tr>
        <tr v-if="checkIfEmpty">
          <td colspan="5">There isn't any orders that have this state.</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';
import _ from 'lodash';

export default {
  name: 'DisplayOrders',

  data() {
    return {
      orders: [],
      filteredOrders: [],
      states: [],
    };
  },

  computed: {
    checkIfEmpty: function() {
      return this.filteredOrders.length == 0;
    },
  },

  mounted() {
    let self = this;
    axios
      .get('http://localhost:8081/orders')
      .then((res) => {
        this.orders = res.data;
        this.filteredOrders = res.data;
      })
      .then(function() {
        axios.get('http://localhost:8081/states').then((result) => {
          self.states = result.data;
        });
      });
  },

  methods: {
    computeTotalPrice: function(order) {
      let totalPrice = 0;
      for (let product of order.products) {
        totalPrice += product.price * product.order_product.amount;
      }
      return parseFloat(totalPrice.toFixed(2));
    },

    filterList: function(event) {
      if (event.target.value == 0) {
        this.filteredOrders = this.orders;
      } else {
        this.filteredOrders = _.filter(this.orders, {
          order_stateId: parseInt(event.target.value),
        });
      }
    },
  },
};
</script>

<style scoped></style>
