<template lang="pug">
  div
    Header(routeToGo="Dashboard" title="Questionários")
    div(style=" height: 250px; overflow-y:auto;")
      div(v-for="(questionnaire, index) in questionnaires" :key="index" class="questionariesContainer")
        div(class="questionary")
          div(class="questionaryTitle")
            h5 {{questionnaire.title}}
          
          div.d-flex.flex-row.justify-content-between

            el-button(icon="el-icon-view" @click="setQuestionary(questionnaire), screenMediator('AnswerQuestions')" circle)
</template>

<script>
import { ChevronLeftIcon } from 'vue-feather-icons';
import { mapActions, mapGetters } from 'vuex';
import Header from '@/components/Header/Header.vue';
import { api } from '@/services/index';

export default {
  name: 'Questionaries',
  components: {
    ChevronLeftIcon,
    Header
  },
  data() {
    return {
      questionnaires: []
    };
  },
  computed: {
    ...mapGetters(['getWhereTo'])
  },
  created() {
    this.requestQuestionnaires();
  },
  methods: {
    ...mapActions([
      'setWhereTo',
      'resetWhereTo',
      'setSelectedQuestionary',
      'resetSelectedQuestionary'
    ]),
    setQuestionary(questionary) {
      this.resetSelectedQuestionary();
      this.setSelectedQuestionary(questionary);
    },
    screenMediator(whereTo) {
      this.$destroy();
      this.resetWhereTo();
      this.setWhereTo(whereTo);
    },
    requestQuestionnaires() {
      //TODO: id do usuário ou id do questionário?
      api
        .get('/questionnaire')
        .then((response) => {
          if (response.status == 200) {
            this.questionnaires = response.data;
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
@import './_questionaries.scss';
</style>
