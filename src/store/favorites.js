import { Notify } from 'quasar'

export default {
  namespaced: true,
  state: function () {
    return {
      favorites: []
    }
  },
  getters: {

  },
  mutations: {
    SET_DATA(state, data) {
      state.favorites = data
    },
    TOGGLE(state, product) {
      const hasItem = state.favorites.find(p => p.id === product.id)
      if (hasItem) {
        state.favorites = state.favorites.filter(p => p.id !== product.id)
        Notify.create({
          type: 'warning',
          message: 'Removed from favourite',
          position: 'top'
        })
      } else {
        state.favorites.unshift(product)
        Notify.create({
          type: 'positive',
          message: 'Added to favourite',
          position: 'top'
        })
      }

      localStorage.setItem('localfavourite', JSON.stringify(state.favorites))
    }
  },
  actions: {
    loadData({ commit }) {
      const localData = JSON.parse(localStorage.getItem('localfavourite'))
      if (localData) {
        commit('SET_DATA', localData)
      }
    }
  }
}
