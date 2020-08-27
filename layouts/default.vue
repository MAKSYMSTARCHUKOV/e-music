<template>
  <v-app color="primary">
    <Loading :loading-state="loading"></Loading>
    <v-app-bar fixed hide-on-scroll flat height="60" color="primary">
      <a href="/">
        <img id="logo" src="/images/logo.svg" alt="" class="pointer" />
      </a>
      <a
        v-for="(bt, i) in anchors"
        :key="i"
        :ripple="false"
        class="anchor ml-5 d-md-flex d-none px-0 align-center"
        :class="{ current: $route.name === bt.path_name }"
        text
        :href="bt.url"
        >{{ bt.name }}</a
      >
      <v-btn
        :ripple="false"
        color="info"
        class="anchor ml-5 d-md-flex d-none px-0  v-btn--router align-center find__artist"
        @click="showArtistModal = !showArtistModal"
        >Знайти</v-btn
      >
      <v-spacer></v-spacer>
      <v-btn icon class="d-md-block d-none" :ripple="false">
        <img src="/images/icons/stars.svg" alt="" class="icon" />
      </v-btn>
      <v-btn
        v-if="logged !== undefined"
        icon
        class="ml-2 d-md-block d-none login-btn"
        :ripple="false"
        @click="showProfile"
      >
        <img src="/images/icons/user.svg" alt="" class="icon" />
        <div class="personal d-flex align-center">
          <span @click="enterPersonal">{{
            logged ? 'Особистий кабінет' : 'Вхід | Реєстрація'
          }}</span>
          <img
            v-if="logged === true"
            src="/images/icons/stand-by.svg"
            alt=""
            class="pointer ml-5"
            style="width:18px; height: auto"
            @click="logout"
          />
        </div>
      </v-btn>
      <v-btn icon class="d-block d-md-none" :ripple="false">
        <transition v-if="!mobile" name="mob">
          <v-icon color="white" @click.stop="mobile = !mobile">mdi-menu</v-icon>
        </transition>
        <transition v-else name="close">
          <v-icon color="white">mdi-close</v-icon>
        </transition>
      </v-btn>
    </v-app-bar>
    <nuxt />
    <v-navigation-drawer
      v-model="mobile"
      :right="false"
      :hide-overlay="true"
      fixed
      class="mobile__nav d-lg-none"
      color="primary"
      app
    >
      <v-list>
        <v-list-item v-for="(bt, i) in anchors" :key="i" class="px-0">
          <v-btn class="anchor d-flex px-0 align-center" text :to="bt.url">{{
            bt.name
          }}</v-btn>
        </v-list-item>
        <v-list-item class="px-0">
          <v-btn
            :ripple="false"
            color="info"
            class="anchor d-flex align-center find__artist"
            @click="showArtistModal = !showArtistModal"
            >Знайти</v-btn
          >
        </v-list-item>
        <v-list-item class="px-0 mt-6">
          <v-btn
            v-if="logged !== undefined"
            class="anchor d-flex px-0 align-center login-btn-mobile"
            text
            to="/"
            ><img src="/images/icons/user.svg" alt="" /><span
              class="ml-3"
              @click="enterPersonal"
              >{{ logged ? 'Особистий кабінет' : 'Вхід | Реєстрація' }}</span
            ></v-btn
          ><img
            v-if="logged === true"
            src="/images/icons/stand-by.svg"
            alt=""
            style="width:18px; height:auto"
            class="ml-5"
            @click="logout"
          />
        </v-list-item>
        <v-list-item class="px-0">
          <v-btn class="anchor d-flex px-0 align-center" text to="/"
            ><img src="/images/icons/stars.svg" alt="" /><span class="ml-3"
              >Улюблене</span
            ></v-btn
          >
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-overlay :value="showArtistModal" opacity="0.85" z-index="1000">
      <section id="find__artist">
        <div class="content">
          <h1>
            знайти:
          </h1>
          <img
            src="/images/icons/close.svg"
            alt=""
            class="icon close pointer"
            @click="showArtistModal = !showArtistModal"
          />
          <FindArtist />
        </div>
      </section>
    </v-overlay>
    <Footer />
  </v-app>
</template>

<script>
import { mapState } from 'vuex';
import FindArtist from '~/components/FindArtist.vue';
import Loading from '~/components/Loading.vue';
import Footer from '~/components/Footer.vue';
export default {
  components: {
    FindArtist,
    Footer,
    Loading
  },
  data() {
    return {
      mobile: false,
      showArtistModal: false,
      anchors: [
        {
          name: 'артисти',
          url: '/artists',
          path_name: 'artists'
        },
        {
          name: 'заклади',
          url: '/restaurants',
          path_name: 'restaurants'
        },
        {
          name: 'афіша',
          url: '/posters',
          path_name: 'posters'
        },
        {
          name: 'новини',
          url: '/news',
          path_name: 'news'
        }
      ]
    };
  },
  computed: {
    ...mapState(['logged', 'data', 'loading', 'role'])
  },
  beforeCreate() {
    // this.$init('absolem.gs@gmail.com', '747')
    //   .then((r) => {
    //     this.$store.commit('setField', {
    //       data: r.data,
    //       logged: true
    //     });
    //   })
    //   .catch((e) => {
    //     this.$store.commit('setField', {
    //       data: {},
    //       logged: undefined
    //     });
    //   });

    this.$profile
      .getUser()
      .then((r) => {
        this.$store.commit('setField', {
          logged: true,
          role: r.data.role,
          id: r.data.id
        });
      })
      .catch((e) => {
        this.$store.commit('setField', {
          logged: false
        });
      });
    this.unwatch = this.$store.watch(
      (state, getters) => getters.logged,
      (newV, oldV) => {
        this.$store.commit('setField', { loading: false });
      }
    );
  },
  mounted() {
    this.$store.commit('setMobile', this.$vuetify.breakpoint.xs);
    window.onresize = () => {
      this.$store.commit('setMobile', this.$vuetify.breakpoint.xs);
    };
    window.onscroll = () => {
      try {
        document.querySelector('.personal').classList.remove('activated');
      } catch {}
    };
    document.querySelector('body,html').onclick = (e) => {
      if (e.target.closest('.login-btn') === null) {
        try {
          document.querySelector('.personal').classList.remove('activated');
        } catch {}
      }
    };
    this.$nextTick(() => {
      setTimeout(() => {
        if (this.logged === undefined) {
          this.$cancel();
          this.$store.commit('setField', { loading: false });
        }
      }, 20000);
    });
  },
  beforeDestroy() {
    this.unwatch();
  },
  methods: {
    logout() {
      this.$store.commit('setField', { logged: false, id: '', role: -1 });
      this.$logout();
      if (this.$route.name !== 'index') {
        this.$router.push({ name: 'index' });
      }
    },
    enterPersonal() {
      if (this.logged) {
        switch (this.role) {
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
      } else {
        this.$router.push({ name: 'account' });
      }
    },
    showProfile(e) {
      document.querySelector('.personal').classList.toggle('activated');
    }
  }
};
</script>
<style lang="scss">
@import '~/assets/variables.scss';
@import '~/assets/_defaults.scss';
* {
  font-family: $font-family;
  font-size: 16px;
}
#top__background {
  width: 100%;
  top: -20px;
}

.anchor {
  font-weight: 900;
  color: white !important;
  text-transform: uppercase;
  margin-left: 30px;
  &:before {
    background-color: $primary;
  }
  &.find__artist {
    padding: 10px 20px !important;
    font-weight: 900 !important;
    text-transform: uppercase !important;
  }
  &.current {
    color: $info !important;
  }
}

#logo {
  margin-top: 8px;
}
.mobile__nav {
  width: 100% !important;
  top: 60px !important;
}

.mob-enter {
  opacity: 0;
  transform: translateX(10px);
}
.mob-enter-active,
.mob-leave-active {
  transition: all 0.3s ease;
}
.mob-leave-to {
  opacity: 0;
  transform: translateX(-10px);
}

.close-enter {
  opacity: 0;
  transform: translateX(-10px);
}
.close-enter-active,
.close-leave-active {
  transition: all 0.3s ease;
}
.close-leave-to {
  opacity: 0;
  transform: translateX(10px);
}

.login-btn {
  position: relative;
  .personal {
    position: absolute;
    top: 40px;
    left: -100;
    height: 0;
    overflow: hidden;
    padding: 8px;
    border-radius: 6px;
    @include flow();
    visibility: hidden;
    background-color: $dim;
    span,
    img {
      opacity: 0;
      @include flow(0.1);
    }
    &.activated {
      visibility: visible;
      @include flow();
      height: 40px;
      span,
      img {
        opacity: 1;
        @include flow(0.25);
      }
    }
  }
}

#find__artist {
  max-width: 600px;
  padding: 0 50px;
  @include tablet() {
    padding: 0;
  }
  .content {
    h1 {
      text-align: center;
    }
    .close {
      position: absolute;
      top: 0;
      right: 50px;
      @include tablet() {
        right: 0;
      }
    }
  }
}

.v-tooltip__content {
  background-color: $info;
  color: black;
  span {
    font-size: rem(14);
  }
}
</style>
