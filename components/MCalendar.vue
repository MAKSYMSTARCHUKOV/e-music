<template>
  <div class="m-calendar">
    <v-snackbar v-model="snackbar" :bottom="true" color="info" :timeout="5000"
      >{{
        $isEmpty(snackMessage) ? 'Заповність обовʼязкові поля' : snackMessage
      }}
    </v-snackbar>
    <div class="nav-buttons w-100 d-flex justify-space-between">
      <img :src="$src('icons/arrow-red.svg')" alt="" class="pointer left-nav" />
      <img
        :src="$src('icons/arrow-red.svg')"
        alt=""
        class="pointer right-nav"
      />
    </div>
    <client-only>
      <swiper :options="options">
        <swiper-slide v-for="(c, ind) of months" :key="ind">
          <div class="calendar-item d-flex flex-column">
            <div
              :ref="`${c.number.toString().padStart(2, '0')}`"
              class="m-tooltip d-flex flex-column d-opaq"
            >
              <span class="m-tooltip-caption">
                {{ title }}
              </span>
              <div
                v-if="mode === 'request'"
                class="m-tooltip-body d-flex align-center"
              >
                <m-text
                  placeholder="Ставка"
                  :digit="true"
                  @input="checkValue"
                ></m-text
                ><img
                  :src="$src('icons/confirm.png')"
                  alt=""
                  class="d-opaq confirm"
                  @click="makeProposition"
                />
              </div>
              <div
                v-if="mode === 'logged_restaurant->artist'"
                class="m-tooltip-body d-flex align-center"
              >
                <span class="price">{{ price }}</span
                >&nbsp;грн
                <img
                  v-if="!expired"
                  :src="$src('icons/delete.png')"
                  alt=""
                  @click="changeStatus($event, 4)"
                />
              </div>
              <div
                v-if="
                  mode === 'logged_restaurant->restaurant' ||
                    mode === 'restaurant'
                "
                class="m-tooltip-body d-flex align-center"
              >
                <a :href="href"
                  ><b>{{ name }}</b></a
                >
                <span v-if="mode === 'logged_restaurant->restaurant'">
                  &nbsp;{{ price }}&nbsp;грн
                </span>
                <img
                  v-if="mode === 'logged_restaurant->restaurant' && !expired"
                  :src="$src('icons/delete.png')"
                  alt=""
                  @click="changeStatus($event, 4)"
                />
              </div>
              <div
                v-if="
                  mode === 'logged_artist' ||
                    mode === 'artist' ||
                    mode === 'other_artist'
                "
                class="m-tooltip-body d-flex align-center"
              >
                <a :href="href"
                  ><b>{{ name }}</b></a
                >
                <template v-if="mode !== 'other_artist'">
                  <template v-if="mode === 'logged_artist'">
                    &nbsp;<span class="price">{{ price }}</span
                    >&nbsp;грн
                  </template>
                  <template v-if="status === 0 && !expired">
                    <img
                      v-if="mode === 'logged_artist'"
                      :src="$src('icons/confirm.png')"
                      alt=""
                      @click="changeStatus($event, 1)"
                    />
                    <div
                      v-if="mode === 'logged_artist'"
                      class="reason d-flex align-center"
                    >
                      <img :src="$src('icons/delete.png')" alt="" />
                      <div class="reason-box d-flex flex-column">
                        <span
                          class="d-flex align-center"
                          @click="changeStatus($event, 2)"
                          >Занят</span
                        >
                        <span
                          class="d-flex align-center"
                          @click="changeStatus($event, 3)"
                          >Цена</span
                        >
                      </div>
                    </div>
                  </template>
                </template>
              </div>
            </div>
            <div class="calendar-month mb-4 w-100">
              {{ monthTitle(c.number, c.year) }}
            </div>
            <div class="calendar-days border-radius">
              <div class="day days">пн</div>
              <div class="day days">вв</div>
              <div class="day days">ср</div>
              <div class="day days">чт</div>
              <div class="day days">пт</div>
              <div class="day days weekend">сб</div>
              <div class="day days weekend">нд</div>
              <template v-for="d in c.days">
                <div
                  :id="
                    `${c.year}-${c.number
                      .toString()
                      .padStart(2, '0')}-${d.toString().padStart(2, '0')}`
                  "
                  :key="
                    `${c.year}-${c.number
                      .toString()
                      .padStart(2, '0')}-${d
                      .toString()
                      .padStart(2, '0')}-${update}`
                  "
                  class="day pointer regular"
                  :class="
                    dayClass(
                      d,
                      c.number,
                      c.year,
                      `${c.year}-${c.number
                        .toString()
                        .padStart(2, '0')}-${d.toString().padStart(2, '0')}`
                    )
                  "
                  :style="{
                    gridColumnStart:
                      d === 1 ? (c.day === 0 ? 7 : c.day) : 'auto'
                  }"
                  @click="select"
                >
                  {{ d }}
                </div>
              </template>
            </div>
          </div>
        </swiper-slide>
      </swiper>
    </client-only>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
export default {
  props: {
    monthsLength: {
      type: Number,
      default: 12
    },
    startFromMonth: {
      type: Number,
      default: new Date().getMonth() + 1
    },
    startFromYear: {
      type: Number,
      default: new Date().getFullYear()
    },
    swiperOptions: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {
      orders: [],
      title: '',
      mode: '',
      href: '',
      name: '',
      price: 0,
      expired: true,
      update: true,
      snackbar: false,
      snackMessage: '',
      status: -1
    };
  },
  computed: {
    ...mapState(['id', 'role', 'data']),
    months() {
      let cur = this.startFromMonth;
      let year = this.startFromYear;
      const mth = [];
      for (let i = 0; i < this.monthsLength; i++) {
        mth.push({
          number: cur,
          year,
          days: new Date(year, cur - 1, 0).getDate(),
          day: new Date(year, cur - 1, 1).getDay()
        });
        cur = cur === 12 ? 1 : cur + 1;
        year = cur === 1 ? year + 1 : year;
      }
      return mth;
    },
    options() {
      const opt = {
        slidesPerShow: 1,
        speed: 200,
        navigation: {
          nextEl: '.m-calendar .nav-buttons .right-nav',
          prevEl: '.m-calendar .nav-buttons .left-nav',
          disabledClass: 'd-opaq'
        }
      };
      for (const i in this.swiperOptions) {
        opt[i] = this.swiperOptions[i];
      }
      return opt;
    },
    tooltipStyle() {
      return {};
    }
  },
  watch: {
    snackbar(newV) {
      if (!newV) {
        this.snackMessage = '';
      }
    }
  },
  async mounted() {
    // eslint-disable-next-line camelcase
    const start_date = `${
      this.startFromYear
    }-${this.startFromMonth.toString().padStart(2, '0')}`;
    const toObj = this.months[this.months.length - 1];
    // eslint-disable-next-line camelcase
    const end_date = `${toObj.year}-${toObj.number
      .toString()
      .padStart(2, '0')}`;
    const query = {
      start_date,
      end_date,
      [this.data.role === 4 ? 'restaurant_id' : 'artist_id']: this.data.id
    };
    try {
      const o = await this.$order.getByPeriod(query);
      [...this.orders] = o.data;
      this.update = !this.update;
    } catch (e) {}
    this.$nextTick(() => {
      document.onclick = (e) => {
        const d = e.target.closest('.day');
        if (e.target.closest('.m-tooltip') === null && d === null) {
          for (const t of document.querySelectorAll('.m-tooltip')) {
            t.classList.add('d-opaq');
          }
          for (const ds of document.querySelectorAll('.day')) {
            ds.classList.remove('pending');
          }
        }
        if (d !== null) {
          const id = d.getAttribute('id').split('-')[1];
          for (const ds of document.querySelectorAll('.day')) {
            if (ds !== d) {
              ds.classList.remove('pending');
            }
          }
          for (const t in this.$refs) {
            if (t != id) {
              this.$refs[t][0].classList.add('d-opaq');
            }
          }
        }
      };
    });
  },
  methods: {
    ...mapMutations('m-calendar', ['setDate']),
    monthTitle(number, year) {
      return `${this.$month(number).toUpperCase()} • ${year}`;
    },
    select(e) {
      const t = e.target.closest('.day');
      const c = t.closest('.calendar-days');
      const id = t.getAttribute('id');
      const tt = this.$refs[id.split('-')[1]][0];
      const tH = t.offsetHeight;
      const tW = t.offsetWidth;
      const tL = t.offsetLeft;
      const tT = t.offsetTop;
      const cH = c.offsetHeight;
      const cW = c.offsetWidth;
      const ttH = tt.offsetHeight;
      const ttW = tt.offsetWidth;
      if (!tt.classList.contains('d-opaq')) {
        tt.classList.add('d-opaq');
        tt.setAttribute('data-id', id);
        setTimeout(() => {
          this.clear();
        }, 200);
        try {
          tt.querySelector('input').value = '';
          tt.querySelector('.confirm').classList.add('d-opaq');
        } catch (e) {}
      }
      const event = this.orders.find((a) => a.date === id);
      setTimeout(() => {
        if (!this.$isEmpty(event)) {
          if (this.role === 4) {
            if (this.data.role === 4) {
              this.title = 'Виступає:';
              this.mode = 'logged_restaurant->restaurant';
              this.href = `${event.artist.role === 2 ? '/artist/' : '/band/'}${
                event.artist_id
              }`;
              this.price = event.price;
              let cur = new Date();
              cur.setHours(3, 0, 0, 0);
              cur = cur.getTime();
              let e = new Date(event.date);
              e.setHours(3, 0, 0, 0);
              e = e.getTime();
              this.expired = e < cur;
              if (this.expired) {
                this.title = 'Виступив:';
              }
              if (event.artist.role === 2) {
                if (this.$isEmpty(event.artist.fields.nickname.value.value)) {
                  this.name = `${event.artist.fields.name.value.value} ${event.artist.fields['second-name'].value.value}`;
                } else {
                  this.name = event.artist.fields.nickname.value.value;
                }
              } else if (event.artist.role === 3) {
                this.name = event.artist.fields.title.value.value;
              }
            } else {
              this.title = 'Запрошен за:';
              this.mode = 'logged_restaurant->artist';
              this.price = event.price;
              let cur = new Date();
              cur.setHours(3, 0, 0, 0);
              cur = cur.getTime();
              let e = new Date(event.date);
              e.setHours(3, 0, 0, 0);
              e = e.getTime();
              this.expired = e < cur;
            }
          } else if (this.role !== -1 && this.role !== 4) {
            if (this.data.role === 2 || this.data.role === 3) {
              this.title = 'Виступ у:';
              this.mode = 'logged_artist';
              this.href = `/restaurant/${event.restaurant_id}`;
              this.name = event.restaurant.fields.title.value.value;
              this.status = event.status;
              this.price = event.price;
              let cur = new Date();
              cur.setHours(3, 0, 0, 0);
              cur = cur.getTime();
              let e = new Date(event.date);
              e.setHours(3, 0, 0, 0);
              e = e.getTime();
              this.expired = e < cur;
              if (this.id !== this.role.id) {
                this.mode = 'other_artist';
              }
            }
          }
          if (
            (this.role === -1 ||
              this.role === 2 ||
              this.role === 3 ||
              this.role === 1) &&
            event.status === 1
          ) {
            if (this.data.role === 4) {
              this.title = 'Виступає:';
              this.mode = 'restaurant';
              this.href = `${event.artist.role === 2 ? '/artist/' : '/band/'}${
                event.artist_id
              }`;
              if (event.artist.role === 2) {
                if (this.$isEmpty(event.artist.fields.nickname.value.value)) {
                  this.name = `${event.artist.fields.name.value.value} ${event.artist.fields['second-name'].value.value}`;
                } else {
                  this.name = event.artist.fields.nickname.value.value;
                }
              } else if (event.artist.role === 3) {
                this.name = event.artist.fields.title.value.value;
              }
            } else if (
              this.data.role === 2 ||
              this.data.role === 3 ||
              this.data.role === 3
            ) {
              this.title = 'Виступає у:';
              this.mode = 'artist';
              this.href = `/restaurant/${event.restaurant_id}`;
              this.name = event.restaurant.fields.title.value.value;
            }
          }
        } else if (this.$isEmpty(event)) {
          if (this.role === 4) {
            if (this.data.role !== 4) {
              this.title = 'Запросити за:';
              this.mode = 'request';
            }
          }
        }
        this.$nextTick(() => {
          setTimeout(() => {
            if (!this.$isEmpty(this.mode)) {
              tt.style.visibility = 'visible';
              if (cH - (tT + tH / 2) + 8 < ttH) {
                tt.style.top = tT - ttH + tH / 2 + 'px';
              } else {
                tt.style.top = tT + tH / 2 + 'px';
              }
              if (tL - 8 < ttW / 2 - tW / 2) {
                tt.style.left = tL + 'px';
              } else if (cW - tL - tW - 8 < ttW / 2 - tW / 2) {
                tt.style.left = tL - ttW + tW + 'px';
              } else {
                tt.style.left = tL + tW / 2 - ttW / 2 + 'px';
              }
              t.classList.add('pending');
              tt.classList.remove('d-opaq');
            }
          }, 50);
        });
      }, 250);
    },
    clear() {
      this.title = '';
      this.mode = '';
      this.href = '';
      this.name = '';
      this.snackbar = false;
      this.snackMessage = '';
      this.status = -1;
      this.price = 0;
      this.expired = true;
    },
    dayClass(day, month, year, current) {
      const _day = new Date(year, month - 1, day).getDay();
      const event = this.orders.find((a) => current === a.date);
      let status = -1;
      let cur = new Date();
      cur.setHours(3, 0, 0, 0);
      cur = cur.getTime();
      let expired = false;
      if (!this.$isEmpty(event)) {
        if (this.role === -1) {
          if (event.status === 1) {
            status = event.status;
          }
        } else if (event.status === 0 || event.status === 1) {
          status = event.status;
        }
        let e = new Date(event.date);
        e.setHours(3, 0, 0, 0);
        e = e.getTime();
        expired = e < cur;
      }
      return {
        weekend: !!(_day === 6 || _day === 0),
        waiting: status === 0,
        approved: status === 1,
        expired
      };
    },
    checkValue(e) {
      const t = e.target;
      const ok = t.nextElementSibling;
      if (this.$isEmpty(t.value.trim())) {
        ok.classList.add('d-opaq');
      } else {
        ok.classList.remove('d-opaq');
      }
    },
    async makeProposition(e) {
      const t = e.target;
      const tt = t.closest('.m-tooltip');
      this.$nuxt.$loading.start();
      const p = t.previousElementSibling;
      try {
        const r = await this.$order.create({
          price: p.value,
          date: tt.getAttribute('data-id'),
          artist_id: this.data.id,
          restaurant_id: this.id
        });
        this.orders.push(r);
      } catch (e) {
        console.log(e);
      }
      tt.parentElement.click();
      this.$nuxt.$loading.finish();
    },
    async changeStatus(e, status) {
      const t = e.target;
      const tt = t.closest('.m-tooltip');
      this.$nuxt.$loading.start();
      const event = this.orders.find(
        (a) => a.date === tt.getAttribute('data-id')
      );
      try {
        await this.$order.status(event.id, status);
        event.status = status;
        if (status === 2 || status === 3 || status === 4) {
          try {
            await this.$order.delete(event.id);
            this.orders.splice(
              this.orders.findIndex((a) => a.id === event.id),
              1
            );
          } catch (e) {
            console.log(e);
          }
        }
      } catch (e) {
        console.log(e);
      }
      tt.parentElement.click();
      this.$nuxt.$loading.finish();
    }
  }
};
</script>

<style lang="scss" scoped>
@import '~/static/scss/m-calendar.scss';
</style>
