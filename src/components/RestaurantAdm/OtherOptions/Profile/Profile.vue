<template>
  <div>
    <div class="goBackIcon">
      <chevron-left-icon
        size="2x"
        class="btn"
        @click="screenMediator('OtherOptions')"
      ></chevron-left-icon>
    </div>
    <div class="profilePictureContainer">
      <div></div>
      <p>Alterar foto do perfil</p>
    </div>
    <div class="profileGroupContainer">
      <div class="profile-group">
        <label class="form-label" for="profileFullName">Nome completo</label>
        <input
          v-model="profile.fullName"
          type="text"
          class="profile-control"
          id="profileFullName"
        />
      </div>
      <div class="profile-group">
        <label class="form-label" for="profileEmail">E-mail</label>
        <input
          v-model="profile.email"
          type="email"
          class="profile-control"
          id="profileEmail"
        />
      </div>
      <div class="profile-group">
        <label class="form-label" for="profilePassword">Senha</label>
        <input
          v-model="profile.password"
          type="password"
          class="profile-control"
          id="profilePassword"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { ChevronLeftIcon } from 'vue-feather-icons';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Profile',
  components: {
    ChevronLeftIcon
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
