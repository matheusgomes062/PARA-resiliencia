<template lang="pug">
#app
  b-container.d-flex.justify-content-center
    router-view
</template>

<script>
import Login from '@/components/Login/Login.vue';
export default {
  name: 'app',
  components: {
    Login
  }
};
</script>

<style lang="scss">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-image: url('assets/orange-wallpaper.jpg');
  background-repeat: repeat-y;
  background-size: cover;
  box-shadow: inset 0 0 0 1000px rgba(0,0,0,.3);
}
</style>
