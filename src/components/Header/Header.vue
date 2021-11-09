<template lang="pug">
  div.d-flex.flex-direction-row.pb-3.align-items-center
    div(class="goBackIcon")
      chevron-left-icon(
        size="2x"
        @click="screenMediator(routeToGo)")
    div.mx-auto
      h1(class="headerTitle").d-flex.align-self-center {{ title }}
</template>

<script>
import { ChevronLeftIcon } from 'vue-feather-icons';
import { mapActions } from 'vuex';

export default {
  name: 'QuizAnswers',
  components: {
    ChevronLeftIcon
  },
  props: {
    routeToGo: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  },
  data() {
    return {};
  },
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
@import './_header.scss';
</style>
