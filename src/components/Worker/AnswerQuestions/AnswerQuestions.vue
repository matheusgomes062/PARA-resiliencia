<template lang="pug">
.answerQuestionContainer(v-loading.fullscreen.lock="fullscreenLoading")
  Header(routeToGo="Questionaries" :title="getSelectedQuestionary.title")
  .p-2.d-flex.flex-column
    p.text-justify.text-break {{getSelectedQuestionary.description}}
  
  .p-2.d-flex.flex-column.my-3
    .py-3(v-for="(question, indexMaster) in questions" :key="indexMaster")
      .d-flex.align-items-baseline
        h3(style="margin-right: 10px") {{indexMaster + 1}}.
        h5.text-start {{question.title}}
        
      div(v-if="question.questionType === 'multipleChoice'" class="questionsContainer")
        el-checkbox-group.d-flex.align-items-center.my-2(v-for="(option, index) in question.questionOptions" v-model="answerObject.partialAnswersToSave[indexMaster].value" :key="index + option.value")
          el-checkbox(:label="option.value" @change="addOptionsId(indexMaster, option.id)")
      
      div(v-if="question.questionType === 'boolean'" class="questionsContainer")
        .d-flex.align-items-center.my-2(v-for="(option, index) in question.questionOptions" :key="index + option.value")
          el-radio(:label="option.value" v-model="answerObject.partialAnswersToSave[indexMaster].value" @change="addOptionsId(indexMaster, option.id)")
          
      div(v-if="question.questionType === 'text'" style="padding: 20px 10px 20px 30px")
        el-input(type="textarea" :rows="3" placeholder="Campo de texto" v-model="answerObject.partialAnswersToSave[indexMaster].value")
      
      div(v-if="question.questionType === 'number'" style="padding: 20px 10px 20px 30px")
        el-input(
            type="number"
            class="registerRestaurant-control"
            id="streetNumber" v-model="answerObject.partialAnswersToSave[indexMaster].value")
  
  .d-flex.justify-content-end.my-3.px-3
    el-button(@click="sendAnswers" type="primary") Enviar
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Header from '@/components/Header/Header.vue';
import { api } from '@/services/index';
// import q1mockup from './AnswersMockup/q1';
import { debounce } from '@/helpers/helpers.js';

export default {
  name: 'AnswerQuestions',
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
    isFormValid() {
      this.$vToastify.success('Respostas enviadas!');
    },
    async getQuestions() {
      this.fullscreenLoading = true;
      await api
        .get('/questionnaire/' + this.getSelectedQuestionary.id)
        .then((response) => {
          if (response.status == 200) {
            this.answerObject.noticeId = this.getSelectedQuestionary.noticeId;
            this.questions = response.data.questions;
            this.questions.sort((a,b) => (a.order > b.order) ? 1 : ((b.order > a.order) ? -1 : 0));
            this.questions.forEach((question) => {
              question.questionOptions.forEach(option => {
                if(option.order < 1) {
                  option.order = Math.random() * (10 - 4) + 4;
                }
              });
              question.questionOptions.sort((a,b) => (a.order > b.order) ? 1 : ((b.order > a.order) ? -1 : 0));
            });
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
    },
    sendAnswers: debounce(function() {
      this.fullscreenLoading = true;
      api
        .post('/answer', this.answerObject)
        .then(() => {
          this.$vToastify.success('Respostas enviadas!');
          this.fullscreenLoading = false;
          document.location.reload(true);
        })
        .catch((error) => {
          console.log(error);
          this.$vToastify.error('Houve um problema ao enviar respostas!');
          this.fullscreenLoading = false;
        })
      this.fullscreenLoading = false;
    }, 500),
    addOptionsId(index, id) {
      let questionOptionIds =
        this.answerObject.partialAnswersToSave[index].questionOptionIds;
      if (questionOptionIds.includes(id)) {
        questionOptionIds = questionOptionIds.filter((item) => {
          return item !== id;
        });
      } else {
        questionOptionIds.push(id);
      }
      this.answerObject.partialAnswersToSave[index].questionOptionIds =
        questionOptionIds;
    }
  }
};
</script>

<style lang="scss" scoped>
@import './_answerQuestions.scss';
</style>
