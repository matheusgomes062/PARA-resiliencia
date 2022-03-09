<template lang="pug">
div.d-flex.flex-column.w-100
  Header(routeToGo="Dashboard" title="Cadastrar Restaurante")

  el-form.d-flex.flex-column.w-100.my-3(ref="form" :model="registerRestaurant")
    el-form-item(label="Nome do Restaurante")
      el-input(
        v-model="registerRestaurant.name"
        type="text"
        class="registerRestaurant-control"
        id="name")
      div(
          v-if="$v.registerRestaurant.name.$error && !$v.registerRestaurant.name.required"
          class="error") Nome do Restaurante é necessário!
    hr
    div.d-flex.flex-column
      h3(class="form-label") Localização
      el-form-item(label="Rua")
        el-input(v-model="registerRestaurant.street"
          type="text"
          class="registerRestaurant-control"
          id="street")
        div(
            v-if="$v.registerRestaurant.street.$error && !$v.registerRestaurant.street.required"
            class="error") Nome da Rua é necessário!
      div.d-flex.flex-row.w-100.justify-content-between
        el-form-item(label="Número").col-3
          el-input(
            v-model="registerRestaurant.streetNumber"
            type="number"
            class="registerRestaurant-control"
            id="streetNumber")
          div(
              v-if="$v.registerRestaurant.streetNumber.$error && !$v.registerRestaurant.streetNumber.required"
              class="error") Número da Rua é necessário!
        el-form-item(label="Bairro").col-8
          el-input(
            v-model="registerRestaurant.neighborhood"
            type="text"
            class="registerRestaurant-control"
            id="neighborhood")
          div(
              v-if="$v.registerRestaurant.neighborhood.$error && !$v.registerRestaurant.neighborhood.required"
              class="error") Nome do Bairro é necessário!
      el-form-item(label="Cidade")
        el-input(
          v-model="registerRestaurant.city"
          type="text"
          class="registerRestaurant-control"
          id="city")
        div(
          v-if="$v.registerRestaurant.city.$error && !$v.registerRestaurant.city.required"
          class="error") Nome da Cidade é necessário!
      el-form-item(label="Estado")
        el-input(
          v-model="registerRestaurant.state"
          type="text"
          class="registerRestaurant-control"
          id="state")
        div(
          v-if="$v.registerRestaurant.state.$error && !$v.registerRestaurant.state.required"
          class="error") Nome da Estado é necessário!
    
  el-button(class="main-btn" @click="isFormValid") FINALIZAR
</template>

<script>
import { required } from 'vuelidate/lib/validators';
import { api } from '@/services/index';
import { ChevronLeftIcon } from 'vue-feather-icons';
import { mapActions, mapGetters } from 'vuex';
import Header from '@/components/Header/Header.vue';

export default {
  name: 'RegisterRestaurant',
  components: {
    ChevronLeftIcon,
    Header
  },
  data() {
    return {
      registerRestaurant: {
        name: null,
        street: null,
        streetNumber: null,
        neighborhood: null,
        city: null,
        state: null
      }
    };
  },
  validations: {
    registerRestaurant: {
      name: { required },
      street: { required },
      streetNumber: { required },
      neighborhood: { required },
      city: { required },
      state: { required }
    }
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
    isFormValid() {
      this.$v.$touch();
      if (!this.$v.registerRestaurant.$invalid) {
        api
          .post('/restaurant', this.registerRestaurant)
          .then((response) => {
            if (response.status == 201) {
              this.$vToastify.success(
                'Restaurante Cadastrado com sucesso!',
                'Sucesso!'
              );
              // this.$router.push(this.routes['RestaurantAdm']);
              // this.$router.push('Dashboard');
              this.screenMediator('Dashboard')
            } else {
              this.$vToastify.error(
                'Não foi possível cadastrar restaurante...'
              );
            }
          })
          .catch((error) => {
            console.log(error.response);
            this.$vToastify.error('Não foi possível cadastrar restaurante...');
          });
      }
    },
    resetState() {
      this.$v.$reset();
      this.registerRestaurant.name = null;
      this.registerRestaurant.street = null;
      this.registerRestaurant.streetNumber = null;
      this.registerRestaurant.neighborhood = null;
      this.registerRestaurant.city = null;
      this.registerRestaurant.state = null;
    }
  }
};
</script>

<style lang="scss" scoped>
@import './_registerRestaurant.scss';
</style>
