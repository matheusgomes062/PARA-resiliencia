<template>
  <div>
    <div class="header">
      <div class="goBackIcon">
      <chevron-left-icon
        size="2x"
        class="btn"
        @click="screenMediator('Questionaries'), resetQuestionary()"
      ></chevron-left-icon>
    </div>
    <div class="buttonsContainer">
        <button @click="screenMediator('ChangeQuestion')" class="saveBtn">Alterar Questão</button>
        <button @click="screenMediator('CreateQuestion')" class="addBtn">Criar Questão</button>
        <button @click="deleteQuestions()" class="saveBtn">Deletar Questões</button>
    </div>
    </div>
    <div class="titlePage">
      <h1 class="title">Título</h1>
    </div>
    <div class="mainContainer">
      <div class="questionContainer">
        <div class="questionContent" v-for="(question, index) in QuestionsList" :key="index">
          <div class="questions">
            <div class="titleContainer">
              <h3>{{question.id}}.</h3>
              <p>{{question.title}}</p>
            </div>
            <div class="answersTitle">
              <p>Opções:</p>
            </div>
            <div v-if="true" class="optionsContainer">
              <div v-for="(options, index) in question.options" :key="index" class="toggles-container">
                <li>{{ options.option }}</li>
              </div>
            </div>
            <div v-if="false" class="options">
              <textarea></textarea>
            </div>
          </div>
          <div class="selectOptions">
            <div class="round">
              <input type="checkbox" :id="question.id" @click="grabSelectedQuestions(question.id)"/>
              <label :for="question.id"></label>
            </div>
          </div>
        </div>
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
      selectedQuestion: false,
      QuestionsList: [
        {
          id: 1,
          title: 'Você achou que o conteúdo ensinado nesses treinamentos mudou o seu pensamento em relação ao seu trabalho? (se você for o responsável por efetuaros treinamentos, não responder esta pergunta)',
          options: [
            {
              option: 'sim',
            },
            {
              option: 'não',
            }
          ]
        },
        {
          id: 2,
          title: 'Você achou que o conteúdo ensinado nesses treinamentos mudou o seu pensamento em relação ao seu trabalho? (se você for o responsável por efetuaros treinamentos, não responder esta pergunta)',
          options: [
            {
              option: 'sim',
            },
            {
              option: 'não',
            }
          ]
        }
      ],
      selectedQuestions: []
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
    deleteQuestions() {
      this.$vToastify.success('Questões deletadas!');
    },
    saveChanges() {
      this.$vToastify.success('Questão alterada!');
    },
    grabSelectedQuestions(Id) {
      let checkbox = document.getElementById(Id);
      if (!checkbox.checked) {
        let i = 0
        while (i <= this.selectedQuestions.length) {
          if (this.selectedQuestions[i] === Id) {
            this.selectedQuestions.splice(this.selectedQuestions.indexOf(Id), 1)
          }
          i++
        }
      } else {
        this.selectedQuestions.push(Id)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import './_editQuestions.scss';
</style>
