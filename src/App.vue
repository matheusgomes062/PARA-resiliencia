<template>
  <div id="app" class="container">
    <!-- <header class="header">
      <div>
        <span id="logo">Resiliência</span>
      </div>
    </header> -->

    <div class="content">
      <FormWizard />
    </div>
  </div>
</template>

<script>
import FormWizard from '@/components/formWizard/FormWizard.vue';
export default {
  name: 'app',
  components: {
    FormWizard
  }
};
</script>

<style lang="scss">
body {
  font-family: $main-font;
}
.header {
  display: flex;
  padding: 20px;
  width: 700px;
  margin: 0 auto;
}
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
