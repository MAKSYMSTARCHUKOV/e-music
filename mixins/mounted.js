export default {
  mounted() {
    this.$nextTick(() => {
      if (this.$store.state.data.fields.prices) {
        if (this.$isEmpty(this.$store.state.data.fields.prices.value.value)) {
          this.$store.commit('setDataField', {
            prices: {
              regular: [
                {
                  title: 'resident price',
                  price: ''
                },
                {
                  title: 'event price',
                  price: ''
                }
              ],
              special: {
                'resident price': [],
                'event price': []
              }
            }
          });
        }
      }
      this.$store.commit('addDataField', {
        deleted: {
          type: 4,
          value: []
        }
      });

      for (const y in this.$store.state.data.fields) {
        if (this.$store.state.data.fields[y].type === 4) {
          if (this.$store.state.data.fields[y].value.length === 1) {
            if (this.$store.state.data.fields[y].value[0].value === '') {
              this.$store.commit('setDataField', {
                [y]: []
              });
            }
          }
        }
      }
      if (typeof this.getValue('avatar') === 'object') {
        if (!this.$isEmpty(this.getValue('avatar'))) {
          (async () => {
            const a = await fetch(
              `/storage/${this.getValue('avatar')[0].value}`
            );
            const b = await a.blob();
            this.avatar = URL.createObjectURL(b);
            this.$nuxt.$loading.finish();
            this.$store.commit('setField', { loading: false });
            URL.revokeObjectURL(b);
          })();
        } else {
          this.$nuxt.$loading.finish();
          this.$store.commit('setField', { loading: false });
        }
      } else {
        this.$nuxt.$loading.finish();
        this.$store.commit('setField', { loading: false });
      }
    });
  }
};
