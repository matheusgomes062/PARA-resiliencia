<template lang="pug">
  div
    Header(routeToGo="Notices" title="Editais")

    h4.d-flex.justify-content-start.px-0.w-100 Questionários

    div(v-for="(questionaries, index) in questionaries" :key="index" class="questionariesContainer")
      div(class="questionary")
        div(class="questionaryTitle")
          h5 {{questionaries.title}}
        
        div.d-flex.flex-row.justify-content-between
          div(class="questionarySummary")
            div
              p Respondidos
              p 50
            
            div(id="bar")
            
            div
              p Total
              p 53
          //- button(class="openBtn" @click="setQuestionary(questionaries.id), screenMediator('Answers')") Abrir

          el-button(icon="el-icon-view" @click="setQuestionary(questionaries.id), screenMediator('Answers')" circle)

</template>

<script>
import { ChevronLeftIcon } from 'vue-feather-icons';
import { mapActions, mapGetters } from 'vuex';
import Header from '@/components/Header/Header.vue';

export default {
  name: 'QuizAnswers',
  components: {
    ChevronLeftIcon,
    Header
  },
  data() {
    return {
      Questionaries: '',
      questionaries: [
        {
          id: 1,
          title: 'Questionário 1'
        },
        {
          id: 2,
          title: 'Questionário 2'
        }
      ],
      activeQuestion: ''
    };
  },
  computed: {
    ...mapGetters(['getWhereTo', 'getQuestionaries'])
  },
  created() {
    this.getAllQuestionaries();
    this.getQuestionaries();
  },
  methods: {
    ...mapActions([
      'setWhereTo',
      'resetWhereTo',
      'setSelectedQuestionary',
      'resetSelectedQuestionary'
    ]),
    screenMediator(whereTo) {
      this.resetWhereTo();
      this.setWhereTo(whereTo);
    },
    getQuestionaries() {
      api
        .get('/questionnaire')
        .then((response) => {
          this.setAllQuestionaries(response.data);
        })
        .catch((error) => {
          console.log(error.response);
        });
    },
    setQuestionary(questionaryId) {
      this.resetSelectedQuestionary();
      this.setSelectedQuestionary(questionaryId);
    }
  }
};
</script>

<style lang="scss" scoped>
@import './_quizAnswers.scss';
</style>
