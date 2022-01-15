
export default {
  namespaced: true,
  state: {
    products: []
  },

  mutations: {
    SET_DATA(state, { property, data }) {
      state[property] = data
    }
  }
}
