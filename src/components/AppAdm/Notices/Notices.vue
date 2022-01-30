<template lang="pug">
  div
    div
      Header(routeToGo="Dashboard" title="Editais")

    .d-flex.flex-column.justify-content-center
      div(class="optionsContainer")
        div
          div(@click="screenMediator('CreateNotices')") Criar Edital
          div(@click="screenMediator('QuizAnswers')") Selecionar Edital
          div(@click="screenMediator('Metrics')") Métricas

</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Header from '@/components/Header/Header.vue';

export default {
  name: 'Notices',
  components: {
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
    ...mapActions(['setWhereTo', 'resetWhereTo', 'setAllQuestionaries']),
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
