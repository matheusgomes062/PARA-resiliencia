<template lang="pug">
  div
    Header(routeToGo="Dashboard" title="Cadastrar Usuário ADM")
    
    el-form.d-flex.flex-column(ref="form" :model="$v.user")
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
        @click="openModal"
        class=" main-btn") CADASTRAR
        
      //- section(class="footNote") Já é cadastrado?
      //-   p(style="cursor: pointer; text-decoration: underline"
      //-     @click="$router.push({ name: 'Login' })") Entrar

    el-dialog(
      :visible.sync="dialogVisible"
      width="70%"
      :before-close="handleClose")
      span
        pdf(src="./TCLE_emenda.pdf")

      .d-flex.flex-column.align-items-center
        el-checkbox(v-model="readTerms")
          h4 Aceita os termos de serviço
        div.mt-2(
          v-if="$v.readTerms.$error && !$v.readTerms.required"
          class="error checkboxErrorRegister")  Aceite de termos necessário!
      span.d-flex.justify-content-between(slot="footer" class="dialog-footer")
        el-button(@click="dialogVisible = false") Cancelar
        el-button(type="primary" @click="createUser") Confirma
</template>

<script>
import { required, email, sameAs } from 'vuelidate/lib/validators';
import { api } from '@/services/index';
import { mapActions } from 'vuex';
import pdf from 'vue-pdf';
import Header from '@/components/Header/Header.vue';

export default {
  name: 'RegisterUser',
  components: {
    pdf,
    Header
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
        // restaurantAdm: {
        //   name: 'Administrador de restaurante',
        //   value: 'owner' // restaurantAdm
        // },
        // worker: {
        //   name: 'Funcionário',
        //   value: 'employee' // worker
        // },
        appAdm: {
          name: 'Administrador da aplicação',
          value: 'admin' //appAdm
        }
      },
      routes: {
        admin: 'restaurantAdm',
        employee: 'worker',
        owner: 'appAdm'
      },

      dialogVisible: false,
      readTerms: false
    };
  },
  validations: {
    user: {
      name: { required },
      email: { required, email },
      type: { required },
      password: { required },
      passwordConfirm: { required, sameAsPassword: sameAs('password') }
    },
    readTerms: {
      checked: (value) => value === true
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
    openModal() {
      this.$v.user.$touch();
      if (!this.$v.user.$invalid) {
        this.dialogVisible = true;
      } else {
        this.openPdf = false;
      }
    },
    async createUser() {
      this.$v.$touch();
      if (!this.$v.user.$invalid && !this.$v.readTerms.$invalid) {
        await api
          .post('/users', this.user)
          .then((response) => {
            if (response.status == 201) {
              this.$router.go();
            }
          })
          .catch((error) => {
            console.log(error);
            this.$vToastify.error('Não foi possível criar usuário...');
          });
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
