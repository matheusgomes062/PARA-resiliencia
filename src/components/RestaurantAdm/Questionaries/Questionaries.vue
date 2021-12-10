<template lang="pug">
  div
    Header(routeToGo="Notices" title="Questionários")
    div(style=" height: 250px; overflow-y:auto;")
      div(v-for="(questionnaire, index) in getNoticesQuestionaries" :key="index" class="questionariesContainer")
        div(class="questionary")
          div(class="questionaryTitle")
            h5 {{questionnaire.title}}
          
          div.d-flex.flex-row.justify-content-between

            el-button(icon="el-icon-view" @click="setQuestionary(questionnaire.id), screenMediator('AnswerQuestions')" circle)
</template>

<script>
import { ChevronLeftIcon } from 'vue-feather-icons';
import { mapActions, mapGetters } from 'vuex';
import Header from '@/components/Header/Header.vue';

export default {
  name: 'Questionaries',
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
    ...mapGetters(['getWhereTo', 'getNoticesQuestionaries'])
  },
  created() {

  },
  methods: {
    ...mapActions([
      'setWhereTo',
      'resetWhereTo',
      'setSelectedQuestionary',
      'resetSelectedQuestionary'
    ]),
    setQuestionary(questionary) {
      this.resetSelectedQuestionary();
      this.setSelectedQuestionary(questionary);
    },
    screenMediator(whereTo) {
      this.$destroy();
      this.resetWhereTo();
      this.setWhereTo(whereTo);
    }
  }
};
</script>

<style lang="scss" scoped>
@import './_questionaries.scss';
</style>
