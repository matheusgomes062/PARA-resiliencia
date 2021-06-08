<template>
  <div class="registerRestaurantContainer">
    <div class="goBackIcon">
      <chevron-left-icon
        size="2x"
        class="btn"
        @click="screenMediator('Dashboard')"
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
      </div>
      <div class="registerRestaurant-group">
        <label class="form-label" for="owner">Proprietário</label>
        <input
          v-model="registerRestaurant.owner"
          type="text"
          class="registerRestaurant-control"
          id="owner"
        />
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
          </div>
          <div class="registerRestaurant-group">
            <label class="form-label" for="addressDistrict">Bairro</label>
            <input
              v-model="registerRestaurant.addressDistrict"
              type="text"
              class="registerRestaurant-control"
              id="addressDistrict"
            />
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
        </div>
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
  computed: {
    ...mapGetters(['getWhereTo'])
  },
  methods: {
    ...mapActions(['setWhereTo', 'resetWhereTo']),
    screenMediator(whereTo) {
      this.resetWhereTo();
      this.setWhereTo(whereTo);
      this.$vToastify.success(
        'Restaurante Cadastrado com sucesso!',
        'Sucesso!'
      );
    }
  }
};
</script>

<style lang="scss" scoped>
@import './_registerRestaurant.scss';
</style>
