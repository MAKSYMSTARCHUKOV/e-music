<template>
  <div class="with-header d-flex w-100 mb-5">
    <div class="main-header d-flex justify-space-between align-center w-100">
      <div class="inner-header d-flex align-center">
        <slot name="icon-header"></slot>
        <h3>
          <slot name="header"></slot>
        </h3>
      </div>
      <slot name="extra"></slot>
    </div>
    <slot name="break"></slot>
    <slot name="content"></slot>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import '~/assets/_defaults.scss';
.with-header {
  flex-wrap: wrap;
  .inner-header {
    img {
      height: 32px;
      width: auto;
      margin-right: 15px;
    }
    h3 {
      padding: 0;
      font-weight: 600;
      color: black;
      font-size: rem(16);
    }
  }
}
</style>
