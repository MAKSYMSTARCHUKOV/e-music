<template>
  <a class="m-card" :style="{ backgroundImage: `url(${src})` }" :href="link">
    <div class="top w-100">
      <h1>
        <slot name="header"></slot>
      </h1>
    </div>
    <div class="footer d-flex w-100">
      <slot name="footer"></slot>
    </div>
  </a>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      default: 'card-img-1.png'
    },
    link: {
      type: String,
      default: '/'
    }
  }
};
</script>

<style lang="scss" scoped>
@import '~/assets/_defaults.scss';
.m-card {
  position: relative;
  background-position: center top;
  background-size: cover;
  display: block;
  box-shadow: 2px 2px 15px rgba($color: #000000, $alpha: 0.1);
  cursor: pointer;
  .top,
  .footer {
    position: absolute;
    background-color: rgba($color: #000000, $alpha: 0.68);
    padding: 10px;
  }
  .top {
    @include screen() {
      padding: 12px 28px;
    }
    h1 {
      padding: 0;
      font-size: rem(20);
      font-weight: normal;
      color: $info;
      text-transform: none;
      text-align: left;
      @include screen() {
        font-size: rem(27);
      }
    }
  }
  .footer {
    flex-wrap: wrap;
    bottom: 0;
    * {
      font-weight: 500;
      color: white;
    }
    .stress {
      font-weight: 600;
      color: $info;
      margin-right: 20px;
      margin-bottom: 8px;
      @include screen() {
        font-size: rem(20);
      }
    }
  }
}
</style>
