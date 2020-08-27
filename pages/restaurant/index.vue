<template>
  <v-content class="d-flex flex-column align-center">
    <client-only>
      <cool-lightbox
        :items="items"
        :index="index"
        :slideshow="false"
        :loop="false"
        @close="index = null"
      ></cool-lightbox>
    </client-only>
    <m-breadcrumps>{{ getValue('title') }}</m-breadcrumps>
    <div class="content-white-layer d-flex flex-column">
      <div class="bio section">
        <img :src="avatar" alt="" />
        <div class="info-box d-flex flex-column">
          <h1 id="name" class=" mb-1 mb-sm-2">
            {{ getValue('title').toUpperCase() }}
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <a id="edit" href="/restaurant/edit" v-on="on">
                  <img :src="$src('icons/edit.svg')" alt="" />
                </a>
              </template>
              <span>Редагувати</span>
            </v-tooltip>
          </h1>
          <div v-if="!$isEmpty(getValue('settle'))" id="settle" class="mb-7">
            {{ getValue('settle') }}
          </div>
          <w-header v-if="!$isEmpty(style)" class="spec">
            <template #header>Стиль</template>
            <template #break>
              <div class="flex-break"></div>
            </template>
          </w-header>
          <div v-if="!$isEmpty(style)" class="spec-content mb-10">
            <m-chip
              v-for="s of style"
              :key="s"
              bg-color="rgba(233, 13, 59, 0.2)"
              class="mr-2 mb-2"
              >{{ $capitalize(s) }}</m-chip
            >
          </div>
          <div
            v-if="!$isEmpty(getValue('description'))"
            id="review"
            class="mb-7"
          >
            {{ getValue('description') }}
          </div>
          <i-text
            v-if="!$isEmpty(getValue('phones'))"
            src="/images/icons/telephone.svg"
          >
            <a
              v-for="(tel, i) of getValue('phones')"
              :key="i"
              :href="`tel:${tel}`"
              >{{ tel }}</a
            >
          </i-text>
          <i-text
            v-if="!$isEmpty(getValue('email'))"
            src="/images/icons/envelope.svg"
            >{{ getValue('email') }}</i-text
          >
        </div>
      </div>
      <div v-if="!$isEmpty(getValue('photos'))" class="photo section">
        <w-header>
          <template #icon-header>
            <img src="/images/icons/camera.svg" alt="" />
          </template>
          <template #header>Світлини:</template>
          <template #extra>
            <div class="extra d-flex align-center">
              <img
                src="/images/icons/arrow-red.svg"
                alt=""
                class="left-nav nav-button pointer"
              />
              <img
                src="/images/icons/arrow-red.svg"
                alt=""
                class="ml-6 right-nav nav-button pointer"
              />
            </div>
          </template>
        </w-header>
        <template v-if="!$isEmpty(getValue('photos'))">
          <div
            v-if="!$isEmpty(getValue('photos')[0].value)"
            class="photo-content w-100"
          >
            <client-only>
              <swiper id="photo-carousel" :options="photoOpt">
                <swiper-slide v-for="(p, ind) of getValue('photos')" :key="ind">
                  <div
                    class="photo-item pointer"
                    :style="{ backgroundImage: `url(/storage/${p.value})` }"
                    @click.stop="index = ind"
                  ></div>
                </swiper-slide>
              </swiper>
            </client-only>
          </div>
        </template>
      </div>
      <div v-if="!$isEmpty(getValue('videos'))" class="video section">
        <w-header>
          <template #icon-header>
            <img src="/images/icons/video-camera.svg" alt="" />
          </template>
          <template #header>Відео:</template>
          <template #extra>
            <div class="extra d-flex align-center">
              <img
                src="/images/icons/arrow-red.svg"
                alt=""
                class="left-nav nav-button pointer"
              />
              <img
                src="/images/icons/arrow-red.svg"
                alt=""
                class="ml-6 right-nav nav-button pointer"
              />
            </div>
          </template>
        </w-header>
        <div class="video-content w-100">
          <client-only>
            <swiper id="video-carousel" :options="videoOpt">
              <swiper-slide
                v-for="(p, ind) of getValue('videos')"
                :key="ind"
                class="video-slide"
              >
                <iframe
                  class="video-item"
                  frameborder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                  :src="
                    `${p
                      .replace('watch?v=', 'embed/')
                      .replace('youtu.be', 'www.youtube.com/embed')}`
                  "
                ></iframe>
                <div
                  class="video-shield pointer"
                  @click.stop="v_index = ind"
                ></div>
              </swiper-slide>
            </swiper>
          </client-only>
        </div>
      </div>
      <div v-if="!$isEmpty(getValue('socials'))" class="social section">
        <w-header>
          <template #header>Мережі:</template>
          <template #extra>
            <div class="social-content d-flex align-center">
              <template v-for="s of getValue('socials')">
                <a
                  v-if="s.includes('facebook')"
                  :key="s"
                  :href="`${s.startsWith('http') ? s : 'https://' + s}`"
                  ><img src="/images/icons/facebook-black.svg" alt=""
                /></a>
                <a
                  v-if="s.includes('twitter')"
                  :key="s"
                  :href="`${s.startsWith('http') ? s : 'https://' + s}`"
                  ><img src="/images/icons/twitter-black.svg" alt=""
                /></a>
                <a
                  v-if="s.includes('instagram')"
                  :key="s"
                  :href="`${s.startsWith('http') ? s : 'https://' + s}`"
                  ><img src="/images/icons/instagram-black.svg" alt=""
                /></a>
                <a
                  v-if="s.includes('youtube')"
                  :key="s"
                  :href="`${s.startsWith('http') ? s : 'https://' + s}`"
                  ><img src="/images/icons/youtube-black.svg" alt=""
                /></a>
              </template>
            </div>
          </template>
        </w-header>
      </div>
      <div class="calendar section">
        <w-header>
          <template #header>
            Календар:
          </template>
        </w-header>
        <div class="calendar-content">
          <m-calendar
            :swiper-options="{
              slidesPerView: 3,
              spaceBetween: 30,
              breakpoints: {
                540: {
                  slidesPerView: 1,
                  spaceBetween: 0
                },
                900: {
                  slidesPerView: 2,
                  spaceBetween: 20
                },
                1200: {
                  slidesPerView: 3,
                  spaceBetween: 30
                }
              }
            }"
          ></m-calendar>
        </div>
      </div>
    </div>
  </v-content>
</template>

<script>
import shared from '~/mixins/shared.js';
import performer from '~/mixins/performer.js';
import mounted from '~/mixins/mounted.js';

export default {
  mixins: [shared, performer, mounted],
  asyncData({ app, store, redirect, route }) {
    return app.$profile
      .getUser()
      .then((r) => {
        if (r.data.role !== 4) {
          switch (r.data.role) {
            case 2: {
              redirect({ name: 'artist' });
              break;
            }
            case 3: {
              redirect({ name: 'band' });
              break;
            }
            case 1: {
              redirect({ name: 'agent' });
              break;
            }
          }
        }
        store.commit('setField', {
          data: r.data,
          logged: true,
          id: r.data.id,
          role: r.data.role
        });
        if (app.$isEmpty(r.data.fields.confirmed.value.value)) {
          redirect({ name: 'restaurant-register' });
        }
        return {
          avatar: store.state.defaultAvatar
        };
      })
      .catch((e) => {
        store.commit('setField', {
          logged: undefined
        });
        redirect({ name: 'index' });
      });
  },
  head() {
    return {
      title: `«${this.$store.state.data.fields.title.value.value}»`
    };
  }
};
</script>

<style lang="scss" scoped>
@import '~/static/scss/agent-profile.scss';
</style>
