<template>
  <div>
    <div class="mainContent">
      <keep-alive>
        <component
          ref="currentStep"
          :is="currentStep"
          :wizard-data="form"
        ></component>
      </keep-alive>

      <!-- <div class="progress-bar">
        <div :style="`width: ${progress}%;`"></div>
      </div> -->

      <!-- Actions -->
      <div class="buttons">
        <button @click="goBack" v-if="currentStepNumber > 1" class="btn">
          Voltar
        </button>

        <button @click="nextButtonAction" class="btn">
          {{ isLastStep ? ':)' : 'Próxima' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import FormUserDetails from '@/components/formUserDetails/FormUserDetails';
import PlansShowcase from '@/components/plansShowcase/PlansShowcase';
export default {
  name: 'FormWizard',
  components: {
    FormUserDetails,
    PlansShowcase
  },
  data() {
    return {
      currentStepNumber: 1,
      steps: ['FormUserDetails', 'PlansShowcase'],
      form: {}
    };
  },
  computed: {
    isLastStep() {
      return this.currentStepNumber === this.length;
    },
    wizardInProgress() {
      return this.currentStepNumber <= this.length;
    },
    length() {
      return this.steps.length;
    },
    currentStep() {
      return this.steps[this.currentStepNumber - 1];
    },
    progress() {
      return (this.currentStepNumber / this.length) * 100;
    }
  },
  methods: {
    submitOrder() {},
    nextButtonAction() {
      this.$refs.currentStep
        .submit()
        .then((stepData) => {
          Object.assign(this.form, stepData);
          if (this.isLastStep) {
            this.submitOrder();
          } else {
            this.goNext();
          }
        })
        .catch((error) => console.log(error));
    },
    goBack() {
      this.currentStepNumber--;
    },
    goNext() {
      this.currentStepNumber++;
    }
  }
};
</script>

<style lang="scss" scoped>
@import './_formWizard.scss';
</style>
