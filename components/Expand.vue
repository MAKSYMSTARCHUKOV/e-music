<template>
  <section id="ganre">
    <Rubricator />
    <div class="show-result">
      <a
        v-for="d of artists"
        :key="d.artist_id"
        class="show-result-item d-flex flex-column justify-space-between"
        :href="`/artist/${d.artist_id}`"
      >
        <img
          :src="avatar(d.artist)"
          alt=""
          :class="{
            default: isDefault(d.artist)
          }"
        />
        <div class="head op">{{ name(d.artist) }}</div>
        <div class="bottom op">
          <div class="categ d-flex">
            <a :href="`/restaurant/${d.restaurant_id}`"
              ><span>{{ name(d.restaurant) }}</span></a
            >
          </div>
          <div class="price">
            {{ new Date(d.date).toLocaleDateString() }}
          </div>
        </div>
      </a>
    </div>
  </section>
</template>

<script>
import Rubricator from '~/components/Rubricator.vue';

export default {
  components: {
    Rubricator
  },
  props: {
    artists: {
      type: Array,
      default: () => []
    }
  },
  computed: {},
  methods: {
    avatar(obj) {
      const a = obj.fields.avatar.value;
      const y = a[0].value;
      return this.$isEmpty(y) ? '/images/void-img.png' : `/storage/${y}`;
    },
    isDefault(obj) {
      const a = obj.fields.avatar.value;
      const y = a[0].value;
      return !!this.$isEmpty(y);
    },
    name(obj) {
      const f = obj.fields;
      if (obj.role === 4) {
        return f.title.value.value;
      } else if (obj.role === 2) {
        if (!this.$isEmpty(f.nickname.value.value)) {
          return f.nickname.value.value;
        } else {
          return `${f.name.value.value} ${f['second-name'].value.value}`;
        }
      }
    }
  },
  head() {
    return {
      title: 'Афиша'
    };
  }
};
</script>

<style lang="scss" scoped>
@import '~/assets/_defaults.scss';

.show {
  &-result {
    display: grid;
    grid-template-columns: 1fr;
    column-gap: 30px;
    row-gap: 30px;
    margin-bottom: 30px;
    @include tablet() {
      grid-template-columns: repeat(3, 1fr);
    }
    &-item {
      grid-column-end: span 1;
      height: 400px;
      background-size: cover;
      background-position: center top;
      position: relative;
      overflow: hidden;
      background-color: black;
      @include tablet() {
        height: 550px;
      }
      img {
        position: absolute;
        width: 100%;
        height: auto;
        top: 50%;
        transform: translateY(-50%);
        &.default {
          height: 100%;
          width: auto;
          top: 0;
          transform: translateX(-18%);
        }
      }
      .op {
        z-index: 1;
        background-color: rgba(#000000, 0.7);
        padding: 10px;
        &.head {
          font-weight: 300;
          font-size: rem(20);
          color: $info;
          @include tablet() {
            font-size: rem(27);
          }
        }
        &.bottom {
          .categ {
            flex-wrap: wrap;

            span {
              margin-top: 10px;
              text-transform: uppercase;
              &:not(:last-child) {
                margin-right: 20px;
                @include tablet() {
                  margin-right: 40px;
                }
              }
            }
          }
          .categ {
            span {
              font-weight: 600;
              font-size: rem(16);
              color: $info;
              @include tablet() {
                font-size: rem(20);
              }
            }
          }
        }
        @include tablet() {
          padding: 12px 28px;
        }
      }
    }
  }
  &-items {
    grid-column: 1 / -1;
    justify-content: center;
    @include tablet() {
      justify-content: start;
    }
    .item {
      flex-wrap: wrap;
      flex-direction: column;
      align-items: center;
      margin-left: 0;
      @include tablet() {
        margin-left: auto;
        flex-direction: row;
      }
      span,
      .show {
        color: white;
      }
      .show {
        font-weight: 700;
        border-radius: 6px;
        padding: 5px 8px;
        border: 1px solid transparent;
        @include flow;
        margin-left: 5px;
        &.current {
          border-color: $info;
          @include flow;
        }
      }
    }
  }
}
</style>
