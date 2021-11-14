<template lang="pug">
  div
    div
      Header(routeToGo="Dashboard" title="Editais")

    .d-flex.flex-column.justify-content-center
      div(class="optionsContainer")
        div
          div(@click="screenMediator('CreateQuiz')") Criar Questionário
          div(@click="screenMediator('QuizAnswers')") Questionários

</template>

<script>
import { ChevronLeftIcon } from 'vue-feather-icons';
import { mapActions, mapGetters } from 'vuex';
import Header from '@/components/Header/Header.vue';

export default {
  name: 'Notices',
  components: {
    ChevronLeftIcon,
    Header
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(['getWhereTo'])
  },
  created() {},
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
@import './_notices.scss';
</style>
