<template>
  <div class="icon-text d-flex align-start w-100">
    <img v-if="src !== ''" :src="src" />
    <div class="w-100 info-item">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      default: ''
    }
  }
};
</script>

<style lang="scss" scoped>
@import '~/assets/_defaults.scss';
.icon-text {
  font-size: rem(16);
  font-weight: 300;
  img {
    margin-right: 10px;
    width: 20px;
    height: auto;
    margin-top: 6px;
  }
  .info-item {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    *:not(:last-child) {
      margin-bottom: 8px;
    }
  }
}
</style>
