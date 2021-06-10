<template>
  <div class="changePasswordContainer">
    <div class="goBackIcon">
      <chevron-left-icon
        size="2x"
        class="btn"
        @click="screenMediator('Configurations')"
      ></chevron-left-icon>
    </div>
    <div class="changePasswordPictureContainer">
      <h2>Mudar Senha</h2>
    </div>
    <div class="changePasswordGroupContainer">
      <div class="changePassword-group">
        <label class="form-label" for="previousPassword">Senha anterior</label>
        <input
          v-model="changePassword.previousPassword"
          type="text"
          class="changePassword-control"
          id="previousPassword"
        />
      </div>
      <div class="changePassword-group">
        <label class="form-label" for="newPassword">Nova Senha</label>
        <input
          v-model="changePassword.newPassword"
          type="text"
          class="changePassword-control"
          id="newPassword"
        />
      </div>
      <div class="changePassword-group">
        <label class="form-label" for="confirmNewPassword"
          >Confirmar nova senha</label
        >
        <input
          v-model="changePassword.confirmNewPassword"
          type="text"
          class="changePassword-control"
          id="confirmNewPassword"
        />
      </div>
      <button class="main-btn" @click="screenMediator('Dashboard')">
        FINALIZAR
      </button>
    </div>
  </div>
</template>

<script>
import { ChevronLeftIcon } from 'vue-feather-icons';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'ChangePassword',
  components: {
    ChevronLeftIcon
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
