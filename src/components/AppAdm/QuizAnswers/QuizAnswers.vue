<template lang="pug">
  div
    div(class="header")
      div(class="goBackIcon")
        chevron-left-icon(
          size="2x"
          class="btn"
          @click="screenMediator('Dashboard')")
    div
      h1 Editais

    h3.mx-4 Questionários
    el-collapse(accordion v-model="activeQuestion")
      el-collapse-item(title="Questionário 1" name="1")
        <div>Consistent with real life: in line with the process and logic of real life, and comply with languages and habits that the users are used to;</div>
      el-collapse-item(title="Questionário 2" name="2")
        <div>Consistent with real life: in line with the process and logic of real life, and comply with languages and habits that the users are used to;</div>
      el-collapse-item(title="Questionário 3" name="3")
        <div>Consistent with real life: in line with the process and logic of real life, and comply with languages and habits that the users are used to;</div>

    div(v-for="(questionaries, index) in questionaries" :key="index" class="questionariesContainer")
      div(class="questionary")
        div(class="title")
            h2 {{questionaries.id}}
            h2 {{questionaries.title}}
        button(class="openBtn" @click="setQuestionary(questionaries.id), screenMediator('Answers')")
        |  Abrir
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
