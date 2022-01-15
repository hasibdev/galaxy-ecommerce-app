
export default {
  namespaced: true,
  state: {
    products: []
  },
  getters: {
    totalCart(state) {
      return state.products.length
    }
  },
  mutations: {
    SET_DATA(state, { property, data }) {
      state[property] = data
    }
  },
  actions: {
    loadData({ commit }) {
      const localData = JSON.parse(localStorage.getItem('localCart'))
      if (localData) {
        commit('SET_DATA', { property: 'products', data: localData })
      }
    }
  }
}
