import { mapState } from 'vuex';
export default {
  loading: false,
  beforeRouteLeave(to, from, next) {
    this.$nuxt.$loading.start();
    next();
  },
  computed: {
    ...mapState(['data', 'logged']),
    fields() {
      return this.data.fields;
    },
    isEmptyPrice() {
      const p = this.getValue('prices');
      if (!this.$isEmpty(p)) {
        return (
          !this.$isEmpty(
            p.regular.find(
              (a) => a !== undefined && a.title.includes('resident')
            ).price
          ) ||
          !this.$isEmpty(
            p.regular.find((a) => a !== undefined && a.title.includes('event'))
              .price
          )
        );
      }
      return false;
    }
  },
  methods: {
    getValue(field) {
      try {
        const v =
          this.fields[field].type === 4
            ? this.fields[field].value
            : this.fields[field].value.value;
        if (this.fields[field].type === 4) {
          return v;
        } else {
          const f = v[0];
          if (f === '{' || f === '[') {
            return JSON.parse(v);
          }
          return v;
        }
      } catch (error) {
        return '';
      }
    },
    setValue(field, val) {
      this.$store.commit('setDataField', {
        [field]: val
      });
    }
  }
};
