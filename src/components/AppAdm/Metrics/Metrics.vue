<template lang="pug">
div(v-loading.fullscreen.lock="fullscreenLoading")
  div
    Header(routeToGo="Notices" title="Indicadores")
  
  el-form.d-flex.flex-column.w-100(ref="form" :model="$v.notice")
    el-form-item(class="register-group" label="Questionário")
        el-select(v-model="questionnaire" placeholder="Selecione o questionário" id="questionnaire").w-100
          el-option(
            v-for="(questionnaire, index) in questionnaires"
            :value="questionnaire.id"
            :label="questionnaire.title"
            :key="questionnaire + '-' + index").px-3 {{ questionnaire.title }}
        div(
          v-if="$v.questionnaire.$error && !$v.questionnaire.required"
          class="error")  Necessário selecionar!
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
      
  
</template>

<script>
import { required } from 'vuelidate/lib/validators';
import { api } from '@/services/index';
import Header from '@/components/Header/Header.vue';
// import { mapActions, mapGetters } from 'vuex';

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
  created() {
    this.getRestaurants(),
    this.getQuestionaries()
  },
  methods: {
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
    getQuestionaries() {
      this.fullscreenLoading = true;
      api
      .get('/questionnaire')
      .then((response) => {
        if (response.status == 200) {
          this.questionnaires = response.data
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
    }
  }
}
</script>

<style>

</style>