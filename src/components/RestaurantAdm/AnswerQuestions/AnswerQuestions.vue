<template lang="pug">
  div(style="width: 700px; height: 500px; overflow-y: auto;")
    Header(routeToGo="Questionaries" :title="getSelectedQuestionary.title")
    div.p-2.d-flex.flex-column.my-12
      p {{getSelectedQuestionary.description}}
    
    div.p-2.d-flex.flex-column.my-3
      div.py-3(v-for="(question, indexMaster) in questions" :key="indexMaster")
        div.d-flex(style="max-width: 630px;")
          h3(style="margin-right: 10px;") {{indexMaster + 1}}.
          p(style="max-width: 800px; text-align: left; font-size: 25px;") {{question.title}}
          
        div(v-if="question.questionType === 'multipleChoice'" class="questionsContainer")
          el-checkbox-group.d-flex.align-items-center.my-2(v-for="(option, index) in question.questionOptions" v-model="answerObject.partialAnswersToSave[indexMaster].value")
            el-checkbox(:label="option.value")
        
        div(v-if="question.questionType === 'boolean'" class="questionsContainer")
          div.d-flex.align-items-center.my-2(v-for="(option, index) in question.questionOptions" :key="index + option.value")
            el-radio(:label="option.value" v-model="answerObject.partialAnswersToSave[indexMaster].value")
            
        div(v-if="question.questionType === 'text'" style="padding: 20px 10px 20px 30px")
          el-input(type="textarea" :rows="3" placeholder="Campo de texto" v-model="answerObject.partialAnswersToSave[indexMaster].value")
        
        div(v-if="question.questionType === 'number'" style="padding: 20px 10px 20px 30px")
          el-input(
              type="number"
              class="registerRestaurant-control"
              id="streetNumber" v-model="answerObject.partialAnswersToSave[indexMaster].value")
    
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
      test: null,
      answerObject: {
        noticeId: '',
        partialAnswersToSave: []
      }
    };
  },
  watch: {
    'answerObject.partialAnswersToSave': {
      handler(val) {
        let optionsToInsert = [];
        this.answerObject.partialAnswersToSave.forEach((item) => {
          if (item.value.length != 0) {
            this.questions.forEach((question) => {
              if (question.id === item.questionId) {
                question.questionOptions.forEach((option, index) => {
                  if (option.value === item.value[index]) {
                    optionsToInsert.push(option.id);
                  }
                });
              }
            });
          }
        });
        console.log(optionsToInsert);
      },
      deep: true
    }
  },
  computed: {
    ...mapGetters(['getWhereTo', 'getSelectedQuestionary'])
  },
  created() {
    this.setQuestions();
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
      this.questions = this.getSelectedQuestionary.questions;
      this.questions.forEach((item) => {
        this.answerObject.partialAnswersToSave.push({
          questionId: item.id,
          questionOptionId: [],
          value: []
        });
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import './_answerQuestions.scss';
</style>
