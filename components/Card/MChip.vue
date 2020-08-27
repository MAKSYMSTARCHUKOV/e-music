<template>
  <div class="m-chip border-radius" :style="{ backgroundColor: bgColor }">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    bgColor: {
      type: String,
      default: '#131313'
    }
  }
};
</script>

<style lang="scss" scoped>
@import '~/assets/_defaults.scss';
.m-chip {
  font-size: rem(16);
  font-weight: 300;
  padding: 8px 30px;
}
</style>
