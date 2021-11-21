<template lang="pug">
  div.d-flex.flex-column.justify-content-between(style="min-height: 270px;")
    Header(routeToGo="OtherOptions" title="Configuração")
    div.d-flex.flex-column.justify-content-around.w-100(style="height: 150px")
      el-button.mx-1(type="primary" @click="screenMediator('ChangePassword')") Alterar senha
      el-button.mx-1(
        @click="changeButtonColor"
        :class="isNotificationActive ? 'active' : 'disable'") {{ isNotificationActive ? 'Ativar nofiticação' : 'Desativar notificação' }}
</template>

<script>
import { ChevronLeftIcon } from 'vue-feather-icons';
import { mapActions, mapGetters } from 'vuex';
import Header from '@/components/Header/Header.vue';

export default {
  name: 'Configurations',
  components: {
    ChevronLeftIcon,
    Header
  },
  data() {
    return {
      isNotificationActive: true
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
    },
    changeButtonColor() {
      this.isNotificationActive = !this.isNotificationActive;
    }
  }
};
</script>

<style lang="scss" scoped>
@import './_configurations.scss';
</style>
