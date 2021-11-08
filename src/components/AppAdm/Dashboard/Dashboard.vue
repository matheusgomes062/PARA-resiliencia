<template>
  <div>
    <h1 class="cardTitle">PARA Resiliência</h1>
    <div>
      <h3 class="subtitle">Seja bem vindo(a)!</h3>
      <div class="optionsContainer">
        <div>
          <div @click="screenMediator('Profile')">Perfil</div>
          <div @click="screenMediator('QuizAnswers')">
            Editais
          </div>
          <!-- <div @click="screenMediator('Questionaries')">Editar questionário</div> -->
          <div @click="screenMediator('RegisterRestaurant')">
            Cadastrar restaurante
          </div>
        </div>
        <div>
          <div @click="screenMediator('Configurations')">Configuração</div>
          <div @click="logout">Sair</div>
          <span></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { api } from '@/services/index';

export default {
  name: 'dashboard',
  components: {},
  data() {
    return {
      // whereTo: null
    };
  },
  computed: {
    ...mapGetters(['getWhereTo'])
  },
  created() {
    this.getQuestionaries();
  },
  methods: {
    ...mapActions([
      'setWhereTo',
      'resetWhereTo',
      'logoutUser',
      'setAllQuestionaries'
    ]),
    getQuestionaries() {
      api
        .get('/questionary')
        .then((response) => {
          if (response.status == 200) {
            this.setAllQuestionaries(response.data);
          } else {
            console.log('error');
          }
        })
        .catch((error) => {
          console.log(error.response);
        });
    },
    screenMediator(whereTo) {
      this.resetWhereTo();
      this.setWhereTo(whereTo);
    },
    logout() {
      this.logoutUser();
      this.$router.push('/');
    }
  }
};
</script>

<style lang="scss" scoped>
@import './_dashboard.scss';
</style>
