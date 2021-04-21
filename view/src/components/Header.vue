<template>
  <div class="wrapper">
    <div class="fixed-wrapper">
      <div class="fixed">
        <nav
          class="container-fluid navbar navbar-expand-lg navbar-light bg-light navigation"
        >
          <router-link class="navbar-brand mr-5" id="header" to="/"
            >Electronic shop</router-link
          >
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>

          <div
            class="collapse navbar-collapse ml-4"
            id="navbarSupportedContent"
          >
            <ul class="navbar-nav mr-auto">
              <li class="nav-item active ml-2 mr-3" v-on:click="goToHome">
                <router-link to="/" class="nav-link" id="home"
                  ><i class="fas fa-home mr-2"></i>Home
                </router-link>
              </li>
              <li class="nav-item dropdown ml-2 ">
                <a
                  class="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i class="fas fa-laptop mr-2 align-middle"></i>Categories
                </a>
                <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <p class="dropdown-item category" v-on:click="setCategory(0)">
                    All
                  </p>
                  <p
                    class="dropdown-item category"
                    v-for="category in categories"
                    :key="category.categoryId"
                    v-on:click="setCategory(category.categoryId)"
                  >
                    {{ category.name }}
                  </p>
                </div>
              </li>
              <li class="nav-item active ml-2" v-on:click="goToCart">
                <router-link to="/cart" class="nav-link " id="home"
                  ><i class="fas fa-shopping-cart mr-2 "></i>Your cart
                  <span class="sr-only">(current)</span></router-link
                >
              </li>
            </ul>
            <form class="form-inline my-2 my-lg-0">
              <input
                class="form-control mr-sm-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                v-model="filterInput"
              />
              <button
                class="btn btn btn-outline-dark my-2 my-sm-0"
                type="button"
                v-on:click="setFilter"
              >
                Search
              </button>
            </form>
          </div>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { bus } from '../bus';

export default {
  name: 'Header',
  data: function() {
    return {
      categories: [],
      filterInput: '',
    };
  },

  mounted: function() {
    axios.get('http://localhost:8081/categories').then((res) => {
      this.categories = res.data;
    });
  },

  methods: {
    setCategory: function(categoryId) {
      bus.$emit('searchCategory', categoryId);
    },

    setFilter: function() {
      bus.$emit('searchName', this.filterInput);
    },

    goToCart: function() {
      bus.$emit('goToCart');
    },

    goToHome: function() {
      bus.$emit('goToHome');
      this.filterInput = '';
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Dancing+Script&display=swap');

.navigation {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  margin: auto;
}

nav a {
  font-size: 2rem;
}

#navbarDropdown,
#home {
  font-size: 1rem;
}

div {
  letter-spacing: 2px;
}

#header {
  font-family: 'Dancing Script', cursive;
  line-height: 4rem;
}

.category {
  cursor: pointer;
}

nav,
div,
ul {
  box-sizing: border-box;
}

.links {
  box-sizing: border-box;
  padding: 4px;
}

li {
  transition-delay: 0.1s;
}

.wrapper {
  margin: 0 auto;
  position: relative;
  padding-bottom: 70px;
}

.fixed-wrapper {
  position: absolute;
  top: 0;
}

.fixed {
  position: fixed;
}
</style>
