<template>
  <div class="row justify-content-center m-auto">
    <router-link to="/products" class="link mr-5">
      <div class="col bg-light m-5 cell">
        <p>
          Products<br /><i class="fas fa-laptop mr-2"></i
          ><i class="fas fa-mobile-alt mr-2"></i><i class="fas fa-gamepad"></i>
        </p>
      </div>
    </router-link>
    <router-link to="/update/orders" class="link mr-5">
      <div class="col bg-light m-5 cell">
        <p>Update orders <br /><i class="fas fa-list"></i></p>
      </div>
    </router-link>
    <router-link to="/display/orders" class="link mr-5">
      <div class="col bg-light m-5 cell">
        <p>Display orders <br /><i class="fas fa-list"></i></p>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'MainPage',
};
</script>

<style scoped>
p {
  line-height: 7vw;
  font-size: 3vw;
}

.cell {
  text-align: center;
  border: solid 10px grey;
  border-radius: 20px;
  transition-delay: 0.1s;
}

.cell:hover {
  border-color: darkgray;
  cursor: pointer;
  -webkit-transform: scale(1.05);
  -ms-transform: scale(1.05);
  transform: scale(1.05);
}

@media screen and (max-width: 601px) {
  p {
    line-height: 12vw;
    font-size: 5vw;
  }
}

.link {
  color: black;
  text-decoration: none;
  position: initial;
  max-width: 55vw;
  min-width: 27vw;
}
</style>
