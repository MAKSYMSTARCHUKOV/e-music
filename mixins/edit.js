export default {
  mounted() {
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
    const p = this.$store.state.data.fields.photos.value;
    if (Array.isArray(p)) {
      const q = [];
      for (const i of p) {
        q.push(
          new Promise((resolve, reject) => {
            fetch('/storage/' + i.value)
              .then((r) => r.blob())
              .then((r) => resolve(r));
          })
        );
      }
      Promise.all(q)
        .then((r) => {
          for (const y of r) {
            this.photos.push(URL.createObjectURL(y));
            URL.revokeObjectURL(y);
          }
          this.$nuxt.$loading.finish();
          this.$store.commit('setField', { loading: false });
        })
        .catch((e) => {
          this.$nuxt.$loading.finish();
          this.$store.commit('setField', { loading: false });
        });
    }
  }
};
