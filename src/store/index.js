import { store } from 'quasar/wrappers'
import { createStore } from 'vuex'
import appData from './appData'
import auth from './auth'
import cart from './cart'
import layout from './layout'
import validation from './validation'
import favorites from './favorites'

export default store(function (/* { ssrContext } */) {
  const Store = createStore({
    modules: {
      appData,
      auth,
      cart,
      layout,
      validation,
      favorites
    },

    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: process.env.DEBUGGING
  })

  return Store
})
