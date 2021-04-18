<template>
  <div>
    <h1 class="title">Planos disponíveis:</h1>
    <div
      v-for="plan in plans.data.planos"
      :key="plan.idplano_sinf"
      class="card"
    >
      <div>
        <p>Operadora:</p>
        <span>{{ plan.operadora }}</span>
        <p>Nome do Plano:</p>
        <span>{{ plan.nome_plano_ans }}</span>
        <p>Plano:</p>
        <span>{{ plan.plano }}</span>
      </div>
      <img :src="plan.operadoraLogo" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'plansShowcase',
  props: {
    wizardData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {};
  },
  computed: {
    ...mapState({
      plans: (state) => state.plans.plans
    })
  },
  validations: {},
  methods: {
    submit() {
      return Promise.resolve();
    }
  }
};
</script>

<style lang="scss" scoped>
@import './_plansShowcase.scss';
</style>
