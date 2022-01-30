<template lang="pug">
  el-form.d-flex.flex-column.w-100(ref="form" :model="login")
    el-form-item(class="login-group")
      el-input(
        v-model="login.email"
        type="email"
        placeholder="E-mail"
        class="login-control"
        id="email")
      div(
        v-if="$v.login.email.$error && !$v.login.email.required"
        class="error")  Email é necessário!
      div(
        v-if="$v.login.email.$error && !$v.login.email.email"
        class="error")  Email inválido!
    el-form-item(class="login-group")
      el-input(
        v-model="login.password"
        type="password"
        placeholder="Senha"
        class="login-control"
        id="password")
      div(
        v-if="$v.login.password.$error && !$v.login.password.required"
        class="error")  Senha necessária!
    el-button(
      @click="loginUserMethod"
      class="btn-outlined heavyTextButton main-btn")  VAMOS LÁ!
    div(class="buttonsContainer")
      el-button(
        @click="screenMediator('recoverPasswordScreen')"
        class="btn-outlined"
        style="margin-right: 10px") Recuperar Senha
      el-button(
        class="btn-outlined"
        @click="screenMediator('registerUserScreen')")  Cadastrar
    
    
</template>

<script>
import { required, email } from 'vuelidate/lib/validators';
import { api } from '@/services/index';
import { mapActions } from 'vuex';

export default {
  name: 'LoginUser',
  components: {},
  data() {
    return {
      login: {
        email: null,
        password: null
      }
    };
  },
  validations: {
    login: {
      email: { required, email },
      password: { required }
    }
  },
  created() {
    this.reset();
  },
  methods: {
    ...mapActions(['loginUser', 'setWhereTo', 'setUserInfo']),

    loginUserMethod() {
      this.$v.$touch();
      if (!this.$v.login.$invalid) {
        api
          .post('/session/login', this.login)
          .then((response) => {
            if (response.status == 201) {
              let route;
              if (response.data.userInfo.type === 'employee') {
                route = 'worker';
              } else if (response.data.userInfo.type === 'owner') {
                route = 'restaurantAdm';
              } else if (response.data.userInfo.type === 'admin') {
                route = 'appAdm';
              }
              this.loginUser(response.data.token);
              this.setUserInfo(response.data.userInfo);
              this.$vToastify.success('Bem vindo!', 'Sucesso!');
              this.$router.push(route);
            } else {
              this.$vToastify.error('Não foi possível fazer Login...');
            }
          })
          .catch((error) => {
            console.log(error);
            this.$vToastify.error('Não foi possível fazer Login...');
          });
      }
    },
    reset() {
      this.login.email = null;
      this.login.password = null;
      this.userType = null;
      this.$v.$reset();
    },
    screenMediator(whereTo) {
      this.reset();
      this.setWhereTo(whereTo);
      this.$emit('screenMediator');
    }
  }
};
</script>

<style lang="scss" scoped>
@import './_loginUser.scss';
</style>
