<template>
  <div class="container mt-5 text-center">
    <table class="table table-striped table-bordered table-hover">
      <thead class="thead-dark">
        <th>Name</th>
        <th>Description</th>
        <th>Price</th>
        <th>Weight</th>
        <th>Category</th>
        <th>Update</th>
      </thead>
      <tbody class="bg-light">
        <tr v-for="product in listProducts" v-bind:key="product.productId">
          <td class=" align-middle">{{ product.name }}</td>
          <td class=" align-middle">{{ product.description }}</td>
          <td class=" align-middle">{{ product.price }}</td>
          <td class=" align-middle">{{ product.weight }}</td>
          <td class=" align-middle">{{ product.category.name }}</td>
          <td class=" align-middle">
            <router-link
              :to="{ path: '/products/form', query: { id: product.productId } }"
              class="btn btn-dark text-light"
            >
              EDIT
            </router-link>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'ProductsTable',

  props: {
    listProducts: Array,
  },
};
</script>

<style scoped>
tbody {
  line-height: 5vh;
}
th {
  overflow: auto;
}

.dis {
  border: none;
  color: black;
}
</style>
