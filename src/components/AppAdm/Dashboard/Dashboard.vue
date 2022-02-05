<template lang="pug">
  div
    h1(class="cardTitle") PARA Resiliência
    b-col.justify-content-center
      h3(class="subtitle") Seja bem vindo(a)!
      b-col
        b-row.justify-content-around
          .buttonDiv(@click="screenMediator('Profile')") Perfil
          .buttonDiv(@click="screenMediator('Notices')") Editais
          .buttonDiv(@click="screenMediator('RegisterRestaurant')") Cadastrar restaurante
          .buttonDiv(@click="screenMediator('Configurations')") Configuração
          .buttonDiv(@click="screenMediator('RegisterUserScreen')") Cadastrar usuário ADM
          .buttonDiv(@click="logout") Sair
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { api } from '@/services/index';

export default {
  name: 'dashboard',
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters(['getWhereTo'])
  },
  created() {
    this.getQuestionaries();
  },
  methods: {
    ...mapActions([
      'setWhereTo',
      'resetWhereTo',
      'logoutUser',
      'setAllQuestionaries'
    ]),
    getQuestionaries() {
      api
        .get('/questionnaire')
        .then((response) => {
          if (response.status == 200) {
            this.setAllQuestionaries(response.data);
          } else {
            console.log('error');
          }
        })
        .catch((error) => {
          console.log(error.response);
        });
    },
    screenMediator(whereTo) {
      this.resetWhereTo();
      this.setWhereTo(whereTo);
    },
    logout() {
      this.logoutUser();
      this.$router.push('/');
    }
  }
};
</script>

<style lang="scss" scoped>
@import './_dashboard.scss';
</style>
