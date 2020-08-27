<template>
  <div id="logo-text" class="item">
    <div class="flex-line">
      <img src="/images/icons/lines.svg" alt="" class="icon__main" />
      <h1 class="red-title">{{ content.header }}</h1>
    </div>
    <div class="content mt-5">
      <article>
        <p>{{ content.text }}</p>
      </article>
      <img src="/images/logo.svg" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    content: {
      type: Object,
      default: () => {
        return {
          header: '',
          text: ''
        };
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import '~/assets/_defaults.scss';
.item {
  margin-top: 60px;
  margin-bottom: 50px;
  @include tablet() {
    margin-top: 60px;
    margin-bottom: 120px;
  }
  .red-title {
    text-align: left;
    margin-left: 10px;
    line-height: 35px;
    @include tablet() {
      margin-left: 20px;
    }
  }
  &#logo-text {
    .content {
      display: grid;
      grid-template-columns: 1fr;
      @include screen() {
        grid-template-columns: 1fr min-content;
      }
      article {
        grid-column: 1 / span 1;
      }
      img {
        grid-column: span 1;
        width: 300px;
        justify-self: center;
        @include tablet() {
          justify-self: end;
        }
      }
    }
  }
}
</style>
