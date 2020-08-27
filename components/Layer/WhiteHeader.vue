<template>
  <div class="headers mb-10 d-flex flex-column align-center">
    <div class="bg-header mb-3 w-header">
      <slot name="bg-header"></slot>
    </div>
    <div class="md-header mb-3 w-header">
      <slot name="md-header"></slot>
    </div>
    <div class="sm-header mb-3 w-header">
      <slot name="sm-header"></slot>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import '~/assets/_defaults.scss';
.w-header {
  color: white;
  text-align: center;
}
.bg-header {
  text-transform: uppercase;
  font-weight: 900;
  font-size: rem(24);
  @include screen() {
    font-size: rem(33);
  }
}
.md-header {
  text-transform: uppercase;
  font-weight: 900;
  font-size: rem(16);
  @include screen() {
    font-size: rem(25);
  }
}
.sm-header {
  font-size: rem(16);
  @include screen() {
    font-size: rem(20);
  }
}
</style>
