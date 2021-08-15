<template>
  <div>
    <div class="header">
      <div class="goBackIcon">
      <chevron-left-icon
        size="2x"
        class="btn"
        @click="screenMediator('QuizAnswers')"
      ></chevron-left-icon>
    </div>
    </div>
    <div>
      <h1 class="title">Título</h1>
    </div>
    <div class="mainContainer">
      <div class="questionContainer">
        <div class="questionContent" v-for="(question, index) in QuestionsList" :key="index">
          <div class="titleContainer">
            <h3>{{question.id}}.</h3>
            <p>{{question.title}}</p>
          </div>
          <div class="answersTitle">
            <p>Respostas:</p>
          </div>
          <div v-if="true" class="optionsContainer">
            <div v-for="(options, index) in question.options" :key="index" class="toggles-container">
              <p>{{ options.option }} - {{ options.percentage }}</p>
            </div>
          </div>
          <div v-if="false" class="options">
            <textarea></textarea>
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
  name: 'Answers',
  components: {
    ChevronLeftIcon
  },
  data() {
    return {
      selectedQuestion: false,
      QuestionsList: [
        {
          id: 1,
          title: 'Você achou que o conteúdo ensinado nesses treinamentos mudou o seu pensamento em relação ao seu trabalho? (se você for o responsável por efetuaros treinamentos, não responder esta pergunta)',
          options: [
            {
              option: 'sim',
              percentage: '70%'
            },
            {
              option: 'não',
              percentage: '30%'
            }
          ]
        },
        {
          id: 2,
          title: 'Você achou que o conteúdo ensinado nesses treinamentos mudou o seu pensamento em relação ao seu trabalho? (se você for o responsável por efetuaros treinamentos, não responder esta pergunta)',
          options: [
            {
              option: 'sim',
              percentage: '50%'
            },
            {
              option: 'não',
              percentage: '50%'
            }
          ]
        }
      ]
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
  }
}
</script>

<style lang="scss" scoped>
@import './_answers.scss';
</style>
