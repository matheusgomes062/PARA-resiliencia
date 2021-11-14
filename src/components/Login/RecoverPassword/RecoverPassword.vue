<template lang="pug">
  div
    section.d-flex.flex-column.align-items-start
      h4.mb-2 Esqueceu sua senha?
      p.text-wrap.text-start Não se preocupe, nós vamos te enviar uma mensagem para recuperá-la!
      
    div
      div(class="login-group")
        el-input(
          v-model="login.email"
          type="email"
          name="recoverPassowrdEmailInput"
          id="recoverPassowrdEmailInput"
          class="login-control"
          placeholder="E-mail")
        div(
          v-if="$v.login.email.$error && !$v.login.email.email"
          class="error")
          Email inválido!
      el-button(
        @click="screenMediator('recoverPasswordScreen')"
        class="btn-outlined heavyTextButton main-btn"
        style="margin-right: 10px") Recuperar Senha
</template>

<script>
import { required, email } from 'vuelidate/lib/validators';
import { api } from '@/services/index';
import { mapActions } from 'vuex';

export default {
  name: 'RecoverPassword',
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
      email: { required, email }
    }
  },
  created() {
    this.reset();
  },
  methods: {
    reset() {
      this.login.email = null;
      this.$v.$reset();
    },
    screenMediator(whereTo) {
      this.reset();
      this.$emit('componentToShow', whereTo);
    }
  }
};
</script>

<style lang="scss" scoped>
@import './_recoverPassword.scss';
</style>
