<template>
  <div id="expand">
    <img src="/images/icons/lines.svg" alt="" class="icon__main" />
    <div class="ganres mt-n2">
      <label
        v-for="(it, index) of genres"
        :ref="reference(it.toLowerCase(), index)"
        :key="index"
        :class="{
          pointer: true,
          'mt-2': true
        }"
      >
        <input type="radio" name="ganres" hidden />
        <div class="item">{{ it }}</div>
      </label>
    </div>
  </div>
</template>
<script>
import * as base from '~/services/base.js';
export default {
  computed: {
    genres() {
      return base.genres;
    }
  },
  methods: {
    reference(name, index) {
      return `${name}-${index}`;
    }
  }
};
</script>

<style lang="scss" scoped>
@import '~/assets/_defaults.scss';
#expand {
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  justify-content: space-between;
  grid-column: 1 / -1;
  margin-bottom: 20px;
  @include tablet() {
    justify-content: flex-start;
  }
  .ganres {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: flex-start;
    flex-basis: 80%;
  }
  .item {
    border-radius: 10px;
    border: 2px solid transparent;
    font-weight: 900;
    padding: 5px 10px;
    @include tablet() {
      margin-left: 25px;
    }
    @include screen() {
      margin-left: 45px;
    }
    @include flow;
  }
  input:checked ~ .item {
    @include flow;
    border-color: $info;
  }
}
</style>
