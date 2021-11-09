<template lang="pug">
  div
    div(class="header")
      div(class="goBackIcon")
        chevron-left-icon(
          size="2x"
          class="btn"
          @click="screenMediator('Dashboard')")
    div
      h1(class="quizAnswerTitle") Editais

    h3(class="quizAnswerSubTitle") Questionários

    div(v-for="(questionaries, index) in questionaries" :key="index" class="questionariesContainer")
      div(class="questionary")
        div(class="questionaryTitle")
            h2 {{questionaries.id}}
            h2 {{questionaries.title}}
        //- button(class="openBtn" @click="setQuestionary(questionaries.id), screenMediator('Answers')") Abrir

        el-button(icon="el-icon-search" circle).p-0

</template>

<script>
import { ChevronLeftIcon } from 'vue-feather-icons';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'QuizAnswers',
  components: {
    ChevronLeftIcon
  },
  data() {
    return {
      Questionaries: '',
      questionaries: [
        {
          id: 1,
          title: 'TITLE0'
        },
        {
          id: 2,
          title: 'TITLE1'
        }
      ],
      activeQuestion: ''
    };
  },
  computed: {
    ...mapGetters(['getWhereTo', 'getQuestionaries'])
  },
  created() {
    this.getAllQuestionaries();
  },
  methods: {
    ...mapActions([
      'setWhereTo',
      'resetWhereTo',
      'setSelectedQuestionary',
      'resetSelectedQuestionary'
    ]),
    screenMediator(whereTo) {
      this.resetWhereTo();
      this.setWhereTo(whereTo);
    },
    getAllQuestionaries() {
      this.Questionaries = this.getQuestionaries;
    },
    setQuestionary(questionaryId) {
      this.resetSelectedQuestionary();
      this.setSelectedQuestionary(questionaryId);
    }
  }
};
</script>

<style lang="scss" scoped>
@import './_quizAnswers.scss';
</style>
