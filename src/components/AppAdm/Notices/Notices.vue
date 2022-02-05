<template lang="pug">
  div
    Header(routeToGo="Dashboard" title="Editais")

    b-col.justify-content-center
      b-row.justify-content-around
        .buttonDiv(@click="screenMediator('CreateNotices')") Criar Edital
        .buttonDiv(@click="screenMediator('QuizAnswers')") Selecionar Edital
        .buttonDiv(@click="screenMediator('Metrics')") Métricas

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
