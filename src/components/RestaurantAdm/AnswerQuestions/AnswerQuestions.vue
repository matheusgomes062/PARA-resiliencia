<template lang="pug">
  div(style="width: 700px; height: 500px; overflow-y: auto;")
    Header(routeToGo="Questionaries" :title="getSelectedQuestionary.title")
    div.p-2.d-flex.flex-column.my-12
      p {{getSelectedQuestionary.description}}
    
    div.p-2.d-flex.flex-column.my-3
      div.py-3(v-for="(question, index) in questions" :key="index")
        div.d-flex(style="max-width: 630px;")
          h3(style="margin-right: 10px;") {{index + 1}}.
          p(style="max-width: 800px; text-align: left; font-size: 25px;") {{question.title}}
          
        div(v-if="question.questionType === 'multipleChoice'" class="questionsContainer")
          div.d-flex.align-items-center.my-2(v-for="(option, index) in question.questionOptions" :key="index" )
            el-checkbox(:label="option.value")
        
        div(v-if="question.questionType === 'boolean'" class="questionsContainer")
          div.d-flex.align-items-center.my-2(v-for="(option, index) in question.questionOptions" :key="index" )
            el-checkbox(:label="option.value")
            
        div(v-if="question.questionType === 'text'" style="padding: 20px 10px 20px 30px")
          el-input(type="textarea" :rows="3" placeholder="Campo de texto" v-model="textarea")
        
        div(v-if="question.questionType === 'number'" style="padding: 20px 10px 20px 30px")
          el-input(
              v-model="test"
              type="number"
              class="registerRestaurant-control"
              id="streetNumber")
    
    div.d-flex.justify-content-end.my-3.px-3
      el-button(@click="isFormValid" type="primary") Enviar
</template>

<script>
import { ChevronLeftIcon } from 'vue-feather-icons';
import { mapActions, mapGetters } from 'vuex';
import Header from '@/components/Header/Header.vue';

export default {
  name: 'AnswerQuestions',
  components: {
    Header,
    ChevronLeftIcon
  },
  data() {
    return {
      selectedQuestion: false,
      questions: [],
      textarea: null,
      test: null
    };
  },
  computed: {
    ...mapGetters(['getWhereTo', 'getSelectedQuestionary'])
  },
  created () {
    this.setQuestions()
  },
  methods: {
    ...mapActions(['setWhereTo', 'resetWhereTo']),
    screenMediator(whereTo) {
      this.resetWhereTo();
      this.setWhereTo(whereTo);
    },
    isFormValid() {
      this.$vToastify.success('Respostas enviadas!');
    },
    setQuestions() {
      this.questions = this.getSelectedQuestionary.questions
      console.log(this.questions)
    }
  }
};
</script>

<style lang="scss" scoped>
@import './_answerQuestions.scss';
</style>
