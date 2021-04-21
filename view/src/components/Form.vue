<template>
  <div class="container bg-light form  justify-content-start mt-4 w-50 mb-5">
    <form class="pl-3 pr-3" id="form" @submit.prevent="makeAnOrder()">
      <header><p class="header">Make an order</p></header>
      <div class="form-group">
        <div class="form-group">
          <label for="exampleInputUsername">Name</label>
          <input
            type="text"
            required
            pattern="[A-ż]*"
            placeholder="Type your name here ..."
            class="form-control"
            id="exampleInputUsername"
            v-model="userName"
          />
        </div>
        <label for="exampleInputEmail1">Email address</label>
        <input
          type="email"
          class="form-control"
          id="exampleInputEmail1"
          required
          placeholder="Type you email here..."
          aria-describedby="emailHelp"
          v-model="email"
        />
        <small id="emailHelp" class="form-text text-muted"
          >We'll never share your email with anyone else.</small
        >
      </div>
      <div class="form-group">
        <label for="exampleInputPhone">Phone number</label>
        <input
          type="tel"
          pattern="[0-9]{9}"
          maxlength="9"
          minlength="9"
          required
          class="form-control"
          id="exampleInputPhone"
          placeholder="Type your phone number here..."
          v-model="phoneNumber"
        />
      </div>
      <input type="submit" value="ORDER" class="btn btn-dark" />
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Form',

  props: {
    listToBuy: Array,
  },

  data: function() {
    return {
      userName: '',
      email: '',
      phoneNumber: '',
    };
  },

  methods: {
    makeAnOrder: function() {
      console.log(this.listToBuy);
      var self = this;
      if (this.listToBuy.length == 0) {
        alert(
          "You haven't got anything in your cart. Let's go home and buy something."
        );
      } else {
        axios
          .post('http://localhost:8081/orders', {
            user_name: this.userName,
            email: this.email,
            phone_number: this.phoneNumber,
          })
          .then(function(response) {
            console.log(self.listToBuy);
            console.log(response);
            for (let product of self.listToBuy) {
              axios
                .post('http://localhost:8081/orders/products', {
                  orderId: response.data.orderId,
                  productId: product.product.productId,
                  amount: product.amount,
                })
                .then(function(response) {
                  console.log(response);
                  document.getElementById('form').submit();
                });
            }
          });
      }
    },
  },
};
</script>

<style scoped>
.form {
  box-sizing: border-box;
  width: 40%;
  padding: 1%;
  border-radius: 15px;
  margin-left: 14%;
}

.header {
  font-size: 2rem;
  font-family: 'Dancing Script', cursive;
}
</style>
