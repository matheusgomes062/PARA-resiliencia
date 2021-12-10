<template lang="pug">
  div
    Header(routeToGo="Dashboard" title="Editais")
    div.d-flex.flex-row.justify-content-between
      el-button(class="noticeButton" @click="screenMediator('CreateNotices')") Criar Edital
    div(style=" height: 250px; overflow-y:auto; margin-top: 10px;")
      div(v-for="(notice, index) in notices" :key="index" class="noticeContainer")
        div(class="notice")
          div(class="noticeTitle")
            h5 Edital {{index}}
          
          div.d-flex.flex-row.justify-content-between

            el-button(icon="el-icon-view" @click="setQuestionary(notice.questionnaire), screenMediator('Questionaries')" circle)
</template>

<script>
import { ChevronLeftIcon } from 'vue-feather-icons';
import { mapActions, mapGetters } from 'vuex';
import Header from '@/components/Header/Header.vue';
import { api } from '@/services/index';

export default {
  name: 'Notices',
  components: {
    ChevronLeftIcon,
    Header
  },
  data() {
    return {
      notices: []
    };
  },
  computed: {
    ...mapGetters(['getWhereTo'])
  },
  created() {
    this.requestNotices();
  },
  methods: {
    ...mapActions([
      'setWhereTo',
      'resetWhereTo',
      'setNoticeQuestionary',
      'resetNoticeQuestionary'
    ]),
    setQuestionary(questionary) {
      console.log(questionary)
      this.resetNoticeQuestionary();
      this.setNoticeQuestionary([questionary]);
    },
    screenMediator(whereTo) {
      this.$destroy();
      this.resetWhereTo();
      this.setWhereTo(whereTo);
    },
    requestNotices() {
      api
        .get('/notice')
        .then((response) => {
          if (response.status == 200) {
            this.notices = response.data;
            console.log(this.notices)
          } else {
            this.$vToastify.error(
              'Não foi possível buscar os questionários...'
            );
          }
        })
        .catch((error) => {
          console.log(error.response);
          this.$vToastify.error('Não foi possível buscar os questionários...');
        });
    }
  }
};
</script>

<style lang="scss" scoped>
@import './notices.scss';
</style>
