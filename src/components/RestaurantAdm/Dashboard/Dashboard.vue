<template>
  <div>
    <h1 class="cardTitle">PARA Resiliência</h1>
    <div>
      <h3 class="subtitle">Seja bem vindo(a)!</h3>
      <div class="optionsContainer">
        <div
          @click="screenMediator('RegisterRestaurant')"
          id="RegisterRestaurantDashboardButton"
        >
          Cadastre seu restaurante
        </div>
        <div
          @click="screenMediator('AnswerQuiz')"
          id="AnswerQuizDashboardButton"
        >
          Responder questionário
        </div>
        <div @click="screenMediator('OtherOptions')">Outras opções</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'RestaurantAdmDashboard',
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
    ...mapActions(['setWhereTo', 'resetWhereTo']),
    screenMediator(whereTo) {
      this.resetWhereTo();
      this.setWhereTo(whereTo);
    },
    logout() {
      this.$router.push('/');
    }
  }
};
</script>

<style lang="scss" scoped>
@import './_dashboard.scss';
</style>
