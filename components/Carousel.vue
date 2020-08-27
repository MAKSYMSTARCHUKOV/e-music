<template>
  <section>
    <img
      :id="carouselButtonClass('left')"
      src="/images/icons/arrow-red.svg"
      alt="<"
      class="icon pointer"
    />
    <slot></slot>
    <img
      :id="carouselButtonClass('right')"
      src="/images/icons/arrow-red.svg"
      alt=">"
      class="icon pointer"
    />
  </section>
</template>

<script>
export default {
  props: {
    userClass: {
      type: String,
      default: 'default'
    }
  },
  methods: {
    carouselButtonClass(dur) {
      return `${this.userClass}-carousel-${dur}`;
    }
  }
};
</script>

<style lang="scss" scoped>
@import '~/static/scss/_carousel.scss';
</style>
