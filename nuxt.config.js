import colors from 'vuetify/es5/util/colors';

export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: 'eMusic | %s',
    meta: [
      {
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      },
      {
        name: 'creator',
        content: 'MAKSYMSTARCHUKOV'
      }
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico'
      },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Montserrat:200,300,400,500,600,700,900&display=swap'
      }
    ],
    script: [
      {
        src: '/js/jquery-3.4.1.min.js'
      }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading:
    // color: '#fff'
    '~/components/Loading.vue',
  /*
   ** Global CSS
   */
  css: ['~/assets/transition.css'],
  /*
   ** Plugins to load before mounting the App
   */
  pageTransition: 'pages',
  plugins: [
    { src: '~plugins/swiper.js', ssr: false },
    {
      src: '~/plugins/lightbox.js',
      ssr: false
    },
    '~/plugins/form.js',
    '~/plugins/var.js',
    '~/plugins/reject-warning.js',
    '~/plugins/img-src.js',
    '~/plugins/check-valid.js',
    '~/plugins/validate.js',
    '~/plugins/capitalize.js',
    '~/plugins/axios.js'
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify',
    '@nuxtjs/router-extras'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    ['@nuxtjs/proxy', { pathRewrite: { '/storage': '' } }]
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    proxy: true
  },
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    // customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: '#131313',
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          // info: colors.teal.lighten1,
          info: '#E90D3B',
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
          font: {
            family: 'Montserrat'
          }
        }
      }
    }
  },
  router: {
    scrollBehavior: (to, from, savedPosition) => {
      return { x: 0, y: 0 };
    }
  },
  /*
   ** Build configuration
   */
  proxy: [
    'https://api.e-music.com.ua/api',
    'https://api.e-music.com.ua/storage'
  ],
  build: {
    // publicPath: 'files/',
    extend(config, ctx) {}
  }
};
