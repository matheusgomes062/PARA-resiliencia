<template lang="pug">
  div
    div
      Header(title="PARA Resiliência" v-if="loginScreen")
      Header(title="Criar Conta" v-else-if="!loginScreen && registerUserScreen")
      Header(routeToGo="loginScreen" title="Recuperar Senha" v-else-if="!loginScreen && recoverPasswordScreen")
    
    div(v-if="loginScreen")
      LoginUser(@screenMediator="screenMediator")
    
    div(v-else-if="recoverPasswordScreen")
      RecoverPassword(@screenMediator="screenMediator")

    div(v-else-if="registerUserScreen")
      RegisterUser(@screenMediator="screenMediator")
</template>

<script>
import { api } from '@/services/index';
import { ChevronLeftIcon } from 'vue-feather-icons';
import { mapActions, mapGetters } from 'vuex';
import Header from '@/components/Header/Header.vue';
import LoginUser from '@/components/Login/LoginUser/LoginUser.vue';
import RegisterUser from '@/components/Login/RegisterUser/RegisterUser.vue';
import RecoverPassword from '@/components/Login/RecoverPassword/RecoverPassword.vue';

export default {
  name: 'Login',
  components: {
    ChevronLeftIcon,
    Header,
    LoginUser,
    RegisterUser,
    RecoverPassword
  },
  data() {
    return {
      loginScreen: true,
      recoverPasswordScreen: false,
      registerUserScreen: false,
      routes: {
        admin: 'restaurantAdm',
        employee: 'worker',
        owner: 'appAdm'
      }
    };
  },
  computed: {
    ...mapGetters(['getWhereTo'])
  },
  watch: {
    getWhereTo() {
      this.screenMediator();
    }
  },
  methods: {
    ...mapActions(['loginUser', 'setWhereTo']),
    screenMediator() {
      switch (this.getWhereTo) {
        case 'loginScreen':
          this.loginScreen = true;
          this.registerUserScreen = false;
          this.recoverPasswordScreen = false;
          break;
        case 'recoverPasswordScreen':
          this.recoverPasswordScreen = true;
          this.loginScreen = false;
          this.registerUserScreen = false;
          break;
        case 'registerUserScreen':
          this.registerUserScreen = true;
          this.loginScreen = false;
          this.recoverPasswordScreen = false;
          break;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import './_login.scss';
</style>
