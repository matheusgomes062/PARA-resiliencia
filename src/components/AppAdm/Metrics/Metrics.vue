<template lang="pug">
div(v-loading.fullscreen.lock="fullscreenLoading")
  div
    Header(routeToGo="Notices" title="Indicadores")
  
  el-form.d-flex.flex-column.w-100(ref="form" :model="$v.notice")
    el-form-item(class="register-group" label="Restaurante")
      el-select(v-model="restaurant" placeholder="Restaurante" id="restaurant").w-100
        el-option(
          v-for="(restaurant, index) in restaurants"
          :value="restaurant.id"
          :label="restaurant.name"
          :key="restaurant + '-' + index").px-3 {{ restaurant.name }}
      div(
        v-if="$v.restaurant.$error && !$v.restaurant.required"
        class="error")  Necessário selecionar!
    el-form-item(class="register-group" label="Edital")
        el-select(v-model="questionnaire" placeholder="Selecione o edital" id="questionnaire" :disabled="!restaurant" @change="setQuestionnaire(questionnaire)").w-100
          el-option(
            v-for="(questionnaire, index) in questionnaires"
            :value="questionnaire.noticeId"
            :label="questionnaire.title"
            :key="questionnaire + '-' + index").px-3 {{ questionnaire.title }}
        div(
          v-if="$v.questionnaire.$error && !$v.questionnaire.required"
          class="error")  Necessário selecionar!
  
  .d-flex.justify-content-center.my-3.px-3
    el-button(type="primary" @click="screenMediator('MetricsData')") Verificar Métricas
    //- el-button(@click='exportExcelDB' type="primary") Exportar DB
  
</template>

<script>
import { required } from 'vuelidate/lib/validators';
import { api } from '@/services/index';
import Header from '@/components/Header/Header.vue';
import { mapActions } from 'vuex';

export default {
  name: 'Metrics',
  components: {
    Header
  },
  data() {
    return {
      restaurants: [],
      questionnaires: [],
      restaurant: null,
      questionnaire: null,
      fullscreenLoading: false
    }
  },
  validations: {
    questionnaire: { required },
    restaurant: { required }
  },
  watch: {
    restaurant() {
      this.getQuestionnaires();
    }
  },
  created() {
    this.fullscreenLoading = true
    this.getRestaurants()
    this.fullscreenLoading = false
  },
  methods: {
    ...mapActions(['setWhereTo', 'resetWhereTo', 'setNoticeId']),
    screenMediator(whereTo) {
      this.resetWhereTo();
      this.setWhereTo(whereTo);
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
    async getQuestionnaires() {
      this.fullscreenLoading = true;
      this.questionnaires = [];
      await api
      .get(`/notice/restaurant/` + this.restaurant)
      .then((response) => {
        if (response.status == 200) {
          response.data.forEach((element) => {
            element.questionnaire.noticeId = element.id;
            this.questionnaires.push(element.questionnaire)
          });
          this.sortQuestionnaires();
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

    async exportExcelDB() {
      await api
        .get('restaurant/analitycs/' + this.restaurant)
        .then(({data}) => {
          console.log('data: ' + data)
        })
    },

    sortQuestionnaires() {
      this.questionnaires.sort((a,b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0))
    },

    setQuestionnaire(questionnaire) {
      console.log(questionnaire)
      this.setNoticeId(questionnaire);

    }
  }
}
</script>

<style>

</style>