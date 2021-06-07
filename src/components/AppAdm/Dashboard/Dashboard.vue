<template>
  <div>
    <h1 class="cardTitle">Resiliência</h1>
    <div>
      <h3 class="subtitle">Seja bem vindo(a)!</h3>
      <div class="optionsContainer">
        <div>
          <div @click="screenMediator('Profile')">Perfil</div>
          <div @click="screenMediator('QuizAnswer')">
            Respostas do questionário
          </div>
          <div @click="screenMediator('EditQuiz')">Editar questionário</div>
        </div>
        <div>
          <div @click="screenMediator('RegisterRestaurant')">
            Cadastrar restaurante
          </div>
          <div @click="screenMediator('Configurations')">Configuração</div>
          <div @click="screenMediator('Quit')">Sair</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'dashboard',
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
    }
  }
};
</script>

<style lang="scss" scoped>
@import './_dashboard.scss';
</style>
