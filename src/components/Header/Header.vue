<template lang="pug">
  div.d-flex.flex-direction-row.pb-3.align-items-center
    div(class="goBackIcon" v-if="routeToGo")
      chevron-left-icon(
        size="2x"
        @click="screenMediator(routeToGo)")
    div.mx-auto(v-if="title")
      h1(class="headerTitle").d-flex.align-self-center {{ title }}
</template>

<script>
import { ChevronLeftIcon } from 'vue-feather-icons';
import { mapActions } from 'vuex';

export default {
  name: 'Header',
  components: {
    ChevronLeftIcon
  },
  props: {
    routeToGo: {
      type: String
    },
    title: {
      type: String
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
