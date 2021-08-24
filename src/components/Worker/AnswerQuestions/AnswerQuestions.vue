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
    <div class="mainContainer">
      <div class="questionContainer">
        <div class="questionContent" v-for="(question, index) in QuestionsList" :key="index">
          <div class="titleContainer">
            <h3>{{question.id}}.</h3>
            <p>{{question.title}}</p>
          </div>
          <div v-if="question.type === 'options'" class="optionsContainer">
            <div v-for="(option, index) in question.options" :key="index" class="toggles-container">
              <label class="switch">
                <input type="checkbox" :value="option" @click="checkType(option)">
                <span class="slider round"></span>
              </label>
              <p>{{ option }}</p>
            </div>
          </div>
          <div v-if="question.type === 'normal'" class="options">
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
  name: 'AnswerQuestions',
  components: {
    ChevronLeftIcon
  },
  data() {
    return {
      selectedQuestion: false,
      QuestionsList: [
        {
          id: 1,
          type: 'options',
          title: 'Você achou que o conteúdo ensinado nesses treinamentos mudou o seu pensamento em relação ao seu trabalho? (se você for o responsável por efetuaros treinamentos, não responder esta pergunta)',
          options: ['Sim', 'Não']
        },
        {
          id: 2,
          type: 'options',
          title: 'Você achou que o conteúdo ensinado nesses treinamentos mudou o seu pensamento em relação ao seu trabalho? (se você for o responsável por efetuaros treinamentos, não responder esta pergunta)',
          options: ['Sim', 'Não']
        },
        {
          id: 2,
          type: 'normal',
          title: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
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
    isFormValid() {
      this.$vToastify.success('Respostas enviadas!');
    }
  }
}
</script>

<style lang="scss" scoped>
@import './_answerQuestions.scss';
</style>
