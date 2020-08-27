export default {
  data() {
    return {
      avatarUrl: '',
      photos: [],
      audios: [],
      snackbar: false,
      snackMessage: ''
    };
  },
  watch: {
    snackbar(newV) {
      if (!newV) {
        this.snackMessage = '';
      }
    }
  },
  computed: {
    allSpecs() {
      const a = this.getValue('spec');
      const [...s] = this.specs;

      for (const y of a) {
        if (!this.specs.find((b) => b.title === y.title)) {
          s.push(y);
        } else if (this.specs.find((b) => b.title === y.title)) {
          const e = s.find((b) => b.title === y.title);
          for (const w of y.categories) {
            const c = e.categories.find((u) => u.title === w.title);
            for (const i of w.items) {
              if (!c.items.includes(i)) {
                c.items.push(i);
              }
            }
          }
        }
      }
      return s;
    }
  },
  methods: {
    uploadAvatar(event) {
      const fi = event.target
        .closest('.img-load')
        .querySelector('[type="file"]');
      fi.click();
    },
    openUpload(event) {
      const fi = event.target
        .closest('.add-items')
        .querySelector('[type="file"]');
      fi.click();
    },
    fileUpload(e) {
      const t = e.target;
      const files = t.files;
      const img = t.closest('.img-load').querySelector('.img-container>.img');
      const loading = t
        .closest('.img-load')
        .querySelector('.img-container>.m-loading');
      const close = t
        .closest('.img-load')
        .querySelector('.img-container>.m-close');
      const r = new FileReader();
      loading.classList.remove('d-none');
      const id = this.$isEmpty(this.getValue('avatar'))
        ? ''
        : this.getValue('avatar').id;
      r.onload = (event) => {
        this.setValue('avatar', [{ id, value: event.target.result }]);
        this.avatar = URL.createObjectURL(files[0]);
        img.onload = () => {
          URL.revokeObjectURL(this.avatar);
          close.classList.remove('d-none');
          loading.classList.add('d-none');
        };
      };
      r.readAsDataURL(files[0]);
    },
    uploadPhotos(e) {
      const t = e.target;
      const files = t.files;
      const ps = [];
      const gen = this.$generator(files.length);
      let d;
      for (const f of files) {
        const r = new FileReader();
        r.onload = (e) => {
          ps.push(e.target.result);
          this.photos.push(URL.createObjectURL(f));
          d = gen.next();
          if (d.done) {
            let y = [];
            [...y] = Array.isArray(this.getValue('photos'))
              ? this.getValue('photos')
              : [];
            this.setValue(
              'photos',
              y.concat(ps.map((a) => ({ id: '', value: a })))
            );
          }
        };
        r.readAsDataURL(f);
      }
    },
    uploadAudios(e) {
      const t = e.target;
      const files = t.files;
      let as = this.getValue('audios');
      if (this.$isEmpty(as)) {
        as = [];
      }
      const gen = this.$generator(files.length);
      let d;
      for (const f of files) {
        const r = new FileReader();
        r.onload = (e) => {
          const p = {};
          p.url = e.target.result;
          p.title = f.name;
          this.audios.push(p);
          d = gen.next();
          as.push(p);
          if (d.done) {
            this.setValue('audios', as);
          }
        };
        r.readAsDataURL(f);
      }
    },
    addLink(e, list) {
      const inp = e.target.closest('.add-items').querySelector('[type="text"]');
      const v = inp.value;
      if (v) {
        let l = this.getValue(list);
        if (this.$isEmpty(l)) {
          l = [];
        }
        l.push(v);
        this.setValue(list, l);
        inp.value = '';
      }
    },
    remove(index, list) {
      let l = JSON.parse(JSON.stringify(this.getValue(list)));
      const d = this.getValue('deleted');
      if (this[list]) {
        this[list].splice(index, 1);
      }
      if (this.$store.state.data.role === 1) {
        if (list === 'artists' || list === 'bands') {
          this.$profile
            .removeAgentFromPerformer(l[index].id)
            .catch((e) => console.log(e));
        }
      }
      if (list === 'photos') {
        d.push(JSON.parse(JSON.stringify(l[index])));
      }
      l.splice(index, 1);
      if (this.$isEmpty(l)) {
        l = '';
      }
      this.setValue(list, l);
      this.setValue('deleted', d);
    },
    removePhoto(index) {
      URL.revokeObjectURL(this.photos[index].url);
      this.photos.splice(index, 1);
      const ps = JSON.parse(JSON.stringify(this.getValue('photos')));
      const d = this.getValue('deleted');
      d.push(JSON.parse(JSON.stringify(ps[index])));
      ps.splice(index, 1);
      this.setValue('photos', ps);
      this.setValue('deleted', d);
    },
    resetAvatar(e) {
      const t = e.target.closest('.m-close');
      const img = t.closest('.img-container').querySelector('.img');
      const id = this.$isEmpty(this.getValue('avatar'))
        ? ''
        : this.getValue('avatar')[0].id;
      this.setValue('avatar', [{ id, value: '' }]);
      this.avatar = this.$store.state.defaultAvatar;
      img.onload = () => {
        t.classList.add('d-none');
      };
    },
    validate(e) {
      const correct = this.$validate(e);
      this.snackbar = !correct;
      if (correct) {
        this.$nuxt.$loading.start();
        this.$profile
          .confirm()
          .then((r) => {
            switch (this.data.role) {
              case 1: {
                this.$router.push({ name: 'agent' });
                break;
              }
              case 2: {
                this.$router.push({ name: 'artist' });
                break;
              }
              case 3: {
                this.$router.push({ name: 'band' });
                break;
              }
              case 4: {
                this.$router.push({ name: 'restaurant' });
                break;
              }
            }
          })
          .catch((e) => {
            this.$nuxt.$loading.finish();
            if (e.status !== 404) {
              this.snackMessage = `${e.status} | ${e.data.error ||
                e.data.message ||
                e.data ||
                'Unknown Error'}`;
            }
          });
        setTimeout(() => {
          this.$cancel();
          this.snackMessage =
            'Сервер перегружен. Подождите 10 секунд и повторите';
          this.$nuxt.$loading.finish();
        }, 10000);
      } else {
      }
    }
  }
};
