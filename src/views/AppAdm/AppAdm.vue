<template>
  <div class="mainContent">
    <component
      :whereTo="whereTo"
      ref="currentScreen"
      :is="currentScreen"
    ></component>
  </div>
</template>

<script>
import Dashboard from '@/components/AppAdm/Dashboard/Dashboard.vue';
import Profile from '@/components/AppAdm/Profile/Profile.vue';
import RegisterRestaurant from '@/components/AppAdm/RegisterRestaurant/RegisterRestaurant.vue';
import Questionaries from '@/components/AppAdm/Questionaries/Questionaries.vue';
import QuizAnswers from '@/components/AppAdm/QuizAnswers/QuizAnswers.vue';
import Answers from '@/components/AppAdm/Answers/Answers.vue';
import Configurations from '@/components/AppAdm/Configurations/Configurations.vue';
import ChangePassword from '@/components/AppAdm/Configurations/ChangePassword/ChangePassword.vue';
import EditQuestions from '@/components/AppAdm/EditQuestions/EditQuestions.vue';
import ChangeQuestion from '@/components/AppAdm/ChangeQuestion/ChangeQuestion.vue';
import CreateQuestion from '@/components/AppAdm/CreateQuestions/CreateQuestion.vue';
import Notices from '@/components/AppAdm/Notices/Notices.vue';
import CreateNotices from '@/components/AppAdm/CreateNotices/CreateNotices.vue';
import Metrics from '@/components/AppAdm/Metrics/Metrics.vue';
import MetricsData from '@/components/AppAdm/Metrics/MetricsData.vue';
import RegisterUserScreen from '@/components/Login/RegisterUser/RegisterUser.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'AppAdm',
  components: {
    Dashboard,
    Profile,
    Questionaries,
    RegisterRestaurant,
    QuizAnswers,
    Configurations,
    Answers,
    ChangePassword,
    EditQuestions,
    ChangeQuestion,
    CreateQuestion,
    Notices,
    CreateNotices,
    Metrics,
    MetricsData,
    RegisterUserScreen
  },
  data() {
    return {
      currentScreenSelected: 'Dashboard',
      screens: [
        'Dashboard',
        'Profile',
        'Questionaries',
        'Configurations',
        'ChangePassword',
        'QuizAnswers',
        'RegisterRestaurant',
        'EditQuestions',
        'ChangeQuestion',
        'Answers',
        'CreateQuestion',
        'Notices',
        'CreateNotices',
        'Metrics',
        'MetricsData',
        'RegisterUserScreen'
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
@import './_appAdm.scss';
</style>
