<template lang="pug">
  .answerQuestionContainer(v-loading.fullscreen.lock="fullscreenLoading")
    Header(routeToGo="QuizAnswers" :title="getSelectedQuestionary.title")
    .p-2.d-flex.flex-column
      p.text-justify.text-break {{getSelectedQuestionary.description}}
    
    .p-2.d-flex.flex-column.my-3
      .py-3(v-for="(question, indexMaster) in questions" :key="indexMaster")
        .d-flex.align-items-baseline
          h3(style="margin-right: 10px") {{indexMaster + 1}}.
          h5.text-start {{question.title}}
          
        div(v-if="question.questionType === 'multipleChoice'" class="questionsContainer")
          el-checkbox-group.d-flex.align-items-center.my-2(v-for="(option, index) in question.questionOptions" v-model="answerObject.partialAnswersToSave[indexMaster].value")
            el-checkbox(:label="option.value")
        
        div(v-if="question.questionType === 'boolean'" class="questionsContainer")
          .d-flex.align-items-center.my-2(v-for="(option, index) in question.questionOptions" :key="index + option.value")
            el-radio(:label="option.value" v-model="answerObject.partialAnswersToSave[indexMaster].value")
            
        div(v-if="question.questionType === 'text'" style="padding: 20px 10px 20px 30px")
          el-input(type="textarea" :rows="3" placeholder="Campo de texto" v-model="answerObject.partialAnswersToSave[indexMaster].value")
        
        div(v-if="question.questionType === 'number'" style="padding: 20px 10px 20px 30px")
          el-input(
              type="number"
              class="registerRestaurant-control"
              id="streetNumber" v-model="answerObject.partialAnswersToSave[indexMaster].value")
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Header from '@/components/Header/Header.vue';
import { api } from '@/services/index';

export default {
  name: 'Answer',
  components: {
    Header
  },
  data() {
    return {
      selectedQuestion: false,
      questions: [],
      textarea: null,
      test: null,
      answerObject: {
        noticeId: '',
        termAccepted: true,
        partialAnswersToSave: []
      },
      optionsToInsert: [],
      fullscreenLoading: false
    };
  },
  computed: {
    ...mapGetters(['getWhereTo', 'getSelectedQuestionary'])
  },
  created() {
    this.getQuestions();
  },
  methods: {
    ...mapActions(['setWhereTo', 'resetWhereTo']),
    screenMediator(whereTo) {
      this.resetWhereTo();
      this.setWhereTo(whereTo);
    },
    async getQuestions() {
      this.fullscreenLoading = true;
      await api
        .get('/questionnaire/' + this.getSelectedQuestionary.id)
        .then((response) => {
          if (response.status == 200) {
            this.answerObject.noticeId = this.getSelectedQuestionary.noticeId;
            this.questions = response.data.questions;
            this.questions.sort((a,b) => (a.order > b.order) ? 1 : ((b.order > a.order) ? -1 : 0))
            this.setQuestions();
          } else {
            this.$vToastify.error(
              'Não foi possível receber os questionários'
            );
          }
          return this.fullscreenLoading = false;
        })
        .catch((error) => {
          console.log(error.response);
          this.$vToastify.error('Não foi possível receber os questionários');
        });
        return this.fullscreenLoading = false;
    },
    async setQuestions() {
      this.questions.forEach((item) => {
        this.fullscreenLoading = true;
        this.answerObject.partialAnswersToSave.push({
          questionId: item.id,
          questionOptionIds: [],
          value: []
        });
        return this.fullscreenLoading = false;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import './_answers.scss';
</style>
