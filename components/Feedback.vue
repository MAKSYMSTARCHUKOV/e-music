<template>
  <div class="item">
    <div class="flex-line">
      <img src="/images/icons/lines.svg" alt="" class="icon__main" />
      <h1 class="red-title">відгуки</h1>
    </div>
    <Carousel id="feedback" user-class="feedback">
      <client-only>
        <swiper id="feedback-carousel" :options="feedbackOpt">
          <swiper-slide
            v-for="(d, index) in feedback"
            :key="index"
            class="slide-item"
          >
            <div class="header">
              <b>{{ d.name }}</b>
              <div class="flex-break d-md-none"></div>
              {{ d.date }}
            </div>
            <p>{{ d.text }}</p>
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
      feedbackOpt: {
        slidesPerView: 2,
        spaceBetween: 20,
        speed: 500,
        navigation: {
          nextEl: '#feedback-carousel-right',
          prevEl: '#feedback-carousel-left',
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
    ...mapState(['feedback'])
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
  #feedback {
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
      background-color: $info;
      border-radius: 10px;
      padding: 10px;
      @include tablet() {
        padding: 20px;
      }
      .header {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        align-items: center;
        color: white;
        font-size: rem(16);
        @include tablet() {
          font-size: rem(20);
        }
        b {
          font-weight: 900;
          font-size: rem(16);
          @include tablet() {
            font-size: rem(20);
          }
        }
      }
      p {
        margin-top: 10px;
        text-indent: 35px;
        color: black;
        font-size: rem(16);
      }
    }
  }
}
</style>
