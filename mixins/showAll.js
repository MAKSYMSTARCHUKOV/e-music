import Vue from 'vue';
export default {
  data() {
    return {
      border: [120, 800],
      price: [120, 800],
      timer: undefined,
      limit: 10,
      pageObj: {
        page: this.page
      },
      priceOptions: {
        dotSize: 15,
        height: 10,
        min: 120,
        max: 800,
        minRange: 20,
        tooltip: 'none',
        dotStyle: {
          backgroundColor: '#3b3b3b',
          border: '2px solid white'
        },
        railStyle: {
          backgroundColor: '#3b3b3b',
          border: '2px solid white'
        },
        processStyle: {
          backgroundColor: '#E90D3B'
        }
      }
    };
  },
  computed: {
    from: {
      get() {
        return this.price[0] + '';
      },
      set(val) {
        clearTimeout(this.timer);
        if (!isNaN(val)) {
          if (val < this.border[0]) {
            this.timer = setTimeout(() => {
              Vue.set(this.price, 0, parseInt(this.border[0], 10));
            }, 1500);
          } else if (val > this.price[1]) {
            Vue.set(this.price, 0, parseInt(this.price[1], 10) - 1);
          } else {
            Vue.set(this.price, 0, parseInt(val, 10));
          }
        } else {
          this.timer = setTimeout(() => {
            Vue.set(this.price, 0, parseInt(this.border[0], 10));
          }, 1500);
        }
      }
    },
    to: {
      get() {
        return this.price[1] + '';
      },
      set(val) {
        clearTimeout(this.timer);
        if (!isNaN(val)) {
          if (val > this.border[1]) {
            this.timer = setTimeout(() => {
              Vue.set(this.price, 1, parseInt(this.border[1], 10));
            }, 1500);
          } else if (val < this.price[0]) {
            Vue.set(this.price, 1, parseInt(this.price[0], 10) + 1);
          } else {
            Vue.set(this.price, 1, parseInt(val, 10));
          }
        } else {
          this.timer = setTimeout(() => {
            Vue.set(this.price, 1, parseInt(this.border[1], 10));
          }, 1500);
        }
      }
    }
  },
  watch: {
    snackbar(newV) {
      if (!newV) {
        this.snackMessage = '';
      }
    },
    snackMessage(newV) {
      if (newV !== '') {
        this.snackbar = true;
      }
    },
    pageObj(newV) {
      this.page = newV.page;
    },
    async page(newV) {
      if (newV !== 0) {
        this.$nuxt.$loading.start();
        try {
          let a;
          switch (this.$route.name) {
            case 'artists':
              a = await this.$profile.getArtists(this.limit, this.page);
              [...this.artists] = a.data;
              break;
            case 'restaurants':
              a = await this.$profile.getUsersByRole(4, this.limit, this.page);
              [...this.shops] = a.data;
              break;
          }
          this.$nextTick(() => {
            document.querySelector('html,body').scrollTo({
              top: 0,
              behavior: 'smooth'
            });
            this.$nuxt.$loading.finish();
          });
        } catch (e) {
          if (e.status !== 404) {
            this.snackMessage = `${e.status} | ${e.data.error ||
              e.data.message ||
              e.data ||
              'Unknown Error'}`;
          }
        }
      }
    },
    limit(newV) {
      const div = this.count / newV;
      const abs = Math.floor(div);
      this.pages = div > abs ? abs + 1 : abs;
      this.page = 0;
      this.$nextTick(() => {
        this.page = 1;
      });
    }
  },
  mounted() {
    this.$nextTick(() => {
      //   document.onscroll = () => {
      //     const s =
      //       document.querySelector('html').clientHeight +
      //       document.querySelector('html').scrollTop;
      //     const f = document.querySelector('footer').offsetTop;
      //     if (s >= f) {
      //       this.$nuxt.$loading.start();
      //     }
      //   };
      this.$nuxt.$loading.finish();
    });
  },
  methods: {
    avatar(obj) {
      const a = obj.fields.avatar.value;
      const y = a[0].value;
      return this.$isEmpty(y) ? '/images/void-img.png' : `/storage/${y}`;
    },
    isDefault(obj) {
      const a = obj.fields.avatar.value;
      const y = a[0].value;
      return !!this.$isEmpty(y);
    },
    name(obj) {
      const f = obj.fields;
      if (obj.role === 2) {
        if (!this.$isEmpty(f.nickname.value.value)) {
          return f.nickname.value.value;
        } else {
          return `${f.name.value.value} ${f['second-name'].value.value}`;
        }
      }
      return f.title.value.value;
    },
    specs(obj) {
      const f = obj.fields;
      const s = this.$isEmpty(f.spec.value.value)
        ? []
        : JSON.parse(f.spec.value.value);
      const sp = [];
      if (!this.$isEmpty(s)) {
        s.map((a) => {
          if (!sp.includes(a.title)) {
            sp.push(a.title);
          }
        });
      }
      return sp;
    },
    genres(obj) {
      const f = obj.fields;
      const s = this.$isEmpty(f.spec.value.value)
        ? []
        : JSON.parse(f.spec.value.value);
      const gn = [];
      if (!this.$isEmpty(s)) {
        for (const i of s) {
          if (i.categories) {
            const style = i.categories.filter((a) => a.title.includes('стиль'));
            if (!this.$isEmpty(style)) {
              style.map((a) => {
                a.items.map((b) => {
                  if (!gn.includes(b)) {
                    gn.push(b);
                  }
                });
              });
            }
          }
        }
      }
      return gn;
    },
    regularPrice(obj) {
      const f = obj.fields;
      const p = this.$isEmpty(f.prices.value.value)
        ? []
        : JSON.parse(f.prices.value.value);
      let pr = '';
      if (!this.$isEmpty(p)) {
        const q = p.regular.find((a) => a.title.includes('resident'));
        pr = !this.$isEmpty(q) ? q.price : '';
      }

      return this.$isEmpty(pr) ? '' : `${pr} ГРН`;
    }
  }
};
