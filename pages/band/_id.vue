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
      <cool-lightbox
        :items="videos"
        :index="v_index"
        :slideshow="false"
        :loop="false"
        @close="v_index = null"
      ></cool-lightbox>
    </client-only>
    <white-header>
      <template #bg-header>
        профіль
      </template>
      <template #md-header>
        колективу
      </template>
    </white-header>
    <div class="content-white-layer d-flex flex-column">
      <div class="bio section">
        <img :src="avatar" alt="" />
        <div class="info-box d-flex flex-column">
          <h1 id="name" class=" mb-1 mb-sm-2">
            {{ getValue('title') }}
          </h1>
          <div v-if="!$isEmpty(getValue('settle'))" id="settle" class="mb-7">
            {{ getValue('settle') }}
          </div>
          <w-header v-if="!$isEmpty(spec)" class="spec">
            <template #header>Спеціальність</template>
            <template #break>
              <div class="flex-break"></div>
            </template>
          </w-header>
          <div v-if="!$isEmpty(spec)" class="spec-content mb-10">
            <m-chip
              v-for="s of spec"
              :key="s"
              bg-color="rgba(233, 13, 59, 0.2)"
              class="mr-2 mb-2"
              >{{ $capitalize(s) }}</m-chip
            >
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
          <w-header v-if="!$isEmpty(getValue('composition'))" class="spec">
            <template #header>Склад</template>
            <template #break>
              <div class="flex-break"></div>
            </template>
          </w-header>
          <div
            v-if="!$isEmpty(getValue('composition'))"
            class="spec-content mb-10"
          >
            <m-chip bg-color="rgba(233, 13, 59, 0.2)" class="mr-2 mb-2">{{
              $capitalize(composition)
            }}</m-chip>
          </div>
          <w-header v-if="!$isEmpty(getValue('artists'))" class="mt-10">
            <template #header>Учасники:</template>
            <template #extra>
              <div
                v-for="a of getValue('artists')"
                :key="a.name"
                class="d-flex align-center mr-auto ml-5"
              >
                <a :href="`/artist/${a.id}`">{{ a.name }}</a>
              </div>
            </template>
          </w-header>
          <template v-if="logged === true">
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
          </template>
          <w-header v-if="!$isEmpty(getValue('agent'))" class="mt-10">
            <template #header>Агент:</template>
            <template #extra>
              <div class="d-flex align-center mr-auto ml-5">
                <a :href="`/agent/${getValue('agent').id}`">{{
                  getValue('agent').name
                }}</a>
              </div>
            </template>
          </w-header>
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
          <template #header>Кліпи:</template>
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
      <!-- <div v-if="!$isEmpty(getValue('audios'))" class="audio section">
        <w-header>
          <template #icon-header>
            <img src="/images/icons/melody.svg" alt="" />
          </template>
          <template #header>Аудио:</template>
        </w-header>
        <div class="audio-content w-100 d-flex flex-column">
          <div
            v-for="(a, ind) of getValue('audios')"
            :key="ind"
            class="song d-flex mt-5 w-100 align-center"
          >
            <img
              src="/images/icons/play.svg"
              alt=""
              class="manipulate-button mr-5 pointer"
              @click="playPause($event, a.src)"
            />
            <div class="audio-title">{{ a.title.toUpperCase() }}</div>
          </div>
        </div>
      </div> -->
      <div v-if="!$isEmpty(getValue('playlists'))" class="audio section">
        <w-header>
          <template #icon-header>
            <img src="/images/icons/melody.svg" alt="" />
          </template>
          <template #header>Плейлисти:</template>
        </w-header>
        <div class="audio-content w-100 d-flex flex-column">
          <div
            v-for="(a, ind) of getValue('playlists')"
            :key="ind"
            class="song d-flex mt-5 w-100 align-center"
          >
            <a :href="a" class="audio-title">{{
              a.replace(/http(s)*:\/\//, '')
            }}</a>
          </div>
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
      <div
        v-if="!$isEmpty(getValue('have')) || !$isEmpty(getValue('provide'))"
        class="rider section"
      >
        <w-header>
          <template #header>
            Райдер:
          </template>
          <template #break>
            <div class="flex-break"></div>
          </template>
          <template #content>
            <div class="rider-content w-100 d-flex flex-column mt-5">
              <div
                v-if="!$isEmpty(getValue('have'))"
                class="rider-item d-flex w-100 mb-5"
              >
                <div class="rider-title">У наявності:</div>
                <div class="rider-items">{{ getValue('have').join(', ') }}</div>
              </div>
              <div
                v-if="!$isEmpty(getValue('provide'))"
                class="rider-item d-flex w-100"
              >
                <div class="rider-title">Надати:</div>
                <div class="rider-items">
                  {{ getValue('provide').join(', ') }}
                </div>
              </div>
            </div>
          </template>
        </w-header>
      </div>
      <div v-if="isEmptyPrice && logged === true" class="price section">
        <w-header>
          <template #header>
            Мінімальна ціна за виступ сьогодні:
          </template>
          <template #content>
            <div class="price-content mt-5 d-flex">
              <template v-for="(p, ind) of getValue('prices').regular">
                <div
                  v-if="!$isEmpty(p.price)"
                  :key="ind"
                  class="price-item mr-2 mb-3 d-flex flex-column align-center"
                >
                  <div
                    class="pill border-radius"
                    :style="{ backgroundColor: colors[p.title] }"
                  >
                    {{ currentPrice(p.title, p.price) }}
                  </div>
                  <div class="price-title mt-3">
                    {{ priceTitle(p.title) }}
                  </div>
                </div>
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
  async asyncData({ app, store, redirect, route, error }) {
    let id;
    try {
      const r = await app.$profile.getUser();
      id = r.data.id;
    } catch (e) {}
    return app.$profile
      .getUserById(route.params.id)
      .then((r) => {
        if (route.params.id === id) {
          switch (r.data.role) {
            case 1: {
              redirect({ name: 'agent' });
              break;
            }
            case 2: {
              redirect({ name: 'artist' });
              break;
            }
            case 3: {
              redirect({ name: 'band' });
              break;
            }
            case 4: {
              redirect({ name: 'restaurant' });
              break;
            }
          }
        }
        store.commit('setField', {
          data: r.data
        });
        return {
          avatar: store.state.defaultAvatar
        };
      })
      .catch((e) => {
        error({
          statusCode: e.status,
          message:
            e.data.error || e.data.message || e.data || 'Что-то пошло не так'
        });
      });
  },
  computed: {
    composition() {
      const c = this.getValue('composition');
      switch (c) {
        case 'two': {
          return 'дует';
        }
        case 'three': {
          return 'тріо';
        }
        case 'more': {
          return '4 та більше';
        }
        default: {
          return '';
        }
      }
    }
  },
  head() {
    return {
      title: 'Кабинет колективу'
    };
  }
};
</script>

<style lang="scss" scoped>
@import '~/static/scss/agent-profile.scss';
</style>
