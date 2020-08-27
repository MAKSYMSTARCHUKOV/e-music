<template>
  <div class="m-close pointer">
    <img :src="$src('icons/times.svg')" alt="" />
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import '~/assets/_defaults.scss';
.m-close {
  background-color: #181818;
  display: flex;
  opacity: 0.65;
  position: absolute;
  top: 8px;
  right: 8px;
  padding: 8px;
  border-radius: 50%;
  &.small {
    top: 2px;
    right: 2px;
    padding: 5px;
    @include screen() {
      padding: 8px;
    }
    img {
      width: 8px;
      height: auto;
    }
  }
  img {
    width: 16px;
    height: auto;
    @include screen() {
      width: 14px;
    }
  }
}
</style>
