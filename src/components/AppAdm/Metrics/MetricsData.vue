<template lang="pug">
div(v-loading.fullscreen.lock="fullscreenLoading")
  Header(routeToGo="Metrics" title="Indicadores")
  
  div.flex.flex-column.w-100.mb-5.p-2
    .d-flex.flex-row.justify-content-evenly.b-row.my-3.rounded.
      {{ this.majorMetrics.questionnaireTitle }}
    .d-flex.flex-row.justify-content-evenly.b-row
      div(class="col rounded shadow-sm mb-3 majorMetricsInfoContainer")
        label(for="questionnaireTitle" style="font-size: 0.9rem;") Número de respostas
        p.fw-bold.fs-5 {{ this.majorMetrics.answerers }}
      div.mx-1
      div(class="col rounded shadow-sm mb-3 majorMetricsInfoContainer")
        label(for="questionnaireTitle" style="font-size: 0.9rem;") Pontos totais
        p.fw-bold.fs-5 {{ this.majorMetrics.totalPoints ? this.majorMetrics.totalPoints : 0 }}
      div.mx-1
      div(class="col rounded shadow-sm mb-3 majorMetricsInfoContainer")
        label(for="questionnaireTitle" style="font-size: 0.9rem;") Data de início
        p.fw-bold.fs-5 {{ this.majorMetrics.noticeStartDate }}

  el-table(:data='questionnaires' stripe style='width: 100%' height="250")
    el-table-column(prop='title' label='Questão' width='500')
    el-table-column(prop='totalAnswerer' label='N°. de Respostas' width='150' align="center")
    //- el-table-column(prop='totalQuestion' label='Pontuação Total' width='150' align="center")
    el-table-column(label='Mais informações' width='150' align="center")
      template(slot-scope="scope")
        el-button(@click="openDialog(scope.row)" type="text" class="fs-3" icon="el-icon-s-data")

  el-dialog(title='Informações avançadas' :visible.sync='dialogVisible' v-loading="dialogLoading")
    el-table(:data='optionsMetrics' stripe style='width: 100%' height="250")
      el-table-column(prop='value' label='Opção')
      el-table-column(prop='points' label='Pontuação' align="center")
      el-table-column(prop='totalAnswererOption' label='N°. de Respostas' align="center")

</template>

<script>
import { api } from '@/services/index';
import Header from '@/components/Header/Header.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'MetricsData',
  components: {
    Header
  },
  data() {
    return {
      majorMetrics: {},
      questionnaires: [],
      dialogVisible: false,
      optionsMetrics: [],
      fullscreenLoading: true,
      dialogLoading: false
    }
  },
  validations: {
  },
  computed: {
    ...mapGetters(['getWhereTo', 'getNoticeId'])
  },
  created() {
    this.getMajorMetrics();
  },
  methods: {
    openDialog(row) {
      this.dialogVisible = true;
      this.getOptionsMetrics(row)
    },
    async getOptionsMetrics(row) {
      this.dialogLoading = true
      await api
        .get(
          'notice/analytics/option/' + 
          '?noticeId=' + this.getNoticeId +
          '&&questionId=' + row.id
        )
        .then(({data}) => {
          this.optionsMetrics = data
          this.sortOptions()
          this.dialogLoading = false
        })
    },
    async getMajorMetrics() {
      await api
        .get('/notice/analytics/general/' + this.getNoticeId)
        .then(({data}) => {
          this.majorMetrics = data[0]
          let date_new = new Date(this.majorMetrics.noticeStartDate);
          let br_date = new Intl.DateTimeFormat('pt-BR').format(date_new)
          this.majorMetrics.noticeStartDate = br_date
          this.getQuestionsMetrics()
        })
    },
    async getQuestionsMetrics() {
      await api
        .get('/notice/analytics/general/detailed/' + this.getNoticeId)
        .then(({data}) => {
          this.questionnaires = data.questionnaire.questions  
          this.fullscreenLoading = false
        })
    },
    sortOptions() {
      this.optionsMetrics.sort((a,b) => (a.value > b.value) ? -1 : ((b.value > a.value) ? 1 : 0))
    },
  }
}
</script>

<style scoped lang="scss">
.majorMetricsInfoContainer{
  padding: 10px;
}
</style>