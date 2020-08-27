import { mapState } from 'vuex';
import { day } from '~/modules/validate-regexp.js';
export default {
  data() {
    return {
      audio: null,
      changes: true,
      index: null,
      v_index: null,
      colors: { 'resident price': '#69C200', 'event price': '#E90D3B' },
      musOpt: {
        slidesPerView: 3,
        spaceBetween: 20,
        speed: 500,
        navigation: {
          nextEl: '.mus .right-nav',
          prevEl: '.mus .left-nav',
          disabledClass: 'd-opaq'
        },
        breakpoints: {
          540: {
            slidesPerView: 1,
            spaceBetween: 0
          },
          1200: {
            spaceBetween: 30
          }
        }
      },
      bandOpt: {
        slidesPerView: 3,
        spaceBetween: 20,
        speed: 500,
        navigation: {
          nextEl: '.bands .right-nav',
          prevEl: '.bands .left-nav',
          disabledClass: 'd-opaq'
        },
        breakpoints: {
          540: {
            slidesPerView: 1,
            spaceBetween: 0
          },
          1200: {
            spaceBetween: 30
          }
        }
      },
      eventOpt: {
        slidesPerView: 3,
        spaceBetween: 20,
        speed: 500,
        navigation: {
          nextEl: '.event .right-nav',
          prevEl: '.event .left-nav',
          disabledClass: 'd-opaq'
        },
        breakpoints: {
          540: {
            slidesPerView: 1,
            spaceBetween: 0
          },
          1200: {
            spaceBetween: 30
          }
        }
      },
      photoOpt: {
        slidesPerView: 4,
        slidesPerColumn: 1,
        spaceBetween: 20,
        speed: 500,
        navigation: {
          nextEl: '.photo .right-nav',
          prevEl: '.photo .left-nav',
          disabledClass: 'd-opaq'
        },
        breakpoints: {
          540: {
            slidesPerView: 2,
            slidesPerColumn: 2,
            spaceBetween: 10
          }
        }
      },
      videoOpt: {
        slidesPerView: 4,
        slidesPerColumn: 1,
        spaceBetween: 20,
        speed: 500,
        navigation: {
          nextEl: '.video .right-nav',
          prevEl: '.video .left-nav',
          disabledClass: 'd-opaq'
        },
        breakpoints: {
          540: {
            slidesPerView: 2,
            slidesPerColumn: 2,
            spaceBetween: 10
          }
        }
      }
    };
  },

  computed: {
    ...mapState('m-calendar', ['select', 'day']),
    name() {
      return [
        this.getValue('name'),
        this.getValue('middle-name'),
        this.getValue('second-name')
      ].join(' ');
    },
    items() {
      const it = [];
      if (Array.isArray(this.getValue('photos'))) {
        if (!this.$isEmpty(this.getValue('photos'))) {
          if (!this.$isEmpty(this.getValue('photos')[0].value)) {
            for (const i of this.getValue('photos')) {
              it.push({
                src: `/storage/${i.value}`
              });
            }
          }
        }
      }
      return it;
    },
    videos() {
      const vd = [];
      for (const i of this.getValue('videos')) {
        vd.push({
          src: i
          // thumb: this.$src('card-img-1.png')
        });
      }
      return vd;
    },
    style() {
      const s = [];
      if (!this.$isEmpty(this.getValue('spec'))) {
        this.getValue('spec').forEach((d, i) => s.push(d.title));
      }
      return s;
    },
    spec() {
      let s = [];
      if (!this.$isEmpty(this.getValue('spec'))) {
        this.getValue('spec').forEach((d, i) => {
          d.categories.forEach((q, ind) => {
            s = s.concat(q.items.filter((e) => !s.includes(e)));
          });
        });
      }
      return s;
    }
    // ,
    // currentPrice() {
    //   //   const pr = this.getValue('prices');
    //   const pr = {
    //     regular: [
    //       {
    //         title: 'resident price',
    //         price: ''
    //       },
    //       {
    //         title: 'event price',
    //         price: ''
    //       }
    //     ],
    //     special: {
    //       'resident price': [],
    //       'event price': []
    //     }
    //   };
    //   const [...price] = JSON.parse(JSON.stringify(pr.regular));
    //   const { ...special } = pr.special;
    //   const events = ['resident price', 'event price'];
    //   for (const i of events) {
    //     if (special[i]) {
    //       let p = special[i].filter((a) => {
    //         const d = a.title;
    //         if (d.includes('.')) {
    //           const a = d.split('.');
    //           const a1 = `${a[0].padStart(2, '0')}.${a[1].padStart(2, '0')}.${
    //             a[2]
    //           }`;
    //           if (a1 === this.select) {
    //             return true;
    //           }
    //         } else {
    //           const dw = this.$dayOfWeek(d);
    //           return dw === -1 ? false : dw === this.day;
    //         }
    //         return false;
    //       });
    //       p = p.length > 0 ? p : false;
    //       if (p) {
    //         let [...ch] = p;
    //         if (p.length > 1) {
    //           [...ch] = p.filter((a) => a.title.includes('.'));
    //         }
    //         Vue.set(
    //           price[price.findIndex((a) => a.title === i)],
    //           'price',
    //           ch[0].price
    //         );
    //       }
    //     }
    //   }
    //   return price;
    // }
  },
  watch: {
    audio(newVal) {
      this.changes = !this.changes;
    }
  },
  methods: {
    currentPrice(title, price) {
      const p = this.getValue('prices');
      const cD = new Date().getDay() + '';
      const curD = new Date().toLocaleDateString();
      const dates = {
        day: [],
        date: []
      };
      let pr = price;
      for (const s of p.special[title]) {
        const dT = day(s.title);
        if (dT === -1) {
          dates.date.push(s.title);
        } else {
          dates.day.push(s.title);
        }
      }
      if (!this.$isEmpty(dates.day)) {
        const i = dates.day.findIndex((a) => {
          const dT = day(a);
          return dT == cD;
        });
        if (i !== -1) {
          pr = p.special[title].find((a) => a.title === dates.day[i]).price;
        }
      }
      if (!this.$isEmpty(dates.date)) {
        for (const i of dates.date) {
          if (i === curD) {
            pr = p.special[title].find((a) => a.title === i).price;
            break;
          }
        }
      }
      return pr;
    },
    playPause(event, src) {
      const t = event.target;
      if (this.audio !== null) {
        t.setAttribute('src', this.$src('icons/play.svg'));
        this.audio.pause();
        this.audio = null;
        return;
      }
      t.setAttribute('src', this.$src('icons/loading.gif'));
      this.audio = new Audio(src);
      this.audio.addEventListener('canplaythrough', (e) => {
        t.setAttribute('src', this.$src('icons/pause.svg'));
        this.audio.play();
      });
      this.audio.addEventListener('pause', (e) => {
        t.setAttribute('src', this.$src('icons/play.svg'));
        this.audio.pause();
        this.audio = null;
      });
    },
    priceTitle(title) {
      return title.includes('resident')
        ? 'резидентна цена'.toUpperCase()
        : 'ціна події'.toUpperCase();
    }
  }
};
