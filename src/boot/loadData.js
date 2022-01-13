import { boot } from 'quasar/wrappers'

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ store }) => {
  store.dispatch('auth/checkAuth')
  store.dispatch('appData/fetchHeroSliders')
  store.dispatch('appData/fetchCategories')
  store.dispatch('appData/fetchTodaysBest')
})
