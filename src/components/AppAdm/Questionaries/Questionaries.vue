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
    <div v-for="(questionay, index) in questionaries" :key="index" class="questionariesContainer">
      <div class="questionary">
        <div class="title">
            <h2>{{questionay.id}}.</h2>
            <h2>{{questionay.title}}</h2>
        </div>
        <button class="openBtn" @click="screenMediator('EditQuestions')">
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
      questionaries: [
        {
          id: 1,
          title: 'TITLE0'
        },
        {
          id: 2,
          title: 'TITLE1'
        }
      ]
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
