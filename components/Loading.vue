<template>
  <transition name="loading">
    <div v-if="loading" id="loading">
      <transition name="loading">
        <img :src="imgSrc" alt="0" />
      </transition>
    </div>
  </transition>
</template>

<script>
import Image from '~/static/images/loading.gif';
export default {
  props: {
    loadingState: {
      default: undefined,
      type: Boolean
    }
  },
  data() {
    return {
      loading: this.loadingState
    };
  },
  computed: {
    imgSrc() {
      return Image;
    }
  },
  watch: {
    loadingState(newV) {
      this.loading = newV;
    }
  },
  methods: {
    start() {
      this.loading = true;
    },
    finish() {
      this.loading = false;
    }
  }
};
</script>

<style lang="scss" scoped>
@import '~/assets/_defaults.scss';

#loading {
  z-index: 10000;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #181818;
  opacity: 0.9;
  img {
    width: 50%;
    height: auto;
  }
}
.loading-enter {
  opacity: 0;
}
.loading-enter-active,
.loading-leave-active {
  transition: all 0.15s linear;
}
.loading-leave-to {
  opacity: 0;
}
</style>
