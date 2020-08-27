<template>
  <div class="item">
    <div class="flex-line">
      <img src="/images/icons/lines.svg" alt="" class="icon__main" />
      <h1 class="red-title">с нами работают</h1>
    </div>
    <Carousel id="restaurants" user-class="restaurants">
      <client-only>
        <swiper id="restaurants-carousel" :options="restOpt">
          <swiper-slide
            v-for="(d, index) in restaurants"
            :key="index"
            class="slide-item"
          >
            <div class="img" :style="imgSrc(d.img)"></div>
            <div class="label mt-2 mt-lg-5 text-red">{{ d.name }}</div>
          </swiper-slide>
        </swiper>
      </client-only>
    </Carousel>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Carousel from '@/components/Carousel.vue';
export default {
  components: {
    Carousel
  },
  data() {
    return {
      restOpt: {
        slidesPerView: 5,
        spaceBetween: 20,
        speed: 500,
        navigation: {
          nextEl: '#restaurants-carousel-right',
          prevEl: '#restaurants-carousel-left',
          disabledClass: 'd-opaq'
        },
        autoplay: {
          delay: 3000
        },
        breakpoints: {
          540: {
            slidesPerView: 1,
            spaceBetween: 0
          }
        }
      }
    };
  },
  computed: {
    ...mapState(['restaurants'])
  },
  methods: {
    imgSrc(src) {
      return `background-image: url(/images/${src})`;
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
  #restaurants {
    margin-top: 20px;
    @include tablet() {
      margin-top: 40px;
    }
    @include screen() {
      margin-top: 60px;
    }
    [id$='carousel'] {
      margin: 0 20px;
    }
    .slide-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      .img {
        width: 170px;
        height: 170px;
        background-size: cover;
        background-position: center;
        background-repeat: none;
        border-radius: 10px;
        border: 2px solid white;
        @include tablet() {
          width: 110px;
          height: 110px;
        }
        @include screen() {
          width: 170px;
          height: 170px;
        }
      }
      .label {
        text-align: center;
      }
    }
  }
}
</style>
