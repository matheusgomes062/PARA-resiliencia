<template lang="pug">
  div(style="width: 700px; height: 500px; overflow-y: auto;")
    Header(routeToGo="Questionaries" :title="questionList.title")
    
    p.my-3.px-3(class="description") {{ description }}
    
    div.p-2.d-flex.flex-column.my-3
      div.py-3(v-for="(question, index) in questionList.questions" :key="index")
        div.d-flex(style="max-width: 630px;")
          h3(style="margin-right: 10px;") {{index}}.
          p(style="max-width: 800px; text-align: left;") {{question.title}}
          
        div(v-if="question.type === 'options'" class="questionsContainer")
          div.d-flex.align-items-center.my-2(v-for="(option, index) in question.options" :key="index" )
            label(class="switch")
              input(:id="question.id" type="checkbox" :value="option" @click="fillAnswers(option, question.id)")
              span(class="slider round")
            p.px-2 {{ option }}
        div(v-if="question.type === 'normal'" style="padding: 20px 10px 20px 30px")
          textarea.w-100

        //- div(v-if='isQuestionInvalid() && dirty' class="error") Campo Requerido

      div.d-flex.justify-content-end.my-3.px-3
        el-button(@click="isFormValid" type="primary") Enviar
</template>

<script>
import { ChevronLeftIcon } from 'vue-feather-icons';
import { mapActions, mapGetters } from 'vuex';
import Header from '@/components/Header/Header.vue';
import { api } from '@/services/index';

export default {
  name: 'AnswerQuestions',
  components: {
    Header,
    ChevronLeftIcon
  },
  data() {
    return {
      selectedQuestion: false,
      description:
        'Prezado senhor(a): A contaminação dos alimentos e refeições produzidas nos restaurantes pode ocasionar diversos danos à saúde dos indivíduos. As Doenças Transmitidas por Alimentos geram milhares de adoecimentos e mortes por todo o mundo anualmente. Acredita-se que um maior controle dos elementos envolvidos na produção de refeições possa atuar na prevenção destas doenças pela garantia da segurança dos alimentos. Esta pesquisa é dirigida a todos aqueles que trabalham em restaurantes, ou seja, aos donos, gerentes, chefes, cozinheiros, garçons, trabalhadores da limpeza e motoboys, que concordam em participar deste estudo. A finalidade é realizar o teste piloto do aplicativo móvel para celular “PARA Resiliência”. Serão feitas perguntas sobre características do seu local de trabalho, relacionamentos entre equipe, participação em treinamentos, funcionalidade do app e dados como idade, gênero, escolaridade e tempo de atuação na área. O senhor(a) responderá ao questionário de forma anônima, e os resultados serão utila',
      questionList: [],
      answers: [],
      invalidQuestions: [],
      dirty: false,
      isAllFilled: false
    };
  },
  computed: {
    ...mapGetters(['getWhereTo', 'getSelectedQuestionary'])
  },
  created() {
    this.requestQuestions();
  },
  methods: {
    ...mapActions(['setWhereTo', 'resetWhereTo']),
    screenMediator(whereTo) {
      this.resetWhereTo();
      this.setWhereTo(whereTo);
    },
    isFormValid() {
      this.dirty = true;
      let i = 1;
      while (i <= this.questionList.length) {
        if (this.answers[i].value === '') {
          this.invalidQuestions.push(this.answers[i].questionId);
          this.isAllFilled = true;
        } else this.isAllFilled = false;
        i++;
      }
      this.sendAnswers(this.answers);
      this.$vToastify.success('Respostas enviadas!');
    },
    // isQuestionInvalid(Id) {
    //   let i = 1;
    //   while (i <= this.questionList.length) {
    //     if (this.answers[i].value === '' && this.answers[i].id === Id) {
    //       return true;
    //     } else i++;
    //   }
    // },
    buildObjAnswers() {
      this.questionList.forEach((item) => {
        this.answers.push({
          questionId: item.id,
          value: ''
        });
      });
    },
    fillAnswers(option, Id) {
      let checkbox = document.getElementById(Id);
      if (!checkbox.checked) {
        let i = 0;
        while (i <= this.answers.length) {
          if (this.answers[i].questionId === Id) {
            this.answers[i].value = '';
          }
          i++;
        }
      } else {
        if (this.answers[Id - 1].value != '') {
          this.answers[Id - 1].value = '';
        }
        this.answers[Id - 1].questionId = Id;
        this.answers[Id - 1].value += option;
      }
    },
    sendAnswers(answers) {
      api
        .post('/answer', userId, questionnaireId, answers)
        .then((response) => {
          if (response.status == 200) {
            this.questionListn = response.data;
          } else {
            this.$vToastify.error('Não foi possível enviar os resultados...');
          }
        })
        .catch((error) => {
          console.log(error.response);
          this.$vToastify.error('Não foi possível enviar os resultados...');
        });
    },
    requestQuestions() {
      api
        .get(`/questionnaire/${this.getSelectedQuestionary}`)
        .then((response) => {
          if (response.status == 200) {
            this.questionList = response.data;
          } else {
            this.$vToastify.error(
              'Não foi possível buscar os questionários...'
            );
          }
        })
        .catch((error) => {
          console.log(error.response);
          this.$vToastify.error('Não foi possível buscar os questionários...');
        });
    }
  }
};
</script>

<style lang="scss" scoped>
@import './_answerQuestions.scss';
</style>
