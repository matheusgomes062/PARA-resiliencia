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
import Dashboard from '@/components/RestaurantAdm/Dashboard/Dashboard.vue';
import RegisterRestaurant from '@/components/RestaurantAdm/RegisterRestaurant/RegisterRestaurant.vue';
import OtherOptions from '@/components/RestaurantAdm/OtherOptions/OtherOptions.vue';
import Questionaries from '@/components/RestaurantAdm/Questionaries/Questionaries.vue';
import AnswerQuestions from '@/components/RestaurantAdm/AnswerQuestions/AnswerQuestions.vue';
import Profile from '@/components/RestaurantAdm/OtherOptions/Profile/Profile.vue';
import Configurations from '@/components/RestaurantAdm/OtherOptions/Configurations/Configurations.vue';
import ChangePassword from '@/components/RestaurantAdm/OtherOptions/Configurations/ChangePassword/ChangePassword.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'RestaurantAdm',
  components: {
    Dashboard,
    RegisterRestaurant,
    OtherOptions,
    Questionaries,
    Profile,
    Configurations,
    ChangePassword,
    AnswerQuestions
  },
  data() {
    return {
      currentScreenSelected: 'Dashboard',
      screens: [
        'Dashboard',
        'RegisterRestaurant',
        'OtherOptions',
        'Questionaries',
        'Profile',
        'Configurations',
        'ChangePassword',
        'AnswerQuestions'
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
@import './_restaurantAdm.scss';
</style>
