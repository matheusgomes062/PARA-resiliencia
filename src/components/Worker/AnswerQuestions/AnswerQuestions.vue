<template lang="pug">
  div(style="width: 700px; height: 500px; overflow-y: auto;")
    Header(routeToGo="Questionaries" title="Título")
    
    div.p-2.d-flex.flex-column.my-3
      div.py-3(v-for="(question, index) in QuestionsList" :key="index")
        div.d-flex(style="max-width: 630px;")
          h3(style="margin-right: 10px;") {{question.id}}.
          p(style="max-width: 800px; text-align: left;") {{question.title}}
          
        div(v-if="question.type === 'options'" class="questionsContainer")
          div.d-flex.align-items-center.my-2(v-for="(option, index) in question.options" :key="index" )
            label(class="switch")
              input(type="checkbox" :value="option" @click="checkType(option)")
              span(class="slider round")
            p.px-2 {{ option }}
        div(v-if="question.type === 'normal'" style="padding: 20px 10px 20px 30px")
          textarea.w-100
    
    div.d-flex.justify-content-end.my-3.px-3
      el-button(@click="isFormValid" type="primary") Enviar
</template>

<script>
import { ChevronLeftIcon } from 'vue-feather-icons';
import { mapActions, mapGetters } from 'vuex';
import Header from '@/components/Header/Header.vue';

export default {
  name: 'AnswerQuestions',
  components: {
    Header,
    ChevronLeftIcon
  },
  data() {
    return {
      selectedQuestion: false,
      QuestionsList: [
        {
          id: 1,
          type: 'options',
          title:
            'Você achou que o conteúdo ensinado nesses treinamentos mudou o seu pensamento em relação ao seu trabalho? (se você for o responsável por efetuaros treinamentos, não responder esta pergunta)',
          options: ['Sim', 'Não']
        },
        {
          id: 2,
          type: 'options',
          title:
            'Você achou que o conteúdo ensinado nesses treinamentos mudou o seu pensamento em relação ao seu trabalho? (se você for o responsável por efetuaros treinamentos, não responder esta pergunta)',
          options: ['Sim', 'Não']
        },
        {
          id: 2,
          type: 'normal',
          title:
            'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
        }
      ]
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
    isFormValid() {
      this.$vToastify.success('Respostas enviadas!');
    }
  }
};
</script>

<style lang="scss" scoped>
@import './_answerQuestions.scss';
</style>
