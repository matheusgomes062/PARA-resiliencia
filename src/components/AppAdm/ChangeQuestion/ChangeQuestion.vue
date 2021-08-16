<template>
  <div>
    <div class="header">
      <div class="goBackIcon">
      <chevron-left-icon
        size="2x"
        class="btn"
        @click="screenMediator('EditQuestions'), resetQuestionary()"
      ></chevron-left-icon>
    </div>
    <button @click="isFormValid">Alterar</button>
    </div>
    <div>
      <h1>Alterar questão</h1>
    </div>
    <div class="newQuestionContainer">
      <div class="question-group">
        <label class="form-label" for="question">Número da Questão</label>
        <input
          v-model="question.id"
          type="text"
          class="profile-control"
          placeholder="Ex: 1"
          id="question"
        />
      </div>
      <div class="question-group">
        <label class="form-label" for="question">Questão</label>
        <input
          v-model="question.title"
          type="text"
          class="profile-control"
          placeholder="Lorem Ipsum?"
          id="question"
        />
      </div>
      <div class="question-group">
        <label class="form-label" for="type">Tipo</label>
        <div class="question-options-container">
          <div v-for="(questionsType, index) in questionsType" :key="index" class="toggles-container">
            <label class="switch">
              <input type="checkbox" :value="questionsType.value" @click="checkType(questionsType.value)">
              <span class="slider round"></span>
            </label>
            {{ questionsType.name }}
          </div>
        </div>
        <!-- <select
          v-model="question.type"
          class="profile-control"
          @click="checkType()"
        >
          <option value="" selected disabled hidden>normal</option>
          <option
              v-for="(questionsType, index) in questionsType"
              :value="questionsType.value"
              :key="index"
              class="form-control"
            >
              {{ questionsType.name }}
            </option>
        </select> -->
      </div>
      <div class="question-group">
        <label class="form-label" for="options">Options</label>
        <textarea
          :disabled=hasOptions
          v-model="question.options"
          type="password"
          class="profile-control"
          placeholder="sim, não.."
          id="options"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { ChevronLeftIcon } from 'vue-feather-icons';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'ChangeQuestions',
  components: {
    ChevronLeftIcon,
  },
  data() {
    return {
      question: {
        id: '',
        title: '',
        type: '',
        options: []
      },
      questionsType: {
        normal: {
          name: 'normal',
          value: 'normal'
        },
        options: {
          name: 'opções',
          value: 'options'
        },
      },
      hasOptions: true
    };
  },
  computed: {
    ...mapGetters(['getWhereTo'])
  },
  methods: {
    ...mapActions(['setWhereTo', 'resetWhereTo', 'resetSelectedQuestionary']),
    screenMediator(whereTo) {
      this.resetWhereTo();
      this.setWhereTo(whereTo);
    },
    resetQuestionary() {
      this.resetSelectedQuestionary();
    },
    checkType(payload) {
      this.question.type = payload
      if (this.question.type == 'normal') return this.hasOptions = true
      if (this.question.type == 'options') return this.hasOptions = false
    },
    isFormValid() {
      this.$vToastify.success('Questão Alterada!');
    }
  }
};
</script>

<style lang="scss" scoped>
@import './_changeQuestion.scss';
</style>
