<template>
  <v-content>
    <LogoText :content="plainText" />
    <white-layer>
      <template #bg-header>
        заява на співпрацю
      </template>
      <template #sm-header>
        Заповніть форму і ми звʼяжемося з вами
      </template>
      <template #content>
        <div class="content">
          <v-form id="contact-form">
            <div class="combos mb-5 w-100">
              <label class="w-100">
                <input
                  v-model="checked"
                  type="radio"
                  name="role"
                  value="private"
                  hidden
                />
                <div class="check-item border-radius">
                  {{ privateLabel }}
                </div>
              </label>
              <label class="w-100">
                <input
                  v-model="checked"
                  type="radio"
                  name="role"
                  value="copr"
                  hidden
                />
                <div class="check-item border-radius">
                  {{ corpLabel }}
                </div>
              </label>
            </div>
            <m-form-component>
              <m-text
                name="name"
                required
                :placeholder="checked === 'private' ? 'ФИО' : 'Назва компании'"
              ></m-text>
            </m-form-component>
            <!-- <m-form-component>
              <m-text name="genre" placeholder="Направление"> </m-text>
            </m-form-component> -->
            <div class="border-radius genres">
              <input ref="genres" type="hidden" name="genres" />
              <template v-if="chips.length > 0">
                <transition-group name="chip" mode="out-in" appear>
                  <v-chip
                    v-for="(ch, ind) in chips"
                    :key="ch"
                    :close="true"
                    pill
                    outlined
                    color="info"
                    text-color="black"
                    class="ml-2 mb-2"
                    tag="div"
                    @click:close="removeChip(ind)"
                    >{{ $capitalize(ch) }}</v-chip
                  >
                </transition-group>
              </template>
              <input
                ref="chip-input"
                type="text"
                placeholder="Направление"
                @keyup.stop="addChip($event)"
              />
            </div>
            <m-form-component>
              <m-text name="email" placeholder="E-mail"></m-text>
            </m-form-component>
            <m-form-component>
              <m-text
                name="phone"
                required
                placeholder="Телефон"
                data-validate
              ></m-text>
            </m-form-component>
            <v-btn color="info" class="w-100" @click.stop="$validate($event)"
              >Відправити</v-btn
            >
          </v-form>
        </div>
      </template>
    </white-layer>
  </v-content>
</template>

<script>
import { mapState } from 'vuex';
import LogoText from '@/components/LogoText.vue';
export default {
  components: {
    LogoText
  },
  data() {
    return {
      checked: 'private',
      privateLabel: 'Физическое лицо',
      corpLabel: 'Юридическое лицо',
      chips: []
    };
  },
  computed: {
    ...mapState(['plainText', 'mobile'])
  },
  watch: {
    mobile: {
      immediate: true,
      handler(newVal, oldVal) {
        if (newVal) {
          this.privateLabel = 'Физ. лицо';
          this.corpLabel = 'Юр. лицо';
        } else {
          this.privateLabel = 'Физическое лицо';
          this.corpLabel = 'Юридическое лицо';
        }
      }
    },
    chips: {
      immediate: true,
      handler(newVal, oldVal) {
        this.$nextTick(() => {
          this.$refs.genres.value = this.chips;
        });
      }
    }
  },
  methods: {
    addChip(event) {
      const t = event.target;
      if (event.keyCode === 13) {
        this.chips.push(t.value);
        t.value = '';
        t.focus();
      }
    },
    removeChip(index) {
      this.chips.splice(index, 1);
      this.$nextTick(() => {
        this.$refs['chip-input'].focus();
      });
    }
  },
  head() {
    return {
      title: 'Сотрудничество'
    };
  }
};
</script>

<style lang="scss" scoped>
@import '~/assets/_defaults.scss';

.white-layer {
  margin-bottom: 60px;
  @include tablet() {
    margin-bottom: 80px;
  }
  .content {
    padding: 20px 10px;
    border-radius: 10px;
    background-color: #fff;
    width: 100%;
    @include tablet() {
      padding: 40px;
      max-width: 550px;
    }
    @include screen() {
      padding: 40px 60px;
      max-width: 600px;
    }
  }
}

#contact-form {
  display: flex;
  flex-direction: column;
  .__input {
    color: black;
    background-color: $light-grey;
    &::placeholder {
      color: black;
    }
  }
  .genres {
    background-color: $light-grey;
    min-height: 56px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin-bottom: 22px;
    padding: 15px;
    [type='text'] {
      width: 100%;
      outline: none;
      background-color: transparent;
      border: 0;
      color: black;
      &::placeholder {
        color: black;
      }
    }
    .v-chip {
      &:first-child {
        margin-left: 0 !important;
      }
    }
  }
  .combos {
    display: flex;
    justify-content: space-between;
    label {
      &:first-child {
        margin-right: 20px;
      }
    }
  }
}

.chip-enter {
  opacity: 0;
}
.chip-enter-active,
.chip-leave-active {
  @include flow(0.3);
}
.chip-leave-to {
  opacity: 0;
}
</style>
