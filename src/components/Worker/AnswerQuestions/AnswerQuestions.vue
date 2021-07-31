<template>
  <div>
    <div class="header">
      <div class="goBackIcon">
      <chevron-left-icon
        size="2x"
        class="btn"
        @click="screenMediator('Questionaries')"
      ></chevron-left-icon>
    </div>
    <button @click="isFormValid">Enviar</button>
    </div>
    <div>
      <h1 class="title">Título</h1>
    </div>
    <div class="questionsContainer">
      <div class="optionsType">
        <div class="questionContent">
          <div class="question">
            <p>Questão 1: </p>
            <h3>Lorem Ipsum</h3>
          </div>
          <div class="options">
            <p>Resposta:</p>
            <textarea v-if="false"></textarea>
            <select v-if="true" class="questionOptions">
              <option>sim</option>
              <option>não</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ChevronLeftIcon } from 'vue-feather-icons';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'EditQuestions',
  components: {
    ChevronLeftIcon
  },
  data() {
    return {
      selectedQuestion: false
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
    isFormValid() {
      this.$vToastify.success('Respostas enviadas!');
    }
  }
}
</script>

<style lang="scss" scoped>
@import './_answerQuestions.scss';
</style>
