<template>
  <div>
    <h1 class="title">Informe seus dados</h1>

    <h2 class="subtitle">
      Assim você poderá ver os planos disponíveis para você!
    </h2>

    <form class="form">
      <div class="form-group">
        <div class="formSection">
          <label class="form-label" for="state">Estado</label>
          <select v-model="form.estado" class="form-control" id="state">
            <option value="defaultState">Selecione uma opção</option>
            <option
              v-for="state in stateObject"
              :key="state.nome"
              :value="state"
              >{{ state.nome }}
            </option>
          </select>
          <!-- <div
          v-if="$v.form.estado.$error && !$v.form.estado.required"
          class="error"
        >
          Campo obrigatório!
        </div> -->
        </div>
        <div v-if="form.estado != 'defaultState'" class="formSection">
          <label class="form-label" for="city">Município</label>
          <select v-model="form.municipio" class="form-control" id="city">
            <option value="defaultCity">Selecione uma opção</option>
            <option v-for="city in cityObject" :key="city.nome" :value="city"
              >{{ city.nome }}
            </option>
          </select>
          <!-- <div
          v-if="$v.form.municipio.$error && !$v.form.municipio.required"
          class="error"
        >
          Campo obrigatório!
        </div> -->
        </div>

        <div v-if="form.municipio != 'defaultCity'" class="formSection">
          <label class="form-label" for="occupation">Profissão</label>
          <select v-model="form.profissao" class="form-control" id="occupation">
            <option value="defaultOccupation">Selecione uma opção</option>
            <option
              v-for="occupation in occupationObject"
              :key="occupation.profissao"
              :value="occupation"
              >{{ occupation.profissao }}
            </option>
          </select>
          <!-- <div
          v-if="$v.form.profissao.$error && !$v.form.profissao.required"
          class="error"
        >
          Campo obrigatório!
        </div> -->
        </div>

        <div v-if="form.profissao != 'defaultOccupation'" class="formSection">
          <label class="form-label" for="entity">Entidade</label>
          <select v-model="form.entidade" class="form-control" id="occupation">
            <option value="defaultEntity">Selecione uma opção</option>
            <option
              v-for="entity in entityObject"
              :key="entity.NomeFantasia"
              :value="entity"
              >{{ entity.NomeFantasia }}
            </option>
          </select>
          <!-- <div
          v-if="$v.form.entidade.$error && !$v.form.entidade.required"
          class="error"
        >
          Campo obrigatório!
        </div> -->
        </div>

        <div v-if="form.entidade != 'defaultEntity'" class="formSection">
          <label class="form-label">Data de Nascimento</label>
          <Datepicker
            placeholder="Selecione uma data"
            v-model="form.datanascimento"
            name="datePicker"
            format="yyyy-MM-dd"
          ></Datepicker>
          <!-- <div
          v-if="$v.form.entidade.$error && !$v.form.entidade.required"
          class="error"
        >
          Campo obrigatório!
        </div> -->
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker';
import { required } from 'vuelidate/lib/validators';
import { mapActions } from 'vuex';
import axios from 'axios';

export default {
  components: {
    Datepicker
  },
  props: {
    wizardData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      form: {
        municipio: 'defaultCity',
        estado: 'defaultState',
        profissao: 'defaultOccupation',
        entidade: 'defaultEntity',
        datanascimento: ''
      },
      stateObject: {},
      cityObject: {},
      occupationObject: {},
      plansObject: {},
      entityObject: {}
    };
  },
  computed: {},
  validations: {
    form: {
      entity: {
        required
      },
      uf: {
        required
      },
      cidade: {
        required
      },
      profissao: {
        required
      },
      datanascimento: {
        required
      }
    }
  },
  methods: {
    ...mapActions(['setPlans']),
    getState() {
      var axiosInstance = axios.create({
        baseURL: `https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome`
      });
      return new Promise((_, reject) => {
        axiosInstance
          .get()
          .then(({ data, status }) => {
            if (status === 200) {
              this.stateObject = data;
            }
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    submit() {
      const d = this.form.datanascimento;
      const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
      const mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(d);
      const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
      const date = [`${ye}-${mo}-${da}`];
      let payload = {
        entidade: this.form.entidade.NomeFantasia,
        uf: this.form.estado.sigla,
        cidade: this.form.municipio.nome,
        datanascimento: date
      };
      var axiosInstance = axios.create({
        baseURL: process.env.VUE_APP_BASE_URL
      });
      return new Promise((resolve, reject) => {
        axiosInstance
          .post(`plano?api-key=` + process.env.VUE_APP_PLANS_API_CODE, payload)
          .then(({ data, status }) => {
            if (status === 200) {
              resolve(
                this.setPlans({
                  data
                })
              );
            }
          })
          .catch((error) => {
            reject(error);
          });
      });
    }
  },
  watch: {
    'form.estado'() {
      var axiosInstance = axios.create({
        baseURL: `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${this.form.estado.id}/municipios`
      });
      return new Promise((_, reject) => {
        axiosInstance
          .get()
          .then(({ data, status }) => {
            if (status === 200) {
              this.cityObject = data;
            }
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    'form.municipio'() {
      var axiosInstance = axios.create({
        baseURL:
          process.env.VUE_APP_BASE_URL +
          `profissao/${this.form.estado.sigla}/${this.form.municipio.nome}?api-key=` +
          process.env.VUE_APP_OCCUPATION_API_CODE
      });
      return new Promise((_, reject) => {
        axiosInstance
          .get()
          .then(({ data, status }) => {
            if (status === 200) {
              this.occupationObject = data;
            }
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    'form.profissao'() {
      var axiosInstance = axios.create({
        baseURL:
          process.env.VUE_APP_BASE_URL +
          `entidade/${this.form.profissao.profissao}/${this.form.estado.sigla}/${this.form.municipio.nome}?api-key=` +
          process.env.VUE_APP_ENTITY_API_CODE
      });
      return new Promise((_, reject) => {
        axiosInstance
          .get()
          .then(({ data, status }) => {
            if (status === 200) {
              this.entityObject = data;
            }
          })
          .catch((error) => {
            reject(error);
          });
      });
    }
  },
  created() {
    this.getState();
  }
};
</script>

<style lang="scss" scoped>
@import './_formUserDetails.scss';
</style>
