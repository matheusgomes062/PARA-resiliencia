<template>
  <div>
    <div class="header">
      <div class="goBackIcon">
      <chevron-left-icon
        size="2x"
        class="btn"
        @click="screenMediator('Questionaries')"
      ></chevron-left-icon>
    </div>
    <button @click="isFormValid">Enviar</button>
    </div>
    <h1 class="title">Teste piloto 5: Administração</h1>
    <p class="description">{{ description }}</p>
    <div class="mainContainer">
      <div class="questionContainer">
        <div class="questionContent" v-for="(question, index) in QuestionsList" :key="index">
          <div class="titleContainer">
            <h3>{{question.id}}.</h3>
            <p>{{question.title}}</p>
          </div>
          <div v-if="question.type === 'options'" class="optionsContainer">
            <div v-for="(option, index) in question.options" :key="index" class="toggles-container">
              <label class="switch">
                <input :id="question.id" type="checkbox" :value="option" @click="fillAnswers(option, question.id)">
                <span class="slider round"></span>
              </label>
              <p>{{ option }}</p>
            </div>
          </div>
          <div v-if="question.type === 'normal'" class="options">
            <textarea></textarea>
          </div>
          <div v-if='isQuestionInvalid() && dirty' class="error"> Campo Requerido</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ChevronLeftIcon } from 'vue-feather-icons';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'AnswerQuestions',
  components: {
    ChevronLeftIcon
  },
  data() {
    return {
      selectedQuestion: false,
      description: 'Prezado senhor(a): A contaminação dos alimentos e refeições produzidas nos restaurantes pode ocasionar diversos danos à saúde dos indivíduos. As Doenças Transmitidas por Alimentos geram milhares de adoecimentos e mortes por todo o mundo anualmente. Acredita-se que um maior controle dos elementos envolvidos na produção de refeições possa atuar na prevenção destas doenças pela garantia da segurança dos alimentos. Esta pesquisa é dirigida a todos aqueles que trabalham em restaurantes, ou seja, aos donos, gerentes, chefes, cozinheiros, garçons, trabalhadores da limpeza e motoboys, que concordam em participar deste estudo. A finalidade é realizar o teste piloto do aplicativo móvel para celular “PARA Resiliência”. Serão feitas perguntas sobre características do seu local de trabalho, relacionamentos entre equipe, participação em treinamentos, funcionalidade do app e dados como idade, gênero, escolaridade e tempo de atuação na área. O senhor(a) responderá ao questionário de forma anônima, e os resultados serão utila',
      QuestionsList: [
        {
          id: 1,
          type: 'options',
          title: 'Você achou que o conteúdo ensinado nesses treinamentos mudou o seu pensamento em relação ao seu trabalho? (se você for o responsável por efetuaros treinamentos, não responder esta pergunta)',
          options: ['Sim', 'Não']
        },
        {
          id: 2,
          type: 'options',
          title: 'Você achou que o conteúdo ensinado nesses treinamentos mudou o seu pensamento em relação ao seu trabalho? (se você for o responsável por efetuaros treinamentos, não responder esta pergunta)',
          options: ['Sim', 'Não']
        },
        {
          id: 3,
          type: 'normal',
          title: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
        }
      ],
      answers: [],
      invalidQuestions: [],
      dirty: false,
      isAllFilled: false
    };
  },
  computed: {
    ...mapGetters(['getWhereTo'])
  },
  created() {
    this.buildObjAnswers();
  },
  methods: {
    ...mapActions(['setWhereTo', 'resetWhereTo']),
    screenMediator(whereTo) {
      this.resetWhereTo();
      this.setWhereTo(whereTo);
    },
    isFormValid() {
      this.dirty = true
      let i = 1
      while (i <= this.QuestionsList.length) {
        if (this.answers[i].value === '') {
          this.invalidQuestions.push(this.answers[i].questionId) 
          this.isAllFilled = true;
        } else this.isAllFilled = false;
        i++
      }
      this.$vToastify.success('Respostas enviadas!');
    },
    isQuestionInvalid(Id) {
      let i = 1
      while (i <= this.QuestionsList.length) {
        if (this.answers[i].value === '' && this.answers[i].id === Id) {
          return true
        } else i++
      }
    },
    buildObjAnswers() {
      let i = 1;
      while (i <= this.QuestionsList.length) {
        this.answers.push({
          "questionId": '',
          "value": ''
        })
        i++
      }
      console.log(this.answers)
    },
    fillAnswers(option, Id) {
      let checkbox = document.getElementById(Id);
      if (!checkbox.checked) {
        let i = 0
        while (i <= this.answers.length) {
          console.log(this.answers[i].questionId, Id)
          if (this.answers[i].questionId === Id) {
            this.answers[i].value = ''
          }
          i++
        }
      } else {
        if (this.answers[Id - 1].value != '') {
          this.answers[Id - 1].value = ''
        }
        this.answers[Id - 1].questionId = Id
        this.answers[Id - 1].value += option
      }
      console.log(this.answers)
    }
  }
}
</script>

<style lang="scss" scoped>
@import './_answerQuestions.scss';
</style>
