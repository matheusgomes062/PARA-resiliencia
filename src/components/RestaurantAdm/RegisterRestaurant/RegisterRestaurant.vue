<template lang="pug">
  div.d-flex.flex-column.w-100
    Header(routeToGo="Dashboard" title="Cadastrar Restaurante")

    el-form.d-flex.flex-column.w-100.my-3(ref="form" :model="registerRestaurant")
      el-form-item(label="Nome do Restaurante")
        el-input(
          v-model="registerRestaurant.restaurantName"
          type="text"
          class="registerRestaurant-control"
          id="restaurantName")
        div(
            v-if="$v.registerRestaurant.restaurantName.$error && !$v.registerRestaurant.restaurantName.required"
            class="error") Nome do Restaurante é necessário!
      el-form-item(label="Proprietário")
        el-input(
          v-model="registerRestaurant.owner"
          type="text"
          class="registerRestaurant-control"
          id="owner")
        div(
            v-if="$v.registerRestaurant.owner.$error && !$v.registerRestaurant.owner.required"
            class="error") Nome do Proprietário é necessário!
      hr
      div.d-flex.flex-column
        h3(class="form-label") Localização
        el-form-item(label="Rua")
          el-input(v-model="registerRestaurant.addressStreet"
            type="text"
            class="registerRestaurant-control"
            id="addressStreet")
          div(
              v-if="$v.registerRestaurant.addressStreet.$error && !$v.registerRestaurant.addressStreet.required"
              class="error") Nome da Rua é necessário!
        div.d-flex.flex-row.w-100.justify-content-between
          el-form-item(label="Número").col-3
            el-input(
              v-model="registerRestaurant.addressNumber"
              type="number"
              class="registerRestaurant-control"
              id="addressNumber")
            div(
                v-if="$v.registerRestaurant.addressNumber.$error && !$v.registerRestaurant.addressNumber.required"
                class="error") Número da Rua é necessário!
          el-form-item(label="Bairro").col-8
            el-input(
              v-model="registerRestaurant.addressDistrict"
              type="text"
              class="registerRestaurant-control"
              id="addressDistrict")
            div(
                v-if="$v.registerRestaurant.addressDistrict.$error && !$v.registerRestaurant.addressDistrict.required"
                class="error") Nome do Bairro é necessário!
        el-form-item(label="Cidade")
          el-input(
            v-model="registerRestaurant.addressCity"
            type="text"
            class="registerRestaurant-control"
            id="addressCity")
          div(
            v-if="$v.registerRestaurant.addressCity.$error && !$v.registerRestaurant.addressCity.required"
            class="error") Nome da Cidade é necessário!
      
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
        restaurantName: null,
        owner: null,
        addressStreet: null,
        addressNumber: null,
        addressDistrict: null,
        addressCity: null
      }
    };
  },
  validations: {
    registerRestaurant: {
      restaurantName: { required },
      owner: { required },
      addressStreet: { required },
      addressNumber: { required },
      addressDistrict: { required },
      addressCity: { required }
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
          .post('/registerRestaurant', this.registerRestaurant)
          .then((response) => {
            if (response.status == 200) {
              this.$vToastify.success(
                'Restaurante Cadastrado com sucesso!',
                'Sucesso!'
              );
              this.$router.push(this.routes['RestaurantAdm']);
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
      this.registerRestaurant.restaurantName = null;
      this.registerRestaurant.owner = null;
      this.registerRestaurant.addressStreet = null;
      this.registerRestaurant.addressNumber = null;
      this.registerRestaurant.addressDistrict = null;
      this.registerRestaurant.addressCity = null;
    }
  }
};
</script>

<style lang="scss" scoped>
@import './_registerRestaurant.scss';
</style>
