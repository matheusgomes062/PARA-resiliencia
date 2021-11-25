<template lang="pug">
  div.d-flex.flex-column.justify-content-between(style="min-height: 270px;")
    Header(routeToGo="Configurations" title="Mudar Senha")

    el-form.my-3
      el-form-item(label="Senha anterior")
        el-input(
          v-model="changePassword.previousPassword"
          type="text"
          class="changePassword-control"
          id="previousPassword")
      el-form-item(label="Nova Senha")
        el-input(
          v-model="changePassword.newPassword"
          type="text"
          class="changePassword-control"
          id="newPassword")
      el-form-item(label="Confirmar nova senha")
        el-input(
          v-model="changePassword.confirmNewPassword"
          type="text"
          class="changePassword-control"
          id="confirmNewPassword")
    
    el-button(class="main-btn" @click="screenMediator('Dashboard')") FINALIZAR
</template>

<script>
import { ChevronLeftIcon } from 'vue-feather-icons';
import { mapActions, mapGetters } from 'vuex';
import Header from '@/components/Header/Header.vue';

export default {
  name: 'ChangePassword',
  components: {
    ChevronLeftIcon,
    Header
  },
  data() {
    return {
      changePassword: {
        previousPassword: null,
        newPassword: null,
        confirmNewPassword: null
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
      this.$vToastify.success('Senha alterada com sucesso!', 'Sucesso!');
    },
    changePassword() {}
  }
};
</script>

<style lang="scss" scoped>
@import './_changePassword.scss';
</style>
