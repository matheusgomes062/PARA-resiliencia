<template lang="pug">
div(v-loading.fullscreen.lock="fullscreenLoading")
  Header(routeToGo="Metrics" title="Indicadores")
  
  div.flex.flex-column.w-100.mb-5.p-2
    h3 Restaurante: {{ this.majorMetrics.retaurantName }}
    .d-flex.flex-row.justify-content-center.b-row.my-3.
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
  
  .d-flex.flex-row.justify-content-start.b-row.my-2.align-items-baseline
    el-radio-group(v-model='exportType')
      el-radio(v-for='(item, index) in supportType' :key='index' :label='item' border) {{item}}
    div(style='margin-left: 20px')
      //- el-button(@click='print' type="primary") Imprimir
      el-button(@click='exportExcel' type="primary") Exportar

  div
    el-table(:data='questionnaires' stripe  height="500" style='width: 1200px; overflow: auto;' ref="elTable" id="table")
      el-table-column(prop='title' label='Questão' width='500')
      el-table-column(prop='totalAnswerer' label='N°. de Respostas' width='150' align="center")
      el-table-column(prop='yesOption' label='Sim' width='150' align="center")
      el-table-column(prop='yesOptionPercentage' label='Sim(%)' width='150' align="center")
      el-table-column(prop='noOption' label='Não' width='150' align="center")
      el-table-column(prop='noOptionPercentage' label='Não(%)' width='150' align="center")
      el-table-column(prop='unknownOption' label='Não entendi a pergunta' width='150' align="center")
      el-table-column(prop='unknownOptionPercentage' label='Não entendi a pergunta(%)' width='150' align="center")
      el-table-column(prop='kitchenChef' label='Chef de cozinha' width='150' align="center")
      el-table-column(prop='kitchenAux' label='Auxiliar de cozinha' width='150' align="center")
      el-table-column(prop='kitchenCooker' label='Cozinheiro(a)' width='150' align="center")
      el-table-column(prop='nobodyAskedMe' label='Não me pediram para modificar nada' width='150' align="center")
      el-table-column(prop='noNutritionist' label='Não há nutricionista no meu restaurante' width='150' align="center")
      el-table-column(prop='discomfort' label='Desconforto' width='150' align="center")
      el-table-column(prop='other' label='Outro' width='150' align="center")
      el-table-column(prop='dissatisfaction' label='Insatisfação' width='150' align="center")
      el-table-column(prop='mood' label='Ânimo' width='150' align="center")
      el-table-column(prop='satisfaction' label='Satisfação' width='150' align="center")
      el-table-column(prop='curiosity' label='Curiosidade' width='150' align="center")
      el-table-column(prop='female' label='Feminino' width='150' align="center")
      el-table-column(prop='preferNotToDeclare' label='Prefiro não declarar' width='150' align="center")
      el-table-column(prop='male' label='Masculino' width='150' align="center")
      el-table-column(prop='brown' label='Pardo' width='150' align="center")
      el-table-column(prop='white' label='Branco' width='150' align="center")
      el-table-column(prop='yellow' label='Amarelo' width='150' align="center")
      el-table-column(prop='black' label='Preto' width='150' align="center")
      el-table-column(prop='indigenous' label='Indígena' width='150' align="center")
      el-table-column(prop='completeHighSchool' label='Ensino médio completo' width='150' align="center")
      el-table-column(prop='incompleteHighSchool' label='Ensino médio incompleto' width='150' align="center")
      el-table-column(prop='incompleteElementarySchool' label='Ensino fundamental incompleto' width='150' align="center")
      el-table-column(prop='incompleteHigherEducation' label='Ensino superior incompleto' width='150' align="center")
      el-table-column(prop='completeHigherEducation' label='Ensino superior completo' width='150' align="center")
      el-table-column(prop='completeElementarySchool' label='Ensino fundamental completo' width='150' align="center")
      //- Tentativa de Colunas dinamicas (Não funciona para imprimir)
      //- el-table-column(v-for="column, index in columns" 
      //-                     :key="column.value"
      //-                     :label="column.value"
      //-                     min-width='150')
      //-   template(slot-scope="prop") {{ column.totalOption }}
      
      //- el-table-column(label='Mais informações' width='150' align="center")
      //-   template(slot-scope="scope")
      //-     el-button(@click="openDialog(scope.row)" type="text" class="fs-3" icon="el-icon-s-data")

  //- Dialogo que pediram para remover
  //- el-dialog(title='Informações avançadas' :visible.sync='dialogVisible' v-loading="dialogLoading")
  //-   el-table(:data='optionsMetrics' stripe style='width: 100%' height="250")
  //-     el-table-column(prop='value' label='Opção')
  //-     el-table-column(prop='points' label='Pontuação' align="center")
  //-     el-table-column(prop='totalAnswererOption' label='N°. de Respostas' align="center")

</template>

<script>
import Header from '@/components/Header/Header.vue';
import { api } from '@/services/index';
import { Printd } from 'printd'
import elTableExport from "el-table-export";
import { mapGetters } from 'vuex';

export default {
  name: 'MetricsData',
  components: {
    Header
  },
  data() {
    return {
      supportType: ["csv", "txt", "json", "xls"],
      exportType: "csv",
      majorMetrics: {},
      questionnaires: [],
      dialogVisible: false,
      optionsMetrics: [],
      fullscreenLoading: true,
      dialogLoading: false,
      columns: []
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
          this.questionnaires.forEach(item => {
            item.questionOptions.sort((a,b) => (a.order > b.order) ? 1 : ((b.order > a.order) ? -1 : 0))
          })
          this.sortQuestionnaires()
          this.questionnaires.forEach(item => {
            item.questionOptions.forEach((option, index) => {
              if(option !== undefined) {
                // Precisa refatorar para algo mais elaborado
                if(option.value === "Sim"){
                  item.yesOption = option.totalOption ? option.totalOption : 0
                  item.yesOptionPercentage = (item.yesOption / item.totalAnswerer) * 100
                }
                if(option.value === "Não"){
                  item.noOption = option.totalOption ? option.totalOption : 0
                  item.noOptionPercentage = (item.noOption / item.totalAnswerer) * 100
                }
                if(option.value === "Não entendi a pergunta"){
                  item.unknownOption = option.totalOption ? option.totalOption : 0
                  item.unknownOptionPercentage = (item.unknownOption / item.totalAnswerer) * 100
                }
                if(option.value === "Chefe de cozinha"){
                  item.kitchenChef = option.totalOption ? option.totalOption : 0
                }
                if(option.value === "Auxiliar de cozinha"){
                  item.kitchenAux = option.totalOption ? option.totalOption : 0
                }
                if(option.value === "Cozinheiro(a)"){
                  item.kitchenCooker = option.totalOption ? option.totalOption : 0
                }
                if(option.value === "Não me pediram para modificar nada"){
                  item.nobodyAskedMe = option.totalOption ? option.totalOption : 0
                }
                if(option.value === "Não há nutricionista no meu restaurante"){
                  item.noNutritionist = option.totalOption ? option.totalOption : 0
                }
                if(option.value === "Incômodo"){
                  item.nuisance = option.totalOption ? option.totalOption : 0
                }
                if(option.value === "Desconforto"){
                  item.discomfort = option.totalOption ? option.totalOption : 0
                }
                if(option.value === "Outro"){
                  item.other = option.totalOption ? option.totalOption : 0
                }
                if(option.value === "Insatisfação"){
                  item.dissatisfaction = option.totalOption ? option.totalOption : 0
                }
                if(option.value === "Ânimo"){
                  item.mood = option.totalOption ? option.totalOption : 0
                }
                if(option.value === "Satisfação"){
                  item.satisfaction = option.totalOption ? option.totalOption : 0
                }
                if(option.value === "Curiosidade"){
                  item.curiosity = option.totalOption ? option.totalOption : 0
                }
                if(option.value === "Feminino"){
                  item.female = option.totalOption ? option.totalOption : 0
                }
                if(option.value === "Prefiro não declarar"){
                  item.preferNotToDeclare = option.totalOption ? option.totalOption : 0
                }
                if(option.value === "Masculino"){
                  item.male = option.totalOption ? option.totalOption : 0
                }
                if(option.value === "Pardo"){
                  item.brown = option.totalOption ? option.totalOption : 0
                }
                if(option.value === "Branco"){
                  item.white = option.totalOption ? option.totalOption : 0
                }
                if(option.value === "Amarelo"){
                  item.yellow = option.totalOption ? option.totalOption : 0
                }
                if(option.value === "Preto"){
                  item.black = option.totalOption ? option.totalOption : 0
                }
                if(option.value === "Indígena"){
                  item.indigenous = option.totalOption ? option.totalOption : 0
                }
                if(option.value === "Ensino médio completo"){
                  item.completeHighSchool = option.totalOption ? option.totalOption : 0
                }
                if(option.value === "Ensino médio incompleto"){
                  item.incompleteHighSchool = option.totalOption ? option.totalOption : 0
                }
                if(option.value === "Ensino fundamental incompleto"){
                  item.incompleteElementarySchool = option.totalOption ? option.totalOption : 0
                }
                if(option.value === "Ensino superior incompleto"){
                  item.incompleteHigherEducation = option.totalOption ? option.totalOption : 0
                }
                if(option.value === "Ensino superior completo"){
                  item.completeHigherEducation = option.totalOption ? option.totalOption : 0
                }
                if(option.value === "Ensino fundamental completo"){
                  item.completeElementarySchool = option.totalOption ? option.totalOption : 0
                }
                item.totalOption = option.totalOption ? option.totalOption : 0
              }
              this.columns.push(option)
            })
          })
          // remove colunas duplicadas
          let allColumns = this.columns.reduce((unique, o) => {
            if(!unique.some(obj => obj.label === o.label && obj.value === o.value)) {
              unique.push(o);
            }
            return unique;
          }, []);
          this.columns = allColumns;
          this.columns = this.columns.filter(data => data.value != 'Sim' && data.value != 'Não' && data.value != 'Não entendi a pergunta');

          
          // this.questionnaires.forEach(item => {
          //   item.questionOptions.forEach((option, index) => {
          //     if(option.value === this.columns[].value)
          //       option.totalOption = this.columns[].totalOption
          //   })
          // })
          this.fullscreenLoading = false
        })
    },
    sortOptions() {
      this.optionsMetrics.sort((a,b) => (a.value > b.value) ? -1 : ((b.value > a.value) ? 1 : 0))
    },
    sortQuestionnaires() {
      this.questionnaires.sort((a,b) => (a.order < b.order) ? -1 : ((b.order > a.order) ? 1 : 0))
    },

    print() {
      const styles = [
        'https://unpkg.com/element-ui/lib/theme-chalk/index.css',
      ]
      const scripts = [
        'https://unpkg.com/element-ui/lib/index.js',
      ]
      
      const d = new Printd()
      d.print( document.getElementById('table'), styles, scripts )
      console.log('print')
    },
    exportExcel() {
      elTableExport(this.$refs.elTable, {
        fileName: "para-resiliencia-tabela",
        type: this.exportType,
        useFormatter: true,
      })
      .then(() => {
          console.info("ok");
      })
      .catch((err) => {
          console.info(err);
      });
    },
    formatterHandler(row) {
        return "formatter: " + row.remark;
    },
  }
}
</script>

<style scoped lang="scss">
.majorMetricsInfoContainer{
  padding: 10px;
}
</style>