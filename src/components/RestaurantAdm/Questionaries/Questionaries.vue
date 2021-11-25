<template lang="pug">
  div
    Header(routeToGo="Dashboard" title="Questionários")
    div(v-for="(questionaries, index) in questionaries" :key="index" class="questionariesContainer")
      div(class="questionary")
        div(class="questionaryTitle")
          h5 {{questionaries.title}}
        
        div.d-flex.flex-row.justify-content-between

          el-button(icon="el-icon-view" @click="screenMediator('AnswerQuestions'), setQuestionary(questionaries.id)" circle)
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
      questionaries: [
        {
          id: 1,
          title: 'Questionário 0'
        },
        {
          id: 2,
          title: 'Questionário 1'
        }
      ]
    };
  },
  computed: {
    ...mapGetters(['getWhereTo'])
  },
  methods: {
    ...mapActions(['setWhereTo', 'resetWhereTo']),
    setQuestionary(questionary) {
      this.resetSelectedQuestionary();
      this.setSelectedQuestionary(questionary);
    },
    screenMediator(whereTo) {
      this.resetWhereTo();
      this.setWhereTo(whereTo);
    },
  }
}
</script>

<style lang="scss" scoped>
@import './_questionaries.scss';
</style>
