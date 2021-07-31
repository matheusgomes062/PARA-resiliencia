<template>
  <div class="otherOptionsContainer">
    <div class="goBackIcon">
      <chevron-left-icon
        size="2x"
        class="btn"
        @click="screenMediator('Dashboard')"
      ></chevron-left-icon>
    </div>
    <div class="subtitleContentContainer">
      <h2>Outras Opções</h2>
      <div class="otherOptionsGroupContainer">
        <button @click="screenMediator('Profile')">Perfil</button>
        <button @click="screenMediator('Configurations')">Configuração</button>
        <button @click="logout">Sair</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ChevronLeftIcon } from 'vue-feather-icons';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'OtherOptions',
  components: {
    ChevronLeftIcon
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(['getWhereTo'])
  },
  methods: {
    ...mapActions(['setWhereTo', 'resetWhereTo', 'logoutUser']),
    screenMediator(whereTo) {
      this.resetWhereTo();
      this.setWhereTo(whereTo);
    },
    changeButtonColor() {
      this.isNotificationActive = !this.isNotificationActive;
    },
    logout() {
      this.logoutUser();
      this.$router.push('/');
    }
  }
};
</script>

<style lang="scss" scoped>
@import './_otherOptions.scss';
</style>
