<template lang="pug">
  div
    el-form.d-flex.flex-column.w-100(ref="form" :model="$v.user")
      el-form-item(class="register-group")
        el-input(
          v-model="user.name"
          type="text"
          placeholder="Nome completo"
          class="login-control"
          id="name")
        div(
          v-if="$v.user.name.$error && !$v.user.name.required"
          class="error")  Nome é necessário!
          
      el-form-item(class="register-group")
        el-input(
          v-model="user.email"
          type="email"
          placeholder="E-mail"
          class="login-control"
          id="email")
        div(
          v-if="$v.user.email.$error && !$v.user.email.required"
          class="error")  Email é necessário!
        div(
          v-if="$v.user.email.$error && !$v.user.email.email"
          class="error")  Email inválido!
      el-form-item(class="register-group")
        el-select(v-model="user.type" placeholder="Eu sou..." id="userType").w-100
          el-option(
            v-for="(userType, index) in userTypes"
            :value="userType.value"
            :label="userType.name"
            :key="userType + '-' + index").px-3 {{ userType.name }}
        div(
          v-if="$v.user.type.$error && !$v.user.type.required"
          class="error")  Necessário selecionar!
      el-form-item(class="register-group")
        el-input(
          v-model="user.password"
          type="password"
          placeholder="Criar uma senha"
          class="login-control"
          id="password")
        div(
          v-if="$v.user.password.$error && !$v.user.password.required"
          class="error")  Senha necessária!
      el-form-item(class="register-group")
        el-input(
          v-model="user.passwordConfirm"
          type="password"
          placeholder="Confirmar senha"
          class="login-control"
          id="passwordConfirm")
        div(
          v-if="$v.user.passwordConfirm.$error && !$v.user.passwordConfirm.required"
          class="error")  Confirmação de senha necessária!
        div(
          v-if="$v.user.passwordConfirm.$error && !$v.user.passwordConfirm.sameAsPassword"
          class="error")  Senhas diferentes!

      el-button(
        @click="createUser"
        class=" main-btn") CADASTRAR
        
      section(class="footNote") Já é cadastrado?
        p(style="cursor: pointer; text-decoration: underline"
          @click="screenMediator('loginScreen')") Entrar

    el-dialog(
      :visible.sync="dialogVisible"
      width="70%"
      :before-close="handleClose")
      span
        //- pdf(src="./pra-front.pdf" :page="1")
        //-   template(slot="loading") loading content here...
        //- object(data="./pra-front.pdf" type="application/pdf")
        //-   div No PDF viewer available
        pdf(src="./TCLE_emenda.pdf")
        //- embed(src="pra-front.pdf" width="500" height="375" type="application/pdf")

      el-checkbox( v-model="user.readTerms")
        h4 Aceita os termos de serviço
        div(
          v-if="$v.user.readTerms.$error && !$v.user.readTerms.required"
          class="error checkboxErrorRegister")  Aceite de termos necessário!
      span.d-flex.justify-content-between(slot="footer" class="dialog-footer")
        el-button(@click="dialogVisible = false") Cancel
        el-button(type="primary" @click="dialogVisible = false") Confirm
</template>

<script>
import { required, email, sameAs } from 'vuelidate/lib/validators';
import { api } from '@/services/index';
import { mapActions } from 'vuex';
// import VuePdfApp from 'vue-pdf-app';
// import this to use default icons for buttons
// import 'vue-pdf-app/dist/icons/main.css';
import pdf from 'vue-pdf';

export default {
  name: 'RegisterUser',
  components: {
    pdf
  },
  data() {
    return {
      user: {
        name: null,
        email: null,
        type: null,
        password: null,
        passwordConfirm: null
      },
      userTypes: {
        restaurantAdm: {
          name: 'Administrador de restaurante',
          value: 'admin' // restaurantAdm
        },
        worker: {
          name: 'Funcionário',
          value: 'employee' // worker
        },
        appAdm: {
          name: 'Administrador da aplicação',
          value: 'owner' //appAdm
        }
      },
      routes: {
        admin: 'restaurantAdm',
        employee: 'worker',
        owner: 'appAdm'
      },

      dialogVisible: true
    };
  },
  validations: {
    user: {
      name: { required },
      email: { required, email },
      type: { required },
      password: { required },
      passwordConfirm: { required, sameAsPassword: sameAs('password') },
      readTerms: { required }
    }
  },
  computed: {},
  created() {
    this.reset();
  },
  methods: {
    ...mapActions(['loginUser', 'setWhereTo']),

    reset() {
      this.name = null;
      this.email = null;
      this.userType = null;
      this.password = null;
      this.$v.$reset();
    },
    createUser() {
      this.$v.$touch();
      if (!this.$v.user.$invalid) {
        this.dialogVisible = true;

        api
          .post('/users', this.user)
          .then((response) => {
            if (response.status == 201) {
              const route = 'owner'; // request.data.userType
              this.loginUser(response.data);
              this.$vToastify.success('Bem vindo!');
              this.$router.push(this.routes[route]);
            } else {
              this.$vToastify.error('Não foi possível criar usuário...');
            }
          })
          .catch((error) => {
            console.log(error.response);
            this.$vToastify.error('Não foi possível criar usuário...');
          });
      } else {
        this.openPdf = false;
      }
    },

    screenMediator(whereTo) {
      this.reset();
      this.setWhereTo(whereTo);
      this.$emit('screenMediator');
    },
    handleClose(done) {
      this.$confirm('Are you sure to close this dialog?')
        .then((_) => {
          done();
        })
        .catch((_) => {});
    }
  }
};
</script>

<style lang="scss" scoped>
@import './_registerUser.scss';
</style>
