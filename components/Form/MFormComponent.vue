<template>
  <div class="form-component">
    <slot></slot>
    <div ref="message" class="message"></div>
  </div>
</template>

<script></script>

<style lang="scss">
@import '~/assets/_defaults.scss';
.form-component {
  display: flex;
  flex-wrap: wrap;
  [type] {
    @include flow;
  }
  a {
    color: $info !important;
    font-size: rem(13);
  }
  .message {
    @include flow;
    font-size: rem(14);
    color: $info;
    flex-basis: 100%;
    opacity: 0;
    height: 22px;
  }
  &.incorrect {
    [type] {
      border-color: $info;
      @include flow;
    }
    .message {
      opacity: 1;
      @include flow;
    }
  }
}
</style>
