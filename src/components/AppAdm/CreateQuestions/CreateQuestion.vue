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
      <h1>Nova questão</h1>
    </div>
    <div class="newQuestionContainer">
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
        <select
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
        </select>
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
  name: 'CreateQuestions',
  components: {
    ChevronLeftIcon,
  },
  data() {
    return {
      question: {
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
    ...mapActions(['setWhereTo', 'resetWhereTo']),
    screenMediator(whereTo) {
      this.resetWhereTo();
      this.setWhereTo(whereTo);
    },
    checkType() {
      if (this.question.type == 'normal') return this.hasOptions = true
      if (this.question.type == 'options') return this.hasOptions = false
    },
    isFormValid() {
      this.$vToastify.success('Questão criada!');
    }
  }
};
</script>

<style lang="scss" scoped>
@import './_createQuestions.scss';
</style>
