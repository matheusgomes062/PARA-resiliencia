<template lang="pug">
  div
    h1(class="cardTitle") PARA Resiliência
    div.d-flex.flex-column.justify-content-center
      h3(class="subtitle") Seja bem vindo(a)!
      div(class="optionsContainer")
        div
          div(@click="screenMediator('Profile')") Perfil
          div(@click="screenMediator('Notices')") Editais
          //- div(@click="screenMediator('RegisterRestaurant')") Cadastrar restaurante
        div.justify-content-start
          div(@click="screenMediator('Configurations')") Configuração
          div(@click="logout") Sair
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
