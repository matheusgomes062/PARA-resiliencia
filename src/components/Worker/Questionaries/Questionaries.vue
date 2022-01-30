<template lang="pug">
  div(v-loading.fullscreen.lock="fullscreenLoading")
    Header(routeToGo="Dashboard" title="Questionários")
    
    div.py-3
      label(for="restaurant").w-100.text-start Selecione um restaurante
      el-select(v-model="restaurant" placeholder="Restaurante" id="restaurant").w-100
        el-option(
          v-for="(restaurant, index) in restaurants"
          :value="restaurant.id"
          :label="restaurant.name"
          :key="restaurant + '-' + index").px-3 {{ restaurant.name }}
      div(
        v-if="$v.restaurant.$error && !$v.restaurant.required"
        class="error")  Necessário selecionar!
    
    div(v-if="restaurant" style="height: 250px; overflow-y: auto;")
      div(v-for="(questionnaire, index) in questionnaires" :key="index" class="questionariesContainer")
        div(class="questionary")
          div(class="questionaryTitle")
            h5 {{questionnaire.title}}
          
          div.d-flex.flex-row.justify-content-between

            el-button(icon="el-icon-view" @click="setQuestionary(questionnaire), screenMediator('AnswerQuestions')" circle)
      div(v-if="questionnaires.length === 0")
        el-empty(description="Sem Questionários")
</template>

<script>
import { ChevronLeftIcon } from 'vue-feather-icons';
import { mapActions, mapGetters } from 'vuex';
import { required } from 'vuelidate/lib/validators';
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
      questionnaires: [],
      fullscreenLoading: false,
      restaurant: null,
      restaurants: []
    };
  },
  validations: {
    restaurant: { required }
  },
  computed: {
    ...mapGetters(['getWhereTo'])
  },
  watch: {
    restaurant: function (value) {
      this.getQuestionnaires(value)
    }
  },
  created() {
    this.getRestaurants()
  },
  methods: {
    ...mapActions(['setWhereTo', 'resetWhereTo', 'resetSelectedQuestionary','setSelectedQuestionary']),
    setQuestionary(questionary) {
      this.resetSelectedQuestionary();
      this.setSelectedQuestionary(questionary);
    },
    screenMediator(whereTo) {
      this.resetWhereTo();
      this.setWhereTo(whereTo);
    },
    async getQuestionnaires(restaurantId) {
      this.fullscreenLoading = true;
      this.questionnaires = [];
      await api
      .get(`/notice/restaurant/` + restaurantId)
      .then((response) => {
        if (response.status == 200) {
          this.questionnaires = [response.data[0].questionnaire]
        } else {
          this.$vToastify.error(
            'Não foi possível receber os questionários'
          );
        }
      })
      .catch((error) => {
        console.log(error.response);
        this.$vToastify.error('Não foi possível receber os questionários');
      });
      this.fullscreenLoading = false;
    },
    getRestaurants() {
      this.fullscreenLoading = true;
      api
      .get('/restaurant')
      .then((response) => {
        if (response.status == 200) {
          this.restaurants = response.data
        } else {
          this.$vToastify.error(
            'Não foi possível receber os restaurantes'
          );
        }
      })
      .catch((error) => {
        this.$vToastify.error('Não foi possível receber os restaurantes');
      });
      this.fullscreenLoading = false;
    },
  }
};
</script>

<style lang="scss" scoped>
@import './_questionaries.scss';
</style>
