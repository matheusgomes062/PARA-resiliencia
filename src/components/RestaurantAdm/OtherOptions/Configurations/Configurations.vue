<template>
  <div class="configurationsContainer">
    <div class="goBackIcon">
      <chevron-left-icon
        size="2x"
        class="btn"
        @click="screenMediator('OtherOptions')"
      ></chevron-left-icon>
    </div>
    <h2>Configuração</h2>
    <div class="configurationGroupContainer">
      <button @click="screenMediator('ChangePassword')">Alterar senha</button>
      <button
        @click="changeButtonColor"
        :class="isNotificationActive ? 'active' : 'disable'"
      >
        {{
          isNotificationActive ? 'Ativar nofiticação' : 'Desativar notificação'
        }}
      </button>
    </div>
  </div>
</template>

<script>
import { ChevronLeftIcon } from 'vue-feather-icons';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Configurations',
  components: {
    ChevronLeftIcon
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
