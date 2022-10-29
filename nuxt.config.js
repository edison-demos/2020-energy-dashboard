module.exports = {
  modules: [
    ['bootstrap-vue/nuxt', {
      icons: true,
    }],
    '@nuxtjs/axios',
  ],

  ssr: false,
  components: true,
  mode: 'spa',

  axios: {
    proxy: true, // Can be also an object with default options
    prefix: '/api/',
  },

  proxy: {
    '/api/': {
      target: 'http://127.0.0.1:8000',
      compress: true,
      headers: {
        Connection: 'keep-alive',
      },
      proxyTimeout: 1000 * 30,
      timeout: 1000 * 30,
    }
  }
}
