<template>
  <div class="img-load d-flex flex-column align-center pointer">
    <input
      type="file"
      accept="png,jpg,jpeg,gif,bmp"
      hidden
      name="avatar"
      @change="fileUpload($event)"
    />
    <div class="img-container border-radius d-flex">
      <m-close class="d-none" @click.native="resetAvatar($event)"></m-close>
      <m-loading class="d-none"></m-loading>
      <img
        class="img"
        :src="$src('void-img.png')"
        alt=""
        @click="uploadAvatar($event)"
      />
    </div>
    <div class="img-title mt-2" @click="uploadAvatar($event)">
      Завантажити світлину профіля
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped></style>
