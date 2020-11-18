import es from 'vuetify/es5/locale/es'

export default {
  // Disable server-side rendering (https://go.nuxtjs.dev/ssr-mode)
  ssr: false,

  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    titleTemplate: '',
    title: 'Equipos',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'La mejor página de equipos',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    { src: '~/plugins/notify', mode: 'client' },
    { src: '~/plugins/axion', mode: 'client' },
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    [
      'nuxt-social-meta',
      {
        url: 'www.equipos.com',
        title: 'Equipos',
        description: 'La mejor página de Equipos',
        img: '~/assets/logo.png',
        locale: 'es_ES',
        twitter: '@maranimaitas',
        themeColor: '#086b94',
      },
    ],
    'nuxt-material-design-icons',
  ],

  // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      themes: {
        light: {
          primary: '#000000',
          accent: '#000000',
          error: '#B71C1C',
        },
      },
    },
    lang: {
      locales: { es },
      current: 'es',
    },
    // https://materialdesignicons.com/
    // https://cdn.materialdesignicons.com/5.3.45/
    icons: {
      iconfont: 'mdi',
    },
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {},
}
