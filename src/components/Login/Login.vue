<template>
  <div>
    <div class="goBackIcon" v-if="!loginScreen">
      <chevron-left-icon
        size="2x"
        class="btn"
        @click="screenMediator('loginScreen')"
      ></chevron-left-icon>
    </div>
    <h1 v-if="loginScreen" class="cardTitle">PARA Resiliência</h1>
    <div class="inputContainer" v-if="loginScreen">
      <div>
        <div class="login-group">
          <input
            v-model="login.email"
            type="email"
            placeholder="E-mail"
            class="login-control"
            id="email"
          />
          <div
            v-if="$v.login.email.$error && !$v.login.email.required"
            class="error"
          >
            Email é necessário!
          </div>
          <div
            v-if="$v.login.email.$error && !$v.login.email.email"
            class="error"
          >
            Email inválido!
          </div>
        </div>
        <div class="login-group">
          <input
            v-model="login.password"
            type="password"
            placeholder="Senha"
            class="login-control"
            id="password"
          />
          <div
            v-if="$v.login.password.$error && !$v.login.password.required"
            class="error"
          >
            Senha necessária!
          </div>
        </div>
        <button
          @click="loginUser"
          class="btn-outlined heavyTextButton main-btn"
        >
          VAMOS LÁ!
        </button>
      </div>
      <div class="buttonsContainer">
        <button
          @click="screenMediator('recoverPasswordScreen')"
          class="btn-outlined"
          style="margin-right: 10px"
        >
          Recuperar Senha
        </button>
        <button
          class="btn-outlined"
          @click="screenMediator('registerUserScreen')"
        >
          Cadastrar
        </button>
      </div>
    </div>
    <div class="recoverPasswordContainer" v-else-if="recoverPasswordScreen">
      <section class="recoverPasswordTitleContainer">
        <h3>Esqueceu sua senha?</h3>
        <h3>
          Não se preocupe, nós vamos te enviar uma mensagem para recuperá-la!
        </h3>
      </section>
      <div>
        <div class="login-group">
          <input
            v-model="login.email"
            type="email"
            name="recoverPassowrdEmailInput"
            id="recoverPassowrdEmailInput"
            class="login-control"
            placeholder="E-mail"
          />
          <div
            v-if="$v.login.email.$error && !$v.login.email.email"
            class="error"
          >
            Email inválido!
          </div>
        </div>
        <button
          @click="screenMediator('recoverPasswordScreen')"
          class="btn-outlined heavyTextButton main-btn"
          style="margin-right: 10px"
        >
          Recuperar Senha
        </button>
      </div>
    </div>
    <div v-else-if="registerUserScreen">
      <h1 class="cardTitle" style="color: #031633">Criar Conta</h1>
      <div>
        <div class="login-group">
          <input
            v-model="user.name"
            type="text"
            placeholder="Nome completo"
            class="login-control"
            id="name"
          />
          <div
            v-if="$v.user.name.$error && !$v.user.name.required"
            class="error"
          >
            Nome é necessário!
          </div>
        </div>
        <div class="login-group">
          <input
            v-model="user.email"
            type="email"
            placeholder="E-mail"
            class="login-control"
            id="email"
          />
          <div
            v-if="$v.user.email.$error && !$v.user.email.required"
            class="error"
          >
            Email é necessário!
          </div>
          <div
            v-if="$v.user.email.$error && !$v.user.email.email"
            class="error"
          >
            Email inválido!
          </div>
        </div>
        <div class="login-group">
          <select v-model="user.type" class="login-control" id="name">
            <option disabled selected :value="null" hidden>"Eu sou..."</option>
            <option
              v-for="(userType, index) in userTypes"
              :value="userType.id"
              :key="index"
              class="form-control"
            >
              {{ userType.name }}
            </option>
          </select>
          <div
            v-if="$v.user.type.$error && !$v.user.type.required"
            class="error"
          >
            Necessário selecionar!
          </div>
        </div>
        <div class="login-group">
          <input
            v-model="user.password"
            type="password"
            placeholder="Criar uma senha"
            class="login-control"
            id="password"
          />
          <div
            v-if="$v.user.password.$error && !$v.user.password.required"
            class="error"
          >
            Senha necessária!
          </div>
        </div>
        <div class="login-group">
          <input
            v-model="user.password"
            type="password"
            placeholder="Confirmar senha"
            class="login-control"
            id="password"
          />
          <div
            v-if="$v.user.password.$error && !$v.user.password.required"
            class="error"
          >
            Senha necessária!
          </div>
        </div>
        <button
          @click="loginUser"
          class="btn-outlined heavyTextButton main-btn"
        >
          CADASTRAR
        </button>
        <section class="footNote">
          Já é cadastrado?
          <p
            style="cursor: pointer; text-decoration: underline"
            @click="screenMediator('loginScreen')"
          >
            Entrar
          </p>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators';
import { api } from '@/services/index';
import { ChevronLeftIcon } from 'vue-feather-icons';

export default {
  name: 'Login',
  components: {
    ChevronLeftIcon
  },
  data() {
    return {
      asyncState: null,
      login: {
        email: null,
        password: null
      },
      loginScreen: true,
      recoverPasswordScreen: false,
      registerUserScreen: false,
      userTypes: {
        restaurantAdm: {
          name: 'Administrador de restaurante',
          value: 'restaurantAdm'
        },
        worker: {
          name: 'Funcionário',
          value: 'worker'
        },
        appAdm: {
          name: 'Administrador da aplicação',
          value: 'appAdm'
        }
      },
      user: {
        name: null,
        email: null,
        type: null,
        password: null
      }
    };
  },
  validations: {
    login: {
      email: { required, email },
      password: { required }
    },
    user: {
      name: { required },
      email: { required, email },
      type: { required },
      password: { required }
    }
  },
  computed: {},
  created() {
    this.reset();
  },
  methods: {
    loginUser() {
      this.$vToastify.success('Bem vindo!', 'Sucesso!');
      this.$router.push('appAdm');
      // if (this.$v.$touch()) {
      //   api
      //     .post('/TODO', this.login)
      //     .then((response) => {
      //       if (response.status == 200) {
      //         this.$vToastify.success('Bem vindo!');
      //       } else {
      //         this.$vToastify.error('Não foi possível fazer Login...');
      //       }
      //     })
      //     .catch((error) => {
      //       console.log(error.response);
      //       this.$vToastify.error('Não foi possível fazer Login...');
      //     });
      // }
    },
    reset() {
      this.login.email = null;
      this.login.password = null;
      this.name = null;
      this.email = null;
      this.userType = null;
      this.password = null;
      this.$v.$reset();
    },
    screenMediator(whereTo) {
      this.reset();
      switch (whereTo) {
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
