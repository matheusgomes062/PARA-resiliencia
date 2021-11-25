<template lang="pug">
  div
    Header(routeToGo="OtherOptions")
    
    .profilePictureContainer
      div
      | Alterar foto do perfil
    el-form(ref="form" :model="profile")
      el-form-item(
          label="Nome completo")
        el-input(
          v-model="profile.fullName"
          type="text"
          class="profile-control"
          id="profileFullName")
      el-form-item(
          label="E-mail")
        el-input(
          v-model="profile.email"
          type="email"
          class="profile-control"
          id="profileEmail")
      el-form-item(
          label="Senha")
        el-input(
          v-model="profile.password"
          type="password"
          class="profile-control"
          id="profilePassword")
</template>

<script>
import { ChevronLeftIcon } from 'vue-feather-icons';
import { mapActions, mapGetters } from 'vuex';
import Header from '@/components/Header/Header.vue';

export default {
  name: 'Profile',
  components: {
    ChevronLeftIcon,
    Header
  },
  data() {
    return {
      profile: {
        fullName: null,
        email: null,
        password: null
      }
    };
  },
  computed: {
    ...mapGetters(['getWhereTo'])
  },
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
@import './_profile.scss';
</style>
