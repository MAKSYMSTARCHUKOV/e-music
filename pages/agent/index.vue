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
        агента
      </template>
    </white-header>
    <div class="content-white-layer d-flex flex-column">
      <div class="bio section">
        <img :src="avatar" alt="" />
        <div class="info-box d-flex flex-column">
          <h1 id="name" class=" mb-1 mb-sm-2">
            {{ name
            }}<v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <a id="edit" href="/agent/edit" v-on="on">
                  <img :src="$src('icons/edit.svg')" alt="" />
                </a>
              </template>
              <span>Редагувати</span>
            </v-tooltip>
          </h1>
          <div v-if="!$isEmpty(getValue('settle'))" id="settle" class="mb-7">
            {{ getValue('settle') }}
          </div>
          <template
            v-if="
              !$isEmpty(getValue('artists')) || !$isEmpty(getValue('bands'))
            "
          >
            <w-header v-if="!$isEmpty(specAll)" class="spec">
              <template #header>Спеціальність</template>
              <template #break>
                <div class="flex-break"></div>
              </template>
            </w-header>
            <div v-if="!$isEmpty(specAll)" class="spec-content mb-10">
              <m-chip
                v-for="s of specAll"
                :key="s"
                bg-color="rgba(233, 13, 59, 0.2)"
                class="mr-2 mb-2"
                >{{ $capitalize(s) }}</m-chip
              >
            </div>
            <w-header v-if="!$isEmpty(styleAll)" class="spec">
              <template #header>Стиль</template>
              <template #break>
                <div class="flex-break"></div>
              </template>
            </w-header>
            <div v-if="!$isEmpty(styleAll)" class="spec-content mb-10">
              <m-chip
                v-for="s of styleAll"
                :key="s"
                bg-color="rgba(233, 13, 59, 0.2)"
                class="mr-2 mb-2"
                >{{ $capitalize(s) }}</m-chip
              >
            </div>
          </template>
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
      <div v-if="!$isEmpty(getValue('artists'))" class="mus section">
        <w-header>
          <template #header>Музыканты:</template>
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
        <div class="mus-content w-100">
          <client-only>
            <swiper id="mus-carousel" :options="musOpt">
              <swiper-slide
                v-for="(d, _index) of getValue('artists')"
                :key="_index"
              >
                <m-card
                  :src="
                    $isEmpty(d.avatar) ? defaultAvatar : `/storage/${d.avatar}`
                  "
                  :link="`/artist/${d.id}`"
                >
                  <template #header>
                    {{ d.name }}
                  </template>
                  <template v-if="!$isEmpty(d.spec)" #footer>
                    <template
                      v-for="(g, ind) in JSON.parse(d.spec).map((s) => s.title)"
                    >
                      <div v-if="ind < 2" :key="ind" class="stress">
                        {{ g.toUpperCase() }}
                      </div>
                      <div
                        v-if="
                          JSON.parse(d.spec).map((s) => s.title).length > 2 &&
                            ind === 2
                        "
                        :key="ind"
                        class="flex-break"
                      ></div>
                      <div v-if="ind >= 2" :key="ind">
                        {{ g.toUpperCase() }}
                      </div>
                    </template>
                  </template>
                </m-card>
              </swiper-slide>
            </swiper>
          </client-only>
        </div>
      </div>
      <div v-if="!$isEmpty(getValue('bands'))" class="bands section">
        <w-header>
          <template #header>Колективи:</template>
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
        <div class="mus-content w-100">
          <client-only>
            <swiper id="mus-carousel" :options="musOpt">
              <swiper-slide
                v-for="(d, _index) of getValue('bands')"
                :key="_index"
              >
                <m-card
                  :src="
                    $isEmpty(d.avatar) ? defaultAvatar : `/storage/${d.avatar}`
                  "
                  :link="`/band/${d.id}`"
                >
                  <template #header>
                    {{ d.name }}
                  </template>
                  <template v-if="!$isEmpty(d.spec)" #footer>
                    <template
                      v-for="(g, ind) in JSON.parse(d.spec).map((s) => s.title)"
                    >
                      <div v-if="ind < 2" :key="ind" class="stress">
                        {{ g.toUpperCase() }}
                      </div>
                      <div
                        v-if="
                          JSON.parse(d.spec).map((s) => s.title).length > 2 &&
                            ind === 2
                        "
                        :key="ind"
                        class="flex-break"
                      ></div>
                      <div v-if="ind >= 2" :key="ind">
                        {{ g.toUpperCase() }}
                      </div>
                    </template>
                  </template>
                </m-card>
              </swiper-slide>
            </swiper>
          </client-only>
        </div>
      </div>
      <!-- <div class="event section">
        <w-header>
          <template #header>EVENT:</template>
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
        <div class="event-content w-100">
          <client-only>
            <swiper id="event-carousel" :options="eventOpt">
              <swiper-slide v-for="(d, _index) in artists" :key="_index">
                <m-card :src="d.img">
                  <template #header>
                    {{ d.name }}
                  </template>
                  <template #footer>
                    <template v-for="(g, ind) in d.genres">
                      <div v-if="ind < 2" :key="ind" class="stress">
                        {{ g.toUpperCase() }}
                      </div>
                      <div
                        v-if="d.genres.length > 2 && ind === 2"
                        :key="ind"
                        class="flex-break"
                      ></div>
                      <div v-if="ind >= 2" :key="ind">
                        {{ g.toUpperCase() }}
                      </div>
                    </template>
                  </template>
                </m-card>
              </swiper-slide>
            </swiper>
          </client-only>
        </div>
      </div> -->
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
      <!-- <div
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
      </div> -->
      <!-- <div class="price section">
        <w-header>
          <template #header>
            Мінімальна ціна за виступ сьогодні:
          </template>
          <template #content>
            <div class="price-content mt-5 d-flex">
              <div
                v-for="(p, ind) of agent.prices"
                :key="ind"
                class="price-item mr-2 mb-3 d-flex flex-column align-center"
              >
                <div
                  class="pill border-radius"
                  :style="{ backgroundColor: colors[ind] }"
                >
                  {{ p.price }}
                </div>
                <div class="price-title mt-3">
                  {{ p.name.toUpperCase() }}
                </div>
              </div>
            </div>
          </template>
        </w-header>
      </div> -->
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
    const specAll = [];
    const styleAll = [];
    return app.$profile
      .getUser()
      .then((r) => {
        if (r.data.role !== 1) {
          switch (r.data.role) {
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
          data: r.data,
          logged: true,
          id: r.data.id,
          role: r.data.role
        });

        if (app.$isEmpty(r.data.fields.confirmed.value.value)) {
          redirect({ name: 'agent-register' });
        }
        const d = r.data.fields;
        let art = [];
        if (!app.$isEmpty(d.artists.value.value)) {
          art = art.concat(JSON.parse(d.artists.value.value));
        }
        if (!app.$isEmpty(d.bands.value.value)) {
          art = art.concat(JSON.parse(d.bands.value.value));
        }
        for (const i of art) {
          const spec = JSON.parse(i.spec);
          for (const s of spec) {
            if (!specAll.includes(s.title)) {
              specAll.push(s.title);
            }
            if (!app.$isEmpty(s.categories)) {
              for (const q of s.categories) {
                for (const it of q.items) {
                  if (!styleAll.includes(it)) {
                    styleAll.push(it);
                  }
                }
              }
            }
          }
        }
        return {
          avatar: store.state.defaultAvatar,
          defaultAvatar: store.state.defaultAvatar,
          styleAll,
          specAll
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
      title: 'Кабинет агента'
    };
  }
};
</script>

<style lang="scss" scoped>
@import '~/static/scss/agent-profile.scss';
</style>
