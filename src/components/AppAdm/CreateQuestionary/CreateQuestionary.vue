<template>
  <div>
    <div class="header">
      <div class="goBackIcon">
      <chevron-left-icon
        size="2x"
        class="btn"
        @click="screenMediator('EditQuestionary')"
      ></chevron-left-icon>
    </div>
    <button @click="isFormValid">Criar</button>
    </div>
    <div>
      <h1>Novo questionário</h1>
    </div>
    <div class="newQuestionaryContainer">
      <div class="questionary-group">
        <label class="form-label" for="questionary">Título</label>
        <input
          v-model="questionary.title"
          type="text"
          class="profile-control"
          placeholder="Lorem Ipsum"
          id="questionary"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { ChevronLeftIcon } from 'vue-feather-icons';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'CreateQuestionary',
  components: {
    ChevronLeftIcon,
  },
  data() {
    return {
      questionary: {
        title: '',
      },
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
    isFormValid() {
      this.$vToastify.success('Questionário criado!');
    }
  }
};
</script>

<style lang="scss" scoped>
@import './_createQuestionary.scss';
</style>
