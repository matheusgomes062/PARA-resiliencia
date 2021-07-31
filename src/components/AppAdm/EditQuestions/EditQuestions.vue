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
    <div class="buttonsContainer">
        <button @click="saveChanges" class="saveBtn">Salvar Alterações</button>
        <button @click="screenMediator('CreateQuestion')" class="addBtn">Criar Questão</button>
    </div>
    </div>
    <div class="titlePage">
      <h1 class="title">Título</h1>
    </div>
    <div class="questionsContainer">
      <div v-if="true" class="normalType">
        <div class="question">
            <p>Questão 1: </p>
            <input value="lorem ipsum">
        </div>
        <div
            size="2x"
            class="deleteBtn"
            @click="deleteQuestion()"
        >X</div>
      </div>
      <div v-if="false" class="optionsType">
        <div class="questionContent">
          <div class="question">
            <p>Questão x: </p>
            <input value="lorem ipsum">
          </div>
          <div class="options">
            <p>Opções:</p>
            <textarea>test, test</textarea>
          </div>
        </div>
        <div
            size="2x"
            class="deleteBtn"
            @click="deleteQuestion()"
        >X</div>
      </div>
    </div>
  </div>
</template>

<script>
import { ChevronLeftIcon } from 'vue-feather-icons';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'EditQuestions',
  components: {
    ChevronLeftIcon
  },
  data() {
    return {
      selectedQuestion: false
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
    deleteQuestion() {
      this.$vToastify.success('Questão deletada!');
    },
    saveChanges() {
      this.$vToastify.success('Questão alterada!');
    }
  }
}
</script>

<style lang="scss" scoped>
@import './_editQuestions.scss';
</style>
