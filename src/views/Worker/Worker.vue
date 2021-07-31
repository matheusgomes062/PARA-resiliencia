<template>
  <div class="mainContent">
    <keep-alive>
      <component
        :whereTo="whereTo"
        ref="currentScreen"
        :is="currentScreen"
      ></component>
    </keep-alive>
  </div>
</template>

<script>
import Dashboard from '@/components/Worker/Dashboard/Dashboard.vue';
import OtherOptions from '@/components/Worker/OtherOptions/OtherOptions.vue';
import Questionaries from '@/components/Worker/Questionaries/Questionaries.vue';
import AnswerQuestions from '@/components/Worker/AnswerQuestions/AnswerQuestions.vue';
import Profile from '@/components/Worker/OtherOptions/Profile/Profile.vue';
import Configurations from '@/components/Worker/OtherOptions/Configurations/Configurations.vue';
import ChangePassword from '@/components/Worker/OtherOptions/Configurations/ChangePassword/ChangePassword.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'Worker',
  components: {
    Dashboard,
    OtherOptions,
    Profile,
    Configurations,
    ChangePassword,
    AnswerQuestions,
    Questionaries
  },
  data() {
    return {
      currentScreenSelected: 'Dashboard',
      screens: [
        'Dashboard',
        'OtherOptions',
        'AnswerQuiz',
        'Profile',
        'Configurations',
        'ChangePassword',
        'AnswerQuestions',
        'Questionaries'
      ],
      whereTo: null
    };
  },
  computed: {
    ...mapGetters(['getWhereTo']),
    currentScreen() {
      return this.screens[this.screens.indexOf(this.getWhereTo)];
    }
  },
  methods: {
    screenDisplay() {
      currentScreenSelected = this.whereTo;
    }
  }
};
</script>

<style lang="scss" scoped>
@import './_worker.scss';
</style>
