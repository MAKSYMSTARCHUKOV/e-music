<template>
  <div id="img-text" class="item">
    <div class="img" :style="$imgSrc(content.img)"></div>
    <div class="flex-line mb-5 ml-0 ml-sm-4 ml-md-8">
      <img src="/images/icons/lines.svg" alt="" class="icon__main" />
      <h1 class="red-title">{{ content.header }}</h1>
    </div>
    <div class="content ml-0 ml-sm-4 ml-md-8">
      <p>{{ content.text }}</p>
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
          img: undefined,
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
  &#img-text {
    display: grid;
    grid-template-columns: 1fr;
    @include tablet() {
      grid-template-columns: minmax(300px, 320px) 1fr;
    }
    @include screen() {
      grid-template-columns: 370px 1fr;
    }
    .img {
      grid-column: 1 / -1;
      grid-row: 1 / span 1;
      height: 400px;
      background-size: cover;
      background-position: center top;
      background-repeat: no-repeat;
      @include tablet() {
        grid-column: 1 / span 1;
        grid-row: 1 / span 2;
      }
    }
    .flex-line {
      grid-column: 1 / -1;
      grid-row: 2 / span 1;
      @include tablet() {
        grid-column: 2 / -1;
        grid-row: 1 / span 1;
      }
    }
    .content {
      grid-column: 1 / -1;
      grid-row: 3 / span 1;
      @include tablet() {
        grid-column: 2 / -1;
        grid-row: 2 / span 1;
      }
    }
  }
}
</style>
