<template>
  <v-app color="primary">
    <v-content>
      <h1 color="info">
        {{ error.statusCode }}
      </h1>
      <br />
      <h3>{{ error.message }}</h3>
    </v-content>
  </v-app>
</template>

<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  head() {
    return {
      title: `${this.error.statusCode}`
    };
  }
};
</script>

<style scoped>
h1 {
  color: #e90d3b;
  text-align: left;
  font-size: 35px;
  margin-top: 30px;
}
</style>
