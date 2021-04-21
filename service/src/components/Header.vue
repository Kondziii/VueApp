<template>
  <div class="wrapper">
    <div class="fixed-wrapper">
      <div class="fixed">
        <nav
          class="container-fluid navbar navbar-expand-lg navbar-light bg-light navigation"
        >
          <router-link class="navbar-brand mr-5" id="header" to="/"
            >Electronic shop
            <span style="font-size: 1.2rem">for service</span></router-link
          >
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data: function() {
    return {};
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

.wrapper {
  margin: 0 auto;
  position: relative;
  padding-bottom: 150px;
}

.fixed-wrapper {
  position: absolute;
  top: 0;
}

.fixed {
  position: fixed;
  z-index: 3;
}
</style>
