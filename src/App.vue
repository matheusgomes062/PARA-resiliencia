<template>
  <div id="app" class="container">
    <div class="content">
      <Login />
    </div>
  </div>
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
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}
#logo {
  font-size: 3em;
  padding: 30px;
}
.conteiner {
  background: linear-gradient(
    0deg,
    rgba(15, 14, 14, 0.58),
    rgba(15, 14, 14, 0.58)
  );
}
</style>
