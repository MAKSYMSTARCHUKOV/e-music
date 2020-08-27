<template>
  <v-content>
    <v-snackbar v-model="snackbar" :bottom="true" color="info" :timeout="5000"
      >{{
        $isEmpty(snackMessage) ? 'Заповність обовʼязкові поля' : snackMessage
      }}
    </v-snackbar>
    <div class="mode d-flex justify-center">
      <label @mousedown="mode = 'left-tab'">
        <input
          v-model="checked"
          type="radio"
          name="mode"
          value="login"
          hidden
          @change="role = 0"
        />
        <div class="check-item border-radius">
          Вхід
        </div>
      </label>
      <label @mousedown="mode = 'right-tab'">
        <input
          v-model="checked"
          type="radio"
          name="mode"
          value="register"
          hidden
          @change="role = 0"
        />
        <div class="check-item border-radius">
          Реєстрація
        </div>
      </label>
    </div>
    <div class="tabs mb-7">
      <div
        v-if="checked === 'login'"
        :key="checked"
        class="tab login d-flex justify-center"
      >
        <v-form class="w-100 d-flex flex-column align-center">
          <m-form-component class="w-100">
            <m-text
              name="e"
              placeholder="E-mail"
              :data-validate="true"
              required
              @click="snackbar = false"
            ></m-text>
          </m-form-component>
          <m-form-component class="w-100">
            <m-text
              required
              name="pass"
              placeholder="Пароль"
              type="password"
              @click="snackbar = false"
            ></m-text>
          </m-form-component>
          <v-btn color="info" @click.stop="login">Увійти</v-btn>
        </v-form>
      </div>
      <div v-else class="tab register d-flex">
        <white-layer v-if="role != 0">
          <template #bg-header>
            реєстрація
          </template>
          <template #sm-header>
            для {{ role != 4 ? 'виконавців та агентів' : 'закладів' }}
          </template>
          <template #content>
            <div class="profit">
              <template v-if="role != 4">
                <div class="profit-item d-flex align-center">
                  <img class="mr-5" :src="$src('icons/suitcase.svg')" alt="" />
                  <span>больше ніж 1000 работодавців</span>
                </div>
                <div class="profit-item d-flex align-center">
                  <img class="mr-5" :src="$src('icons/mobile.svg')" alt="" />
                  <span>зручний функціонал</span>
                </div>
                <div class="profit-item d-flex align-center">
                  <img
                    class="mr-5"
                    :src="$src('icons/credit card.svg')"
                    alt=""
                  />
                  <span>гарантований гонорар</span>
                </div>
              </template>
              <template v-else>
                <div class="profit-item d-flex align-center">
                  <img :src="$src('icons/woofer.svg')" alt="" />
                  <span>гарантія виступів</span>
                </div>
                <div class="profit-item d-flex align-center">
                  <img :src="$src('icons/mic.svg')" alt="" />
                  <span>больше ніж 2000 виконавців</span>
                </div>
                <div class="profit-item d-flex align-center">
                  <img :src="$src('icons/headphones.svg')" alt="" />
                  <span>зручний букінг виконавців</span>
                </div>
              </template>
            </div>
          </template>
        </white-layer>
        <v-form
          class="role-form d-flex flex-column align-center"
          :style="style"
        >
          <div class="role w-100">
            <label>
              <input v-model="role" type="radio" name="role" value="1" hidden />
              <div class="check-item border-radius">
                Агент
              </div>
            </label>
            <label>
              <input v-model="role" type="radio" name="role" value="2" hidden />
              <div class="check-item border-radius">
                Артист
              </div>
            </label>
            <label>
              <input v-model="role" type="radio" name="role" value="3" hidden />
              <div class="check-item border-radius">
                Колектив
              </div>
            </label>
            <label>
              <input v-model="role" type="radio" name="role" value="4" hidden />
              <div class="check-item border-radius">
                Заклад
              </div>
            </label>
          </div>
          <template v-if="role != 0">
            <m-form-component :key="role" class="w-100 mt-5">
              <m-text
                name="e"
                :data-validate="true"
                placeholder="E-mail"
                required
                @click="snackbar = false"
              ></m-text>
            </m-form-component>
            <m-form-component :key="role" class="w-100">
              <m-text
                name="pass"
                placeholder="Пароль"
                required
                type="password"
                @click="snackbar = false"
              ></m-text>
            </m-form-component>
            <m-form-component :key="role" class="w-100">
              <m-text
                name="repeat"
                placeholder="Повтор пароля"
                required
                type="password"
                @click="snackbar = false"
              ></m-text>
            </m-form-component>
            <m-form-component>
              <a
                href="https://docs.google.com/document/d/1uYUoCzbxrq9XvCUpqWgSgHYj1NKoqbnM0eDNoYk2yLY/edit?usp=sharing"
                >Умови користування сервісом</a
              >
            </m-form-component>
            <v-btn color="info" @click.stop="login">Реєстрація</v-btn>
          </template>
        </v-form>
      </div>
    </div>
  </v-content>
</template>

<script>
export default {
  data() {
    return {
      checked: 'login',
      mode: 'left-tab',
      role: 0,
      snackbar: false,
      snackMessage: ''
    };
  },
  computed: {
    style() {
      if (this.role == 0) {
        return {
          borderRadius: '10px'
        };
      }
      return {};
    }
  },
  watch: {
    snackbar(newV) {
      if (!newV) {
        this.snackMessage = '';
      }
    },
    checked(newV) {
      this.snackbar = false;
    },
    role(newV) {
      this.snackbar = false;
    }
  },
  methods: {
    login(e) {
      let correct = this.$validate(e);
      this.snackbar = !correct;
      const f = e.target.closest('form');
      if (correct) {
        if (this.checked === 'register') {
          const p = f.querySelector('[name="pass"]');
          const r = f.querySelector('[name="repeat"]');
          if (r.value !== p.value) {
            r.parentElement.querySelector('.message').textContent =
              'Пароли не совпадают';
            r.parentElement.classList.add('incorrect');
            correct = false;
          }
        }
      }
      if (correct) {
        const e = f.querySelector('[name="e"]');
        const p = f.querySelector('[name="pass"]');
        this.$nuxt.$loading.start();
        const fun = () => {
          return this.checked === 'login'
            ? this.$init(e.value, p.value)
            : this.$register({
                email: e.value,
                password: p.value,
                role: parseInt(this.role, 10)
              });
        };

        fun()
          .then((r) => {
            let role = 0;
            if (this.checked !== 'login') {
              this.$localstorage.set('token', r.success.token);
              role = parseInt(this.role, 10);
            } else {
              role = parseInt(r.data.role, 10);
            }
            switch (role) {
              case 1: {
                this.$router.push({ name: 'agent' });
                break;
              }
              case 2: {
                this.$router.push({ name: 'artist' });
                break;
              }
              case 3: {
                this.$router.push({ name: 'band' });
                break;
              }
              case 4: {
                this.$router.push({ name: 'restaurant' });
                break;
              }
            }
          })
          .catch((e) => {
            this.$nuxt.$loading.finish();
            if (e.status == 401) {
              this.snackMessage = 'Спочатку зареєструйтесь';
            } else if (e.data.message) {
              if (e.data.message.includes('Duplicate entry')) {
                this.snackMessage = 'Ви вже зареєстровані';
              }
            } else {
              this.snackMessage = `${e.status} | ${e.data.error ||
                e.data.message ||
                e.data ||
                'Unknown Error'}`;
            }
            this.snackbar = true;
          });
      }
    }
  },
  head() {
    return {
      title: 'Вхід/Реєстрація'
    };
  }
};
</script>
<style lang="scss" scoped>
@import '~/static/scss/account.scss';
</style>
<style lang="scss">
@import '~/assets/_defaults.scss';
.__input {
  background-color: $grey !important;
  color: $primary;
  &::placeholder {
    color: darken($grey, 40%);
  }
}
.white-layer {
  background-color: black;
  border-radius: 10px 0 0 10px;
  padding: 20px 10px;
  width: 100%;
  flex-shrink: 0;
  @include tablet() {
    border-radius: 10px 10px 0 0;
    padding: 30px 60px;
    width: 40%;
  }
  .headers {
    align-items: center !important;
    margin-bottom: 30px;
    @include tablet() {
      align-items: start !important;
    }
  }
  .md-header {
    display: none;
  }
  .sm-header {
    font-weight: 600;
  }
  .profit {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 20px;
    &-item {
      img {
        height: 48px;
        margin-right: 10px;
        @include tablet() {
          height: 60px;
          margin-right: 20px;
        }
      }
      span {
        font-size: rem(15);
        font-weight: 500;
        color: $info;
      }
    }
  }
}
</style>
