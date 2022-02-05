<template lang="pug">
	div(v-loading.fullscreen.lock="fullscreenLoading")
		Header(routeToGo="Notices" title="Criar Edital")

		el-form.d-flex.flex-column.w-100(ref="form" :model="$v.notice" v-loading="componentLoading")
			el-form-item(class="register-group" label="Restaurante")
				el-select(v-model="restaurant" placeholder="Restaurante" id="restaurant").w-100
					el-option(
						v-for="(restaurant, index) in restaurants"
						:value="restaurant.id"
						:label="restaurant.name"
						:key="restaurant + '-' + index").px-3 {{ restaurant.name }}
				div(v-if="$v.restaurant.$error && !$v.restaurant.required" class="error")  Necessário selecionar!
			el-form-item(class="register-group" label="Questionário")
					el-checkbox(v-model="selectAll" @change="selectAllQuestionnaires").mr-2
						p Selecionar todos os questionários
					el-select(v-model="questionnairesList" placeholder="Selecione o questionário" id="questionnaire" multiple collapse-tags).w-100.align-items-center
						el-option(
							v-for="(questionnaire, index) in questionnaires"
							class="optionClass"
							:value="questionnaire.id"
							:label="questionnaire.title"
							:key="questionnaire + '-' + index").px-3 {{ questionnaire.title }}
					div(
						v-if="$v.questionnairesList.$error && !$v.questionnairesList.required" class="error")  Necessário selecionar!

			el-form-item(class="register-group" label="Data de início")
				el-date-picker.w-100.justify-content-between(
					v-model="date"
					type="daterange"
					range-separator="Até"
					start-placeholder="Data inicial"
					end-placeholder="Data final")
				div(
						v-if="$v.date.$error && !$v.date.required" class="error")  Necessário selecionar!

			el-button.my-3(type="primary" @click="createNotice") Criar

</template>

<script>
import { ChevronLeftIcon } from 'vue-feather-icons';
import { mapActions, mapGetters } from 'vuex';
import Header from '@/components/Header/Header.vue';
import { required } from 'vuelidate/lib/validators';
import { api } from '@/services/index';

function initialState() {
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
		date: null,
		questionnairesList: [],
		fullscreenLoading: false,
		componentLoading: false,
		selectAll: false
	}
}

export default {
	name: 'CreateNotices',
	components: {
		ChevronLeftIcon,
		Header
	},
	data() {
		return initialState();
	},
	validations: {
		questionnairesList: { required },
		restaurant: { required },
		date: { required }
	},
	computed: {
		...mapGetters(['getWhereTo'])
	},
	created() {
		Object.assign(this.$data, initialState());
	},
	mounted() {
		this.getRestaurants(),
		this.getQuestionaries()
	},
	methods: {
		...mapActions(['setWhereTo', 'resetWhereTo']),
		screenMediator(whereTo) {
			this.resetWhereTo();
			this.setWhereTo(whereTo);
		},
		async getRestaurants() {
			this.componentLoading = true;
			await api
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
				console.log(error);
				this.$vToastify.error('Não foi possível receber os restaurantes');
			});
			this.componentLoading = false;
		},
		async getQuestionaries() {
			this.componentLoading = true;
			await api
			.get('/questionnaire')
			.then((response) => {
				if (response.status == 200) {
					this.questionnaires = response.data
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
			this.componentLoading = false;
		},
		createNotice() {
			this.fullscreenLoading = true;
			this.$v.$touch();
			let registerNotice = {
				restaurantId: this.restaurant,
				questionnaireId: null,
				startDate: this.date[0],
				endDate: this.date[1]
			}

			if (!this.$v.questionnairesList.$invalid && !this.$v.restaurant.$invalid && !this.$v.date.$invalid) {
				this.questionnairesList.forEach(element => {
					registerNotice.questionnaireId = element
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
									'Não foi possível criar um ou mais editais...'
								);
							}
							this.fullscreenLoading = false;
						})
						.catch((error) => {
							console.log(error.response);
							this.$vToastify.error('Não foi possível criar edital...');
							this.fullscreenLoading = false;
						});
					})
			}
		},
    sortRestaurants() {
      this.restaurants.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
    },
    sortQuestionnaires() {
      this.questionnaires.sort((a,b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0))
    },
		selectAllQuestionnaires() {
			// this.selectAll = !this.selectAll;
			if(this.selectAll) {
				this.questionnaires.forEach(element => {
					this.questionnairesList.push(element.id);
				})
			} else {
				this.questionnairesList = [];
			}
		}
	}
};
</script>

<style lang="scss" scoped>
@import './_createNotices.scss';
</style>
