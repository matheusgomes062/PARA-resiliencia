<template lang="pug">
	div
		div
			Header(routeToGo="Notices" title="Criar Edital")
		
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
				
			el-form-item(class="register-group" label="Data de início")
				el-date-picker.w-100.justify-content-between(
					v-model="date"
					type="daterange"
					range-separator="Até"
					start-placeholder="Data inicial"
					end-placeholder="Data final")

			el-button.my-3(type="primary" @click="createNotice") Criar

</template>

<script>
import { ChevronLeftIcon } from 'vue-feather-icons';
import { mapActions, mapGetters } from 'vuex';
// import { api } from '@/services/index';
import Header from '@/components/Header/Header.vue';
import { required } from 'vuelidate/lib/validators';
import { api } from '@/services/index';

export default {
  name: 'CreateNotices',
  components: {
    ChevronLeftIcon,
    Header
  },
  data() {
    return {
      notice: {
        restaurant: null,
        questionnaire: null,
        date: null
      },
      restaurants: [],
      questionnaires: [],
      restaurant: null,
      questionnaire: null,
      date: null
    };
  },
  validations: {
    questionnaire: { required },
    restaurant: { required }
  },
  computed: {
    ...mapGetters(['getWhereTo'])
  },
  created() {
    this.getRestaurants(),
    this.getQuestionaries()
  },
  methods: {
    ...mapActions(['setWhereTo', 'resetWhereTo']),
    screenMediator(whereTo) {
      this.resetWhereTo();
      this.setWhereTo(whereTo);
    },
    getRestaurants() {
      api
      .get('/restaurant')
      .then((response) => {
        if (response.status == 200) {
          this.$vToastify.success(
            'Restaurantes recebidos',
            'Sucesso!'
          );
          this.restaurants = response.data
          console.log(this.restaurants)
        } else {
          this.$vToastify.error(
            'Não foi possível receber os restaurantes'
          );
        }
      })
      .catch((error) => {
        this.$vToastify.error('Não foi possível receber os restaurantes');
      });
    },
    getQuestionaries() {
      api
      .get('/questionnaire')
      .then((response) => {
        if (response.status == 200) {
          this.$vToastify.success(
            'Questionários recebidos',
            'Sucesso!'
          );
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
    },
    createNotice() {
      this.$v.$touch();
      console.log(this.date)
      let registerNotice = {
        restaurantId: this.restaurant,
        questionnaireId: this.questionnaire,
        startDate: this.date[0],
        endDate: this.date[1]
      }

      if (!this.$v.questionnaire.$invalid && !this.$v.restaurant.$invalid) {
        api
          .post('/notice', registerNotice)
          .then((response) => {
            if (response.status == 201) {
              this.$vToastify.success(
                'Edital criado com sucesso!',
                'Sucesso!'
              );
              this.screenMediator('Dashboard')
            } else {
              this.$vToastify.error(
                'Não foi possível criar edital...'
              );
            }
          })
          .catch((error) => {
            console.log(error.response);
            this.$vToastify.error('Não foi possível criar edital...');
          });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import './_createNotices.scss';
</style>
