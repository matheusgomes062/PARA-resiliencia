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
        h5 {{questionnaire.title}}
        el-button(icon="el-icon-view" @click="setQuestionary(questionnaire)" circle)
      div(v-if="questionnaires.length === 0")
        el-empty(description="Sem Questionários")
    
    el-dialog(
      :visible.sync="dialogVisible"
      center
      close-on-press-escape="true"
      close-on-click-modal="true"
      destroy-on-close="true")
      pdf(src="./TCLE_emenda.pdf")

      b-col.align-items-center
        .d-flex.flex-row.justify-content-center.align-items-center
          el-checkbox(v-model="termAccepted")
            h4 Aceita os termos de serviço
        div.mt-2(
          v-if="$v.termAccepted.$error && !$v.termAccepted.required"
          class="error checkboxErrorRegister")  Aceite de termos necessário!
      span.d-flex.justify-content-between(slot="footer" class="dialog-footer")
        el-button(@click="dialogVisible = false") Cancelar
        el-button(type="primary" :disabled="!termAccepted" @click="screenMediator('AnswerQuestions')") Confirma
</template>

<script>
import { ChevronLeftIcon } from 'vue-feather-icons';
import { mapActions, mapGetters } from 'vuex';
import { required } from 'vuelidate/lib/validators';
import Header from '@/components/Header/Header.vue';
import { api } from '@/services/index';
import pdf from 'vue-pdf';

export default {
  name: 'Questionaries',
  components: {
    ChevronLeftIcon,
    Header,
    pdf
  },
  data() {
    return {
      questionnaires: [],
      fullscreenLoading: false,
      restaurant: null,
      restaurants: [],
      dialogVisible: false,
      readTerms: false,
      termAccepted: false
    };
  },
  validations: {
    restaurant: { required },
    termAccepted: {
      checked: (value) => value === true
    }
  },
  computed: {
    ...mapGetters(['getWhereTo'])
  },
  watch: {
    restaurant: function (value) {
      this.getQuestionnaires(value)
    },
    readTerms: function (value) {
      if(value === true)
        this.screenMediator('AnswerQuestions')
    }
  },
  created() {
    this.getRestaurants()
  },
  methods: {
    ...mapActions(['setWhereTo', 'resetWhereTo', 'resetSelectedQuestionary','setSelectedQuestionary', 'setNoticeId']),
    setQuestionary(questionary) {
      this.resetSelectedQuestionary();
      this.setSelectedQuestionary(questionary);
      this.openModal();
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
    sortRestaurants() {
      this.restaurants.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
    },
    sortQuestionnaires() {
      this.questionnaires.sort((a,b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0))
    },
    getRestaurants() {
      this.fullscreenLoading = true;
      api
      .get('/restaurant')
      .then((response) => {
        if (response.status == 200) {
          this.restaurants = response.data
          this.sortRestaurants();
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
    openModal() {
      this.dialogVisible = true;
    },
    handleClose(done) {
      this.$confirm('Are you sure to close this dialog?')
        .then((_) => {
          done();
        })
        .catch((_) => {});
    }
  }
};
</script>

<style lang="scss" scoped>
@import './_questionaries.scss';
</style>
