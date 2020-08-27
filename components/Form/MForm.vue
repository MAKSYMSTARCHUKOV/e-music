<template>
  <v-form>
    <slot name="element"></slot>
    <slot name="button"></slot>
  </v-form>
</template>

<script>
export default {
  props: {
    url: {
      type: String,
      default: 'dummy.org'
    }
  },
  data() {
    return {
      incorrect: false,
      message: 'test'
    };
  }
};
</script>

<style lang="scss" scoped></style>
