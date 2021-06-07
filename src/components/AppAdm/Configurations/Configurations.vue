<template>
  <div class="configurationsContainer">
    <div class="goBackIcon">
      <chevron-left-icon
        size="2x"
        class="btn"
        @click="screenMediator('Dashboard')"
      ></chevron-left-icon>
    </div>
    <div class="configurationPictureContainer">
      <p>Configuração</p>
    </div>
    <div class="configurationGroupContainer">
      <button>Alterar senha</button>
      <button>Ativar nofiticação</button>
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
    return {};
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
@import './_configurations.scss';
</style>
