<template lang="pug">
  div
    h1.cardTitle PARA Resiliência
    div
      h3.subtitle Seja bem vindo(a)!
      .optionsContainer
        #AnswerQuizDashboardButton(@click="screenMediator('Questionaries')").

          Responder questionário
          
        //-  <div @click="screenMediator('OtherOptions')">Outras opções</div> 
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'WorkerDashboard',
  components: {},
  data() {
    return {
      // whereTo: null
    };
  },
  computed: {
    ...mapGetters(['getWhereTo'])
  },
  methods: {
    ...mapActions(['setWhereTo', 'resetWhereTo', 'logoutUser']),
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
