<template>
  <div :style="$imgSrc(imgSrc)">
    <div class="top">
      <slot="top" />
    </div>
    <div class="down">
      <slot name="down" />
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped></style>
