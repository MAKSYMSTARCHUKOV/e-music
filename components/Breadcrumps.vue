<template>
  <div class="m-breadcrumps d-flex">
    <a href="/">Головна</a>
    &nbsp;/&nbsp;
    <a href="/restaurants">Заклади</a>
    &nbsp;/&nbsp;
    <div><slot></slot></div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import '~/assets/_defaults.scss';
.m-breadcrumps {
  margin: 20px 0 45px;
  color: $dim;
  font-size: rem(12);
  @include tablet() {
    font-size: rem(14);
  }
  * {
    color: $dim;
    font-size: rem(12);
    @include tablet() {
      font-size: rem(14);
    }
  }
  div {
    color: white;
  }
}
</style>
