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
          <div v-if="
            question.type !== 'normal'" 
            class="optionsContainer"
          >
            <div v-for="(option, index) in question.options" :key="index" class="toggles-container">
              <label class="switch">
                <input :id="question.id" type="checkbox" :value="option" @click="fillOptions(option, question.id)">
                <span class="slider round"></span>
              </label>
              <p>{{ option }}</p>
            </div>
          </div>
          <div v-if="question.type === 'normal' || question.type === 'others'" class="options">
            <textarea v-model="answers[index].text"></textarea>
          </div>
          <div v-if='dirty' class="error">{{isQuestionInvalid(question.id)}}</div>
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
          type: 'SingleOptions',
          title: 'Você achou que o conteúdo ensinado nesses treinamentos mudou o seu pensamento em relação ao seu trabalho? (se você for o responsável por efetuaros treinamentos, não responder esta pergunta)',
          options: ['Sim', 'Não']
        },
        {
          id: 2,
          type: 'SingleOptions',
          title: 'Você achou que o conteúdo ensinado nesses treinamentos mudou o seu pensamento em relação ao seu trabalho? (se você for o responsável por efetuaros treinamentos, não responder esta pergunta)',
          options: ['Sim', 'Não']
        },
        {
          id: 3,
          type: 'normal',
          title: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
        },
        {
          id: 4,
          type: 'others',
          title: 'Você achou que o conteúdo ensinado nesses treinamentos mudou o seu pensamento em relação ao seu trabalho? (se você for o responsável por efetuaros treinamentos, não responder esta pergunta)',
          options: ['Sim', 'Não']
        },
        {
          id: 5,
          type: 'multipleOptions',
          title: 'Você achou que o conteúdo ensinado nesses treinamentos mudou o seu pensamento em relação ao seu trabalho? (se você for o responsável por efetuaros treinamentos, não responder esta pergunta)',
          options: ['Sim', 'Não']
        }
      ],
      answers: [],
      invalidQuestions: [],
      dirty: false,
      isAllFilled: false,
      invalidAnswers: [],
      test: ''
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

      if (this.invalidAnswers.length === 0) this.$vToastify.success('Respostas enviadas!');
      else this.$vToastify.error('Formulário Inválido');
    },
    validateAnswers(Id) {
      let i = 0
      while (i <= this.invalidAnswers.length) {
        if (this.invalidAnswers[i] === Id) {
          this.invalidAnswers.splice(i, 1);
        }
        i++
      }
    },
    isQuestionInvalid(Id) {
      let type = this.QuestionsList[Id - 1].type

      if (this.dirty) {
        switch (type) {
          case 'SingleOptions':
            if (this.answers[Id - 1].value.length <=0) return 'Campo Invalido'
            else if (this.answers[Id - 1].value.length > 1) return 'Campo Invalido'
            else {
              this.validateAnswers(Id);
            }
            break;
          case 'multipleOptions':
            if (this.answers[Id - 1].value.length <=0) return 'Campo Invalido'
            else {
              this.validateAnswers(Id);
            }
            break;
          case 'normal':
            if (!this.answers[Id - 1].text) return 'Campo Invalido'
            else {
              this.validateAnswers(Id);
            }
            break;
          case 'others':
            if (this.answers[Id - 1].value.length <=0) return 'Campo Invalido'
            if (!this.answers[Id - 1].text) return 'Campo Invalido'
            else {
              this.validateAnswers(Id);
            }
            break;
        }

        console.log(this.invalidAnswers)
      }
    },
    buildObjAnswers() {
      let i = 1;
      while (i <= this.QuestionsList.length) {
        this.invalidAnswers.push(i)
        this.answers.push({
          "questionId": i,
          "value": [],
          "text": ''
        })
        i++
      }
      console.log(this.invalidAnswers)
      console.log(this.answers)
    },
    fillOptions(option, Id) {
      let checkbox = document.getElementById(Id);
      let i = 0
      let removed = false

      while (i <= this.answers[Id - 1].value.length) {
        if (option === this.answers[Id - 1].value[i]) {
          this.answers[Id - 1].value.splice(this.answers[Id - 1].value.indexOf(option), 1);
          removed = true
        }
        i++
      }

      if (!removed) {
        this.answers[Id - 1].value.push(option)
      }
      removed = false
      console.log(this.answers)
    }
  }
}
</script>

<style lang="scss" scoped>
@import './_answerQuestions.scss';
</style>
