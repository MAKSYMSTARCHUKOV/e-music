<template>
  <div class="white-layer">
    <div class="headers d-flex flex-column">
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
    <slot name="content"></slot>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import '~/assets/_defaults.scss';
.white-layer {
  display: flex;
  flex-direction: column;
  align-items: center;
  .w-header {
    color: white;
    text-align: center;
  }
  .headers {
    margin-bottom: 40px;
    align-items: center;
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
  .content-white-layer {
    border-radius: 10px;
    background-color: #fff;
    width: 100%;
  }
}
</style>
