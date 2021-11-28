<template lang="pug">
	div
		div
			Header(routeToGo="Notices" title="Criar Edital")
		
		el-form.d-flex.flex-column.w-100(ref="form" :model="$v.notice")
			el-form-item(class="register-group" label="Questionário")
					el-select(v-model="notice.questionnaire" placeholder="Selecione o questionário" id="questionnaire").w-100
						el-option(
							v-for="(questionnaire, index) in questionnaires"
							:value="questionnaire.value"
							:label="questionnaire.name"
							:key="questionnaire + '-' + index").px-3 {{ questionnaire.name }}
					div(
						v-if="$v.questionnaire.$error && !$v.questionnaire.required"
						class="error")  Necessário selecionar!
			el-form-item(class="register-group" label="Restaurante")
				el-select(v-model="notice.restaurant" placeholder="Restaurante" id="restaurant").w-100
					el-option(
						v-for="(restaurant, index) in restaurants"
						:value="restaurant.value"
						:label="restaurant.name"
						:key="restaurant + '-' + index").px-3 {{ restaurant.name }}
				div(
					v-if="$v.restaurant.$error && !$v.restaurant.required"
					class="error")  Necessário selecionar!
				
			el-form-item(class="register-group" label="Data de início")
				el-date-picker.w-100.justify-content-between(
					v-model="notice.date"
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
// import { api } from '@/services/index';

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
      questionnaire: null
    };
  },
  validations: {
    questionnaire: { required },
    restaurant: { required }
  },
  computed: {
    ...mapGetters(['getWhereTo'])
  },
  created() {},
  methods: {
    ...mapActions(['setWhereTo', 'resetWhereTo']),
    screenMediator(whereTo) {
      this.resetWhereTo();
      this.setWhereTo(whereTo);
    }
  }
};
</script>

<style lang="scss" scoped>
@import './_createNotices.scss';
</style>
