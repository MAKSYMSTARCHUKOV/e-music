export default {
  data() {
    return {
      foundObj: [],
      foundBandsObj: [],
      foundArtistsObj: []
    };
  },
  methods: {
    autocompleteEvent(e, collection) {
      let c = [];
      switch (collection) {
        case 'artists':
          [...c] = this.artistsObj;
          break;
        case 'bands':
          [...c] = this.bandsObj;
          break;
      }
      const t = e.target;
      const v = t.value;
      const l = t.nextElementSibling;
      const a = t.parentElement.nextElementSibling;
      const la = a.querySelector('.load');
      if (v.length < 3) {
        if (!this.$isEmpty(this.foundObj)) {
          [...this.foundObj] = [];
        }
        l.classList.add('d-opaq');
        la.classList.add('d-opaq');
      } else {
        l.classList.remove('d-opaq');
        la.classList.remove('d-opaq');
        if (this.$isEmpty(c)) {
          l.classList.add('d-opaq');
        } else {
          const found = c.filter(
            (a) =>
              a !== undefined && a.name.toLowerCase().includes(v.toLowerCase())
          );
          const artists = this.$isEmpty(this.getValue(collection))
            ? []
            : this.getValue(collection);
          const q = [];
          for (const y of found) {
            const e = artists.find((a) => a !== undefined && a.name === y.name);
            if (this.$isEmpty(e)) {
              q.push(y);
            }
          }
          if (!this.$isEmpty(q)) {
            q.sort((a, b) => {
              if (a.name < b.name) {
                return -1;
              } else if (a.name > b.name) {
                return 1;
              } else {
                return 0;
              }
            });
            [...this.foundObj] = q;
            l.classList.add('d-opaq');
            la.classList.add('d-opaq');
          } else {
            l.classList.add('d-opaq');
          }
        }
      }
    },
    autocompleteBandsEvent(e) {
      const [...c] = this.bandsObj;
      const t = e.target;
      const v = t.value;
      const l = t.nextElementSibling;
      const a = t.parentElement.nextElementSibling;
      const la = a.querySelector('.load');
      if (v.length < 3) {
        if (!this.$isEmpty(this.foundBandsObj)) {
          [...this.foundBandsObj] = [];
        }
        l.classList.add('d-opaq');
        la.classList.add('d-opaq');
      } else {
        l.classList.remove('d-opaq');
        la.classList.remove('d-opaq');
        if (this.$isEmpty(c)) {
          l.classList.add('d-opaq');
        } else {
          const foundBands = c.filter(
            (a) =>
              a !== undefined && a.name.toLowerCase().includes(v.toLowerCase())
          );
          const artists = this.$isEmpty(this.getValue('bands'))
            ? []
            : this.getValue('bands');
          const q = [];
          for (const y of foundBands) {
            const e = artists.find((a) => a !== undefined && a.name === y.name);
            if (this.$isEmpty(e)) {
              q.push(y);
            }
          }
          if (!this.$isEmpty(q)) {
            q.sort((a, b) => {
              if (a.name < b.name) {
                return -1;
              } else if (a.name > b.name) {
                return 1;
              } else {
                return 0;
              }
            });
            [...this.foundBandsObj] = q;
            l.classList.add('d-opaq');
            la.classList.add('d-opaq');
          } else {
            l.classList.add('d-opaq');
          }
        }
      }
    },
    autocompleteArtistsEvent(e) {
      const [...c] = this.artistsObj;
      const t = e.target;
      const v = t.value;
      const l = t.nextElementSibling;
      const a = t.parentElement.nextElementSibling;
      const la = a.querySelector('.load');
      if (v.length < 3) {
        if (!this.$isEmpty(this.foundArtistsObj)) {
          [...this.foundArtistsObj] = [];
        }
        l.classList.add('d-opaq');
        la.classList.add('d-opaq');
      } else {
        l.classList.remove('d-opaq');
        la.classList.remove('d-opaq');
        if (this.$isEmpty(c)) {
          l.classList.add('d-opaq');
        } else {
          const foundArtists = c.filter(
            (a) =>
              a !== undefined && a.name.toLowerCase().includes(v.toLowerCase())
          );
          const artists = this.$isEmpty(this.getValue('bands'))
            ? []
            : this.getValue('bands');
          const q = [];
          for (const y of foundArtists) {
            const e = artists.find((a) => a !== undefined && a.name === y.name);
            if (this.$isEmpty(e)) {
              q.push(y);
            }
          }
          if (!this.$isEmpty(q)) {
            q.sort((a, b) => {
              if (a.name < b.name) {
                return -1;
              } else if (a.name > b.name) {
                return 1;
              } else {
                return 0;
              }
            });
            [...this.foundArtistsObj] = q;
            l.classList.add('d-opaq');
            la.classList.add('d-opaq');
          } else {
            l.classList.add('d-opaq');
          }
        }
      }
    },
    selectArtist(e, artist, collection) {
      const t = e.target;
      const a = t.closest('.autocomplete');
      const i = a.previousElementSibling.querySelector('input');
      const l = i.nextElementSibling;
      const la = a.querySelector('.load');
      const artists = this.$isEmpty(this.getValue(collection))
        ? []
        : this.getValue(collection);
      if (!artists.find((a) => a !== undefined && a.name === artist.name)) {
        artists.push(artist);
        this.setValue(collection, artists);
        l.classList.add('d-opaq');
        la.classList.add('d-opaq');
        i.value = '';
        [...this.foundObj] = [];
        setTimeout(() => {
          i.focus();
        }, 100);
      }
    },
    selectArtistToAgent(e, artist, collection) {
      const t = e.target;
      const a = t.closest('.autocomplete');
      const i = a.previousElementSibling.querySelector('input');
      const l = i.nextElementSibling;
      const la = a.querySelector('.load');
      const artists = this.$isEmpty(this.getValue(collection))
        ? []
        : this.getValue(collection);
      if (!artists.find((a) => a !== undefined && a.name === artist.name)) {
        this.$profile.getUserById(artist.id).then((r) => {
          artists.push({
            id: artist.id,
            name:
              collection === 'artists'
                ? this.$isEmpty(r.data.fields.nickname.value.value)
                  ? r.data.name
                  : r.data.fields.nickname.value.value
                : r.data.fields.title.value.value,
            avatar: r.data.fields.avatar.value[0].value,
            spec: r.data.fields.spec.value.value
          });
          this.setValue(collection, artists);
          l.classList.add('d-opaq');
          la.classList.add('d-opaq');
          i.value = '';
          [...this.foundObj] = [];
          [...this.foundBandsObj] = [];
          [...this.foundArtistsObj] = [];
          i.focus();
          this.$profile
            .addAgentToPerformer(
              {
                id: this.$store.state.data.id,
                name: this.$store.state.data.name
              },
              artist.id
            )
            .catch((e) => console.log(e));
        });
      }
    }
  }
};
