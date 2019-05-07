const webpack = require('webpack')
module.exports = {
  srcDir: 'client/',
  buildDir: 'dist/client/',
  rootDir: './',
  dev: (process.env.NODE_ENV !== 'production'),
  /*
  ** Router config
  */
  router: {
    middleware: [
      'check-auth'
    ]
  },
  /*
  ** Headers of the page
  */
  head: {
    title: '药品流通服务平台',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Build config
  */
  build: {
    publicPath: '/hare/',
    babel: {
      plugins: ['transform-decorators-legacy', 'transform-class-properties']
    },
    extend (config, { isDev }) {
      config.resolve.alias['class-component'] = '@/plugins/class-component'
    },
    vendor: [
      'axios',
      'element-ui',
      'negotiator',
      'vue-class-component',
      'vuex-class',
      'vue-i18n',
      'vue-chartjs',
      'vue-clipboards',
      'vue-baidu-map',
      'moment',
      'echarts',
      'chart.js',
      '@d2-projects/d2-crud',
      'deepmerge', // vue-chartjs dep
      'vue-quill-editor'
    ],
    extractCSS: true,
    filenames: {
      vendor: 'vendor.[hash:12].js',
      app: 'hare.[chunkhash:12].js',
      css: 'hare.[contenthash:12].css'
    },
    plugins: [
      new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh|en|fr/)
    ]
  },
  /*
  ** Customize the Progress Bar
  */
  loading: {
    color: '#60bbff'
  },
  /*
  ** Generate config
  */
  generate: {
    dir: '.generated'
  },
  /*
  ** Global CSS
  */
  css: [
    'normalize.css/normalize.css',
    'element-ui/lib/theme-chalk/index.css',
    {src: '@/assets/styles/main.scss', lang: 'scss'}
  ],
  /*
  ** Add element-ui in our app, see plugins/element-ui.js file
  */
  plugins: [
    '@/plugins/i18n',
    '@/plugins/element-ui',
    '@/plugins/axios',
    {src: '@/plugins/d2-crud', ssr: false},
    {src: '@/plugins/vue-baidu-map', ssr: false},
    {src: '@/plugins/vue-amap', ssr: false},
    {src: '@/plugins/v-charts', ssr: false},
    {src: '@/plugins/clipboard', ssr: false},
    {src: '@/plugins/error-handler', ssr: false},
    {src: '@/plugins/vue-baidu-map', ssr: false},
    {src: '@/plugins/vue-quill-editor', ssr: false}
  ],
  modules: [
    '@nuxtjs/webpackmonitor'
  ]
}
