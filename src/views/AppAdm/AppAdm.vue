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
import Dashboard from '@/components/AppAdm/Dashboard/Dashboard.vue';
import Profile from '@/components/AppAdm/Profile/Profile.vue';
import RegisterRestaurant from '@/components/AppAdm/RegisterRestaurant/RegisterRestaurant.vue';
import QuizAnswers from '@/components/AppAdm/QuizAnswers/QuizAnswers.vue';
import Configurations from '@/components/AppAdm/Configurations/Configurations.vue';
import ChangePassword from '@/components/AppAdm/Configurations/ChangePassword/ChangePassword.vue';
import EditQuestionary from '@/components/AppAdm/EditQuestionary/EditQuestionary.vue';
import EditQuestions from '@/components/AppAdm/EditQuestions/EditQuestions.vue';
import CreateQuestion from '@/components/AppAdm/CreateQuestions/CreateQuestion.vue';
import CreateQuestionary from '@/components/AppAdm/CreateQuestionary/CreateQuestionary.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'AppAdm',
  components: {
    Dashboard,
    Profile,
    RegisterRestaurant,
    QuizAnswers,
    Configurations,
    ChangePassword,
    EditQuestionary,
    EditQuestions,
    CreateQuestion,
    CreateQuestionary
  },
  data() {
    return {
      currentScreenSelected: 'Dashboard',
      screens: [
        'Dashboard',
        'Profile',
        'Configurations',
        'ChangePassword',
        'RegisterRestaurant',
        'EditQuestionary',
        'EditQuestions',
        'CreateQuestion',
        'CreateQuestionary'
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
