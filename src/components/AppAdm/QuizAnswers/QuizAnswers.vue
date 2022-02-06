<template lang="pug">
  div
    Header(routeToGo="Notices" title="Editais")

    h5.d-flex.justify-content-start.w-100 Questionários

    div(style="height: 250px; overflow-y: auto;")
      div(v-for="(questionnaire, index) in questionnaires" :key="index" class="questionariesContainer")
        h5 {{questionnaire.title}}
        el-button(icon="el-icon-view" @click="setQuestionnaire(questionnaire)" circle)
      div(v-if="questionnaires.length === 0")
        el-empty(description="Sem Questionários")

</template>

<script>
import { ChevronLeftIcon } from 'vue-feather-icons';
import { mapActions, mapGetters } from 'vuex';
import Header from '@/components/Header/Header.vue';

export default {
  name: 'QuizAnswers',
  components: {
    ChevronLeftIcon,
    Header
  },
  data() {
    return {
      questionnaires: []
    };
  },
  computed: {
    ...mapGetters(['getWhereTo', 'getQuestionaries'])
  },
  created() {
    this.getAllQuestionaries()
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
      this.questionnaires = this.getQuestionaries;
      this.sortQuestionnaires();
    },
    setQuestionary(questionaryId) {
      this.resetSelectedQuestionary();
      this.setSelectedQuestionary(questionaryId);
    },
    sortQuestionnaires() {
      this.questionnaires.sort((a,b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0))
    },
    setQuestionnaire(questionnaire) {
      this.resetSelectedQuestionary();
      this.setSelectedQuestionary(questionnaire);
      this.screenMediator('Answers')
    }
  }
};
</script>

<style lang="scss" scoped>
@import './_quizAnswers.scss';
</style>
