<template>
  <div>
    <div class="header">
      <div class="goBackIcon">
        <chevron-left-icon
          size="2x"
          class="btn"
          @click="screenMediator('Dashboard')"
        ></chevron-left-icon>
      </div>
      <div class="buttonsContainer">
        <button @click="saveChanges" class="saveBtn">Salvar Alterações</button>
        <button @click="screenMediator('CreateQuestionary')" class="addBtn">Criar Questionário</button>
      </div>
    </div>
    <div class="titlePage">
      <h1>Questionários</h1>
    </div>
    <div class="questionariesContainer">
      <div class="questionary">
        <div class="title">
            <p>Título: </p>
            <input value="lorem ipsum">
        </div>
        <button class="openBtn" @click="screenMediator('EditQuestions')">
          Abrir
        </button>
        <div
            size="2x"
            class="deleteBtn"
            @click="deleteQuestionary()"
        >X</div>
      </div>
    </div>
  </div>
</template>

<script>
import { ChevronLeftIcon } from 'vue-feather-icons';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'EditQuestionary',
  components: {
    ChevronLeftIcon
  },
  data() {
    return {

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
    },
    deleteQuestionary() {
      this.$vToastify.success('Questionário deletado!');
    },
    saveChanges() {
      this.$vToastify.success('Questionário alterado!');
    }
  }
}
</script>

<style lang="scss" scoped>
@import './_editQuestionary.scss';
</style>
