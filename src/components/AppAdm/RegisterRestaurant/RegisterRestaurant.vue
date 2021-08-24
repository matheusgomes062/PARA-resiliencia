<template>
  <div class="registerRestaurantContainer">
    <div class="goBackIcon">
      <chevron-left-icon
        size="2x"
        class="btn"
        @click="resetState(), screenMediator('Dashboard')"
      ></chevron-left-icon>
    </div>
    <div class="registerRestaurantPictureContainer">
      <h2>Cadastrar Restaurante</h2>
    </div>
    <div class="registerRestaurantGroupContainer">
      <div class="registerRestaurant-group">
        <label class="form-label" for="restaurantName"
          >Nome do Restaurante</label
        >
        <input
          v-model="registerRestaurant.restaurantName"
          type="text"
          class="registerRestaurant-control"
          id="restaurantName"
        />
        <div
            v-if="$v.registerRestaurant.restaurantName.$error && !$v.registerRestaurant.restaurantName.required"
            class="error"
          >
            Nome do Restaurante é necessário!
          </div>
      </div>
      <div class="registerRestaurant-group">
        <label class="form-label" for="owner">Proprietário</label>
        <input
          v-model="registerRestaurant.owner"
          type="text"
          class="registerRestaurant-control"
          id="owner"
        />
        <div
            v-if="$v.registerRestaurant.owner.$error && !$v.registerRestaurant.owner.required"
            class="error"
          >
            Nome do Proprietário é necessário!
        </div>
      </div>
      <hr />
      <div class="addressRestaurant-group">
        <h3 class="form-label">Localização</h3>
        <div class="registerRestaurant-group">
          <label class="form-label" for="addressStreet">Rua</label>
          <input
            v-model="registerRestaurant.addressStreet"
            type="text"
            class="registerRestaurant-control"
            id="addressStreet"
          />
          <div
              v-if="$v.registerRestaurant.addressStreet.$error && !$v.registerRestaurant.addressStreet.required"
              class="error"
            >
              Nome da Rua é necessário!
          </div>
        </div>
        <div class="numberDistrictContainer">
          <div class="registerRestaurant-group" id="addressNumberContainer">
            <label class="form-label" for="addressNumber">Número</label>
            <input
              v-model="registerRestaurant.addressNumber"
              type="number"
              class="registerRestaurant-control"
              id="addressNumber"
            />
            <div
                v-if="$v.registerRestaurant.addressNumber.$error && !$v.registerRestaurant.addressNumber.required"
                class="error"
              >
                Número da Rua é necessário!
            </div>
          </div>
          <div class="registerRestaurant-group">
            <label class="form-label" for="addressDistrict">Bairro</label>
            <input
              v-model="registerRestaurant.addressDistrict"
              type="text"
              class="registerRestaurant-control"
              id="addressDistrict"
            />
            <div
                v-if="$v.registerRestaurant.addressDistrict.$error && !$v.registerRestaurant.addressDistrict.required"
                class="error"
              >
                Nome do Bairro é necessário!
            </div>
          </div>
        </div>
        <div class="registerRestaurant-group">
          <label class="form-label" for="addressCity">Cidade</label>
          <input
            v-model="registerRestaurant.addressCity"
            type="text"
            class="registerRestaurant-control"
            id="addressCity"
          />
          <div
            v-if="$v.registerRestaurant.addressCity.$error && !$v.registerRestaurant.addressCity.required"
            class="error"
            >
            Nome da Cidade é necessário!
          </div>
        </div>
      </div>
      <button class="main-btn" @click="isFormValid">
        FINALIZAR
      </button>
    </div>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators';
import { api } from '@/services/index';
import { ChevronLeftIcon } from 'vue-feather-icons';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'RegisterRestaurant',
  components: {
    ChevronLeftIcon
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
    },
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
      this.$v.$touch()
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
              this.$vToastify.error('Não foi possível cadastrar restaurante...');
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
      this.registerRestaurant.restaurantName = null
      this.registerRestaurant.owner = null
      this.registerRestaurant.addressStreet = null
      this.registerRestaurant.addressNumber = null
      this.registerRestaurant.addressDistrict = null
      this.registerRestaurant.addressCity = null
    }
  }
};
</script>

<style lang="scss" scoped>
@import './_registerRestaurant.scss';
</style>
