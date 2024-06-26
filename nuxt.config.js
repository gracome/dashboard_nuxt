export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  ssr: false,
  target: 'static',
  head: {
    title: 'my-nuxt-app',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Material+Icons'},
      { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css', integrity: 'sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3', crossorigin: 'anonymous' },
      { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/noUiSlider/14.6.4/nouislider.min.css'},
      { rel: 'stylesheet', href: 'https://cdn.datatables.net/buttons/1.6.4/css/buttons.dataTables.min.css'}
    ],
    script: [
      { src: 'https://cdn.jsdelivr.net/npm/@popperjs/core@2.10.2/dist/umd/popper.min.js', integrity: 'sha384-7+zCNj/IqJ95wo16oMtfsKbZ9ccEh31eOz1HGyDuCQ6wgnyJNSYdrPa03rtR1zdB', crossorigin: 'anonymous' },
      { src: 'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js', integrity: 'sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p', crossorigin: 'anonymous' }
  ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/vendor/datatables/css/jquery.dataTables.min.css',
    '@/assets/css/style.css',
    '@/assets/vendor/swiper/css/swiper-bundle.min.css',
    '@/assets/vendor/jvmap/jquery-jvectormap.css',
    '@/assets/vendor/bootstrap-datetimepicker/css/bootstrap-datetimepicker.min.css',
    '@/assets/vendor/dropzone/dist/dropzone.css',
    '@/assets/vendor/nouislider/nouislider.min.css',
    '@/assets/vendor/bootstrap-select/dist/css/bootstrap-select.min.css',
    '@/assets/vendor/clockpicker/css/bootstrap-clockpicker.min.css',
    '@/assets/vendor/jquery-asColorPicker/css/asColorPicker.min.css',
    '@/assets/vendor/bootstrap-material-datetimepicker/css/bootstrap-material-datetimepicker.css',
    '@/assets/vendor/tagify/dist/tagify.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],
  router: {
    base: '/demos/omega/gestion_users_moov_nuxt/',
    extendRoutes(routes, resolve) {
      routes.push({
        name: 'UserDetails',
        path: '/user/:id',
        component: resolve(__dirname, 'pages/UserDetails.vue'),
        
      })
      routes.push({
        name: 'faqDetails',
        path: '/faq/:id',
        component: resolve(__dirname, 'pages/faqDetails.vue'),
        
      })
      routes.push({
        name: 'catalogueGroupeDetails',
        path: '/groupe/:id',
        component: resolve(__dirname, 'pages/catalogueGroupDetails.vue'),
        
      })
      routes.push({
        name: 'storeDetails',
        path: '/store/:id',
        component: resolve(__dirname, 'pages/storeDetails.vue'),
        
      })
      routes.push({
        path: '/:catchAll(.*)',
        component: resolve(__dirname, 'pages/404Page.vue')
      })
    }
  
  },
  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    'cookie-universal-nuxt',
    '@nuxtjs/axios',
    '@nuxtjs/dotenv',
  ],
  script: [
    '@/assets/vendor/global/global.min.js',
    '@/assets/vendor/chart.js/Chart.bundle.min.js',
    '@/assets/vendor/bootstrap-select/dist/js/bootstrap-select.min.js',
    '@/assets/vendor/apexchart/apexchart.js',

    '@/assets/vendor/datatables/js/jquery.dataTables.min.js',
    '@/assets/vendor/datatables/js/dataTables.buttons.min.js',
    '@/assets/js/custom.js',
    '@/assets/js/deznav-init.js',
    '@/assets/vendor/lightgallery/js/lightgallery-all.min.js',
    '@/assets/vendor/jqvmap/js/jquery.vmap.min.js',
    '@/assets/vendor/jqvmap/js/jquery.vmap.world.js',
    '@/assets/vendor/jqvmap/js/jquery.vmap.usa.js',

    '@/assets/js/dashboard/dashboard-1.js',
    '@/assets/vendor/draggable/draggable.js',
    '@/assets/vendor/datatables/js/jquery.dataTables.min.js',
    '@/assets/vendor/datatables/js/dataTables.buttons.min.js',
    '@/assets/vendor/datatables/js/buttons.html5.min.js',
    '@/assets/js/plugins-init/datatables.init.js',
    '@/assets/vendor/dropzone/dist/dropzone.js',
    '@/assets/vendor/datatables/js/jszip.min.js',


    '@/assets/vendor/bootstrap-datetimepicker/js/moment.js',
    '@/assets/vendor/bootstrap-datetimepicker/js/bootstrap-datetimepicker.min.js'

  ],
  generate: {
    dir: 'dist/client'
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
