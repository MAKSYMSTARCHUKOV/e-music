<template>
  <input
    :type="type"
    autocomplete="off"
    class="__input border-radius"
    @keydown="$reject"
    @input="isDigit"
    v-on="$listeners"
  />
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: undefined
    },
    placeholder: {
      type: String,
      default: undefined
    },
    required: {
      type: Boolean,
      default: false
    },
    'data-validate': {
      type: Boolean,
      default: false
    },
    value: {
      type: String,
      default: ''
    },
    digit: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'text'
    }
  },
  mounted() {
    this.$nextTick(() => {
      for (const p in this.$props) {
        if (this.$props[p]) {
          const a = p.replace(/[A-Z]/g, (m) => '-' + m.toLowerCase());
          if (p === 'value') {
            this.$el.value = this.$props[p];
          } else {
            this.$el.setAttribute(a, this.$props[p]);
          }
        }
      }
    });
  },
  methods: {
    isDigit(e) {
      if (this.digit) {
        e.target.value = e.target.value
          .split('')
          .filter((a) => !isNaN(a))
          .join('');
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
