<template lang='pug'>
  //- <div>
  //-   <div class="header">
  //-     <div class="goBackIcon">
  //-     <chevron-left-icon
  //-       size="2x"
  //-       class="btn"
  //-       @click="resetQuestionary, screenMediator('QuizAnswers')"
  //-     ></chevron-left-icon>
  //-   </div>
  //-   </div>
  //-   <div>
  //-     <h1 class="title">Título</h1>
  //-   </div>
  //-   <div class="mainContainer">
  //-     <div class="questionContainer">
  //-       <div class="questionContent" v-for="(question, index) in QuestionsList" :key="index">
  //-         <div>
  //-           <div class="titleContainer">
  //-             <h3>{{question.id}}.</h3>
  //-             <p>{{question.title}}</p>
  //-           </div>
  //-           <div class="answersTitle">
  //-             <p>Respostas:</p>
  //-           </div>
  //-           <div class="optionsContainer" v-if="question.type === 'options'">
  //-             <div v-for="(options, index) in question.options" :key="index" class="toggles-container">
  //-               <li>{{ options.option }} - {{ options.percentage }}</li>
  //-             </div>
  //-           </div>
  //-           <div v-else class="answersContainer">
  //-             <div v-for="(answers, index) in question.answers" :key="index" class="answersContent">
  //-               <p>{{index + 1}} -</p>
  //-               <p>{{ answers.answer }}</p>
  //-             </div>
  //-           </div>
  //-         </div>
  //-       </div>
  //-     </div>
  //-   </div>
  //- </div>

  div
    div(class="header")
      div(class="goBackIcon")
        chevron-left-icon(
          size="2x"
          class="btn"
          @click="screenMediator('Dashboard')")
    div
      h1 Questionário

    h3.mx-4 Questões
    
    el-collapse(accordion v-model="activeQuestion" v-for="(question, index) in QuestionsList" :key="index")
      el-collapse-item(name="1")
        template(slot='title')
          div(class='question-container')
            Consistent Questão {{question.id}} 
            //- div(class='space')
            Consistent 
              b {{question.metrics}}
        <div>Consistent with real life: in line with the process and logic of real life, and comply with languages and habits that the users are used to;</div>

</template>

<script>
import { ChevronLeftIcon } from 'vue-feather-icons';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Answers',
  components: {
    ChevronLeftIcon
  },
  data() {
    return {
      selectedQuestion: false,
      test: 'Questionário 1',
      QuestionsList: [
        {
          id: 1,
          title: 'Você achou que o conteúdo ensinado nesses treinamentos mudou o seu pensamento em relação ao seu trabalho? (se você for o responsável por efetuaros treinamentos, não responder esta pergunta) e o conteúdo ensinado nesses treinamentos mudou o seu pensamento em  e o conteúdo ensinado nesses treinamentos mudou o seu pensamento em ',
          type: 'options',
          metrics: 'A: 10 | B: 10 | C: 5 | D: 25',
          options: [
            {
              option: 'sim',
              percentage: '70%'
            },
            {
              option: 'não',
              percentage: '30%'
            }
          ]
        },
        {
          id: 2,
          title: 'Você achou que o conteúdo ensinado nesses treinamentos mudou o seu pensamento em relação ao seu trabalho? (se você for o responsável por efetuaros treinamentos, não responder esta pergunta)',
          type: 'options',
          metrics: 'A: 10 | B: 10 | C: 5 | D: 25',
          options: [
            {
              option: 'sim',
              percentage: '50%'
            },
            {
              option: 'não',
              percentage: '50%'
            }
          ]
        },
        {
          id: 3,
          title: 'Você achou que o conteúdo ensinado nesses treinamentos mudou o seu pensamento em relação ao seu trabalho? (se você for o responsável por efetuaros treinamentos, não responder esta pergunta)',
          type: 'normal',
          metrics: 'A: 10 | B: 10 | C: 5 | D: 25',
          answers: [
            {
              answer: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
            },
            {
              answer: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
            },
            {
              answer: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
            }
          ]
        },
        {
          id: 4,
          title: 'Você achou que o conteúdo ensinado nesses treinamentos mudou o seu pensamento em relação ao seu trabalho? (se você for o responsável por efetuaros treinamentos, não responder esta pergunta)',
          type: 'normal',
          metrics: 'A: 10 | B: 10 | C: 5 | D: 25',
          answers: [
            {
              answer: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
            },
            {
              answer: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
            }
          ]
        }
      ]
    };
  },
  computed: {
    ...mapGetters(['getWhereTo'])
  },
  methods: {
    ...mapActions(['setWhereTo', 'resetWhereTo', 'resetSelectedQuestionary']),
    metrics(){
      return 'Questionário 1'
    },
    screenMediator(whereTo) {
      this.resetWhereTo();
      this.setWhereTo(whereTo);
    },
    resetQuestionary() {
      this.resetSelectedQuestionary();
    } 
  }
}
</script>

<style lang="scss" scoped>
@import './_answers.scss';
</style>
