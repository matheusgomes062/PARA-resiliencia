<template>
  <div>
    <div class="header">
      <div class="goBackIcon">
        <chevron-left-icon
          size="2x"
          class="btn"
          @click="screenMediator('Dashboard')"
        ></chevron-left-icon>
      </div>
    </div>
    <div>
      <h1>Questionários</h1>
    </div>
    <div class="questionariesContainer">
      <div class="questionary">
        <div class="title">
            <h2>TÍTULO</h2>
        </div>
        <button class="openBtn" @click="screenMediator('AnswerQuestions')">
          Abrir
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ChevronLeftIcon } from 'vue-feather-icons';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'EditQuestionary',
  components: {
    ChevronLeftIcon
  },
  data() {
    return {

    };
  },
  computed: {
    ...mapGetters(['getWhereTo'])
  },
  methods: {
    ...mapActions(['setWhereTo', 'resetWhereTo']),
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
