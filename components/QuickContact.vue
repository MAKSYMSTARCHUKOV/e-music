<template>
  <div id="contact" class="item">
    <div class="flex-line">
      <img src="/images/icons/lines.svg" alt="" class="icon__main" />
      <h1 class="red-title">є питання?</h1>
    </div>
    <div class="content">
      <div class="mt-5 text mb-4">Замовте дзвінок</div>
      <!-- <v-form class="callback">
        <input
          type="text"
          name="name"
          placeholder="Імʼя"
          class="__input __select mb-5"
        />
        <input
          type="text"
          name="phone"
          placeholder="Телефон"
          class="__input __select mb-5"
        />
        <v-btn color="info" type="submit" class="__select flex-basis-100"
          >Відправити</v-btn
        >
      </v-form> -->
      <v-form class="callback">
        <m-form-component class="__select mb-3">
          <input
            autocomplete="off"
            type="text"
            name="name"
            placeholder="Імʼя"
            required
            class="__input border-radius"
            @keydown="$reject"
          />
        </m-form-component>
        <m-form-component class="__select mb-3">
          <input
            autocomplete="off"
            type="text"
            name="phone"
            placeholder="Телефон"
            data-validate="phone"
            required
            class="__input border-radius"
            @keydown="$reject"
          />
        </m-form-component>
        <v-btn
          color="info"
          class="__select flex-basis-100"
          @click.stop="$validate($event)"
          >Відправити</v-btn
        >
      </v-form>
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
  &#contact {
    .text {
      color: $info;
      font-size: rem(18);
      @include tablet() {
        font-size: rem(32);
      }
      @include screen() {
        font-size: rem(38);
      }
    }
    .callback {
      display: flex;
      flex-direction: column;
      .__select {
        width: 100%;
        @include tablet() {
          width: 33.3%;
        }
      }
    }
  }
}
</style>
