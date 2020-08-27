<template>
  <div id="garantee" class="item">
    <div class="flex-line">
      <img src="/images/icons/lines.svg" alt="" class="icon__main" />
      <h1 class="red-title">наші гарантії</h1>
    </div>
    <div class="content">
      <div class="proof">
        <img src="/images/icons/rewind.svg" alt="" class="mb-md-10 mb-5" />
        <p>Гарантія виступу</p>
      </div>
      <div class="proof">
        <img src="/images/icons/video.svg" alt="" class="mb-md-10 mb-5" />
        <p>
          Більше 2000<br class="d-lg-none d-block" />
          проведених<br class="d-block" />
          виступів
        </p>
      </div>
      <div class="proof">
        <img src="/images/icons/microphone.svg" alt="" class="mb-md-10 mb-5" />
        <p>Прозрачная цена</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
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
  &#garantee {
    .content {
      display: flex;
      flex-direction: column;
      @include tablet() {
        flex-direction: row;
        justify-content: space-around;
      }
      .proof {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        margin-top: 60px;
        text-align: center;
      }
    }
  }
}
</style>
