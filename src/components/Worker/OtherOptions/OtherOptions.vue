<template>
  <div class="otherOptionsContainer">
    <Header routeToGo="Dashboard" title="Outras Opções"></Header>
    <div class="subtitleContentContainer">
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
import Header from '@/components/Header/Header.vue';

export default {
  name: 'OtherOptions',
  components: {
    ChevronLeftIcon,
    Header
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
