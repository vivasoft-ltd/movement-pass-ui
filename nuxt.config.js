export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Movement Pass',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', type: 'text/css', href: 'https://maxst.icons8.com/vue-static/landings/line-awesome/line-awesome/1.3.0/css/line-awesome.min.css' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    { src: '~/assets/css/tabler.min.css' },
    { src: '~/assets/css/style.css' },
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/axios'},
    { src: '~/plugins/vuelidate'},
    { src: '~/plugins/vueToastNotification'},
    { src: '~/plugins/vueSelect'},
    { src: '~/plugins/vueHtml2Pdf'},
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    'nuxt-moment'
  ],

  axios: {
    baseURL: 'http://127.0.0.1:8820/'
  },

  auth: {
    strategies: {
      user: {
        scheme: 'refresh',
        token: {
          property: 'token',
          required: true,
          type: 'bearer'
        },
        refreshToken: {
          property: 'token',
          type: 'bearer',
          tokenRequired: true
        },
        endpoints: {
          login: { url: 'login', method: 'post', propertyName: 'token'},
          user: { url: 'user', method: 'get', propertyName: 'user'},
          refresh: { url: 'refresh', method: 'get', propertyName: 'token'},
          logout: { url: 'logout', method: 'get'},
        }
      },
      admin: {
        scheme: 'local',
        token: {
          prefix: 'admin',
          property: 'token',
          required: true,
          type: 'bearer'
        },
        endpoints: {
          login: { url: 'admin/login', method: 'post', propertyName: 'token'},
          user: { url: 'admin/me', method: 'get', propertyName: 'user'},
          logout: { url: 'admin/logout', method: 'get'},
        }
      },
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    loaders: {
      vue: {
        compiler: require('vue-template-babel-compiler')
      }
    },
    babel: {
      compact: true,
    }
  },

}
