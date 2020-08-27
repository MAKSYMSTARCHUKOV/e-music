<template>
  <v-content>
    <div class="wrapping">
      <Rubricator />
      <div class="filter d-flex flex-column">
        <div class="category d-flex flex-column">
          <span class="header">Жанр:</span>
          <div class="sub-category d-flex flex-column">
            <label class="title">
              <input type="checkbox" hidden />
              <div class="choser d-flex">
                <div class="img-holder d-flex align-center">
                  <img :src="$src('category.png')" alt="" />
                </div>
                <div class="bord d-flex align-center">
                  <h1>rock</h1>
                </div>
              </div>
            </label>
          </div>
          <div class="sub-category d-flex flex-column">
            <label class="title">
              <input type="checkbox" hidden />
              <div class="choser d-flex">
                <div class="img-holder d-flex align-center">
                  <img :src="$src('category.png')" alt="" />
                </div>
                <div class="bord d-flex align-center">
                  <h1>pop</h1>
                </div>
              </div>
            </label>
          </div>
          <div class="sub-category d-flex flex-column">
            <label class="title">
              <input type="checkbox" hidden />
              <div class="choser d-flex">
                <div class="img-holder d-flex align-center">
                  <img :src="$src('category.png')" alt="" />
                </div>
                <div class="bord d-flex align-center">
                  <h1>blues</h1>
                </div>
              </div>
            </label>
          </div>
        </div>
        <div
          v-if="$store.state.logged === true"
          class="category d-flex flex-column"
        >
          <span class="header">Прайс:</span>
          <div class="prices">
            <m-text
              :key="price[0]"
              :value="from"
              @input="($event) => (from = $event.target.value)"
            ></m-text>
            <div class="devider"></div>
            <m-text
              :key="price[1]"
              :value="to"
              @input="($event) => (to = $event.target.value)"
            ></m-text>
          </div>
          <div class="slider">
            <vue-slider v-model="price" v-bind="priceOptions"></vue-slider>
          </div>
        </div>
        <v-btn color="info">Показати</v-btn>
      </div>
      <div class="result d-flex flex-column">
        <div v-if="$isEmpty(artists)" class="no-result d-flex justify-center">
          <img :src="$src('logo.svg')" alt="" />
        </div>
        <template v-else>
          <div class="show-result">
            <div class="show-items d-flex align-center">
              <div class="item d-flex align-center">
                <span>Показувати по:</span>
                <div
                  class="flex-break"
                  :class="{
                    'd-none': !$store.state.mobile
                  }"
                ></div>
                <div
                  class="d-flex align-center justify-center"
                  :class="{
                    'mt-2': $store.state.mobile
                  }"
                >
                  <div
                    class="show pointer"
                    :class="{ current: limit === 10 }"
                    @click="limit = 10"
                  >
                    10
                  </div>
                  <div
                    class="show pointer"
                    :class="{ current: limit === 30 }"
                    @click="limit = 30"
                  >
                    30
                  </div>
                  <div
                    class="show pointer"
                    :class="{ current: limit === 50 }"
                    @click="limit = 50"
                  >
                    50
                  </div>
                  <div
                    class="show pointer"
                    :class="{ current: limit === 100 }"
                    @click="limit = 100"
                  >
                    100
                  </div>
                </div>
              </div>
            </div>
            <a
              v-for="d of artists"
              :key="d.id"
              class="show-result-item d-flex flex-column justify-space-between"
              :href="`/artist/${d.id}`"
            >
              <img
                :src="avatar(d)"
                alt=""
                :class="{
                  default: isDefault(d)
                }"
              />
              <div class="head op">{{ name(d) }}</div>
              <div class="bottom op">
                <div class="categ d-flex">
                  <span v-for="s of specs(d)" :key="s">{{
                    s.toUpperCase()
                  }}</span>
                </div>
                <div class="ganre d-flex">
                  <span v-for="g of genres(d)" :key="g">{{
                    g.toUpperCase()
                  }}</span>
                </div>
                <div v-if="$store.state.logged === true" class="price">
                  {{ regularPrice(d) }}
                </div>
              </div>
            </a>
          </div>
          <div
            v-if="pages === page && !$isEmpty(artists)"
            class="eof d-flex justify-center"
          >
            <img :src="$src('logo.svg')" alt="" />
          </div>
          <m-pagination
            v-if="pages > 1"
            :key="`${limit}-${page}`"
            v-model="pageObj"
            :page="page"
            :pages="pages"
          ></m-pagination>
        </template>
      </div>
    </div>
    <v-snackbar v-model="snackbar" :bottom="true" color="info" :timeout="5000"
      >{{ $isEmpty(snackMessage) ? 'Неизвестная ошибка' : snackMessage }}
    </v-snackbar>
  </v-content>
</template>

<script>
import Rubricator from '~/components/Rubricator.vue';
import showAll from '~/mixins/showAll.js';
export default {
  loading: false,
  components: {
    Rubricator
  },
  mixins: [showAll],
  async asyncData({ app }) {
    let artists = [];
    let snackMessage = '';
    let snackbar = false;
    const page = 1;
    let pages = 1;
    let count = 0;
    try {
      const c = await app.$profile.getArtistsTotal();
      count = c.count;
      if (c.count === 0) {
        return {
          artists,
          snackMessage,
          page,
          pages,
          count
        };
      } else {
        const div = c.count / 10;
        const abs = Math.floor(div);
        pages = div > abs ? abs + 1 : abs;
        try {
          const a = await app.$profile.getArtists(10, page);
          [...artists] = a.data;
          return {
            artists,
            snackMessage,
            page,
            pages,
            count,
            snackbar
          };
        } catch (e) {
          console.log(e);

          if (e.status !== 404) {
            snackbar = true;
            snackMessage = `${e.status} | ${e.data.error ||
              e.data.message ||
              e.data ||
              'Unknown Error'}`;
          }
          return {
            artists,
            snackMessage,
            page,
            pages,
            snackbar
          };
        }
      }
    } catch (e) {
      if (e.status !== 404) {
        snackMessage = `${e.status} | ${e.data.error ||
          e.data.message ||
          e.data ||
          'Unknown Error'}`;
      }
      return {
        artists,
        page,
        pages
      };
    }
  },
  head() {
    return {
      title: 'Артисти'
    };
  }
};
</script>
<style lang="scss" scoped>
@import '~/static/scss/artists.scss';
</style>
