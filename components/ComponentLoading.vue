<template>
  <transition name="m-loading">
    <div class="m-loading">
      <img :src="$src('icons/loading.gif')" alt="" />
    </div>
  </transition>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.m-loading {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #181818;
  opacity: 0.5;
  width: 100%;
  height: 100%;
  img {
    width: 32px;
    height: auto;
  }
}
.m-loading-enter {
  opacity: 0;
}
.m-loading-enter-active,
.m-loading-leave-active {
  transition: all 0.15s linear;
}
.m-loading-leave-to {
  opacity: 0;
}
</style>
