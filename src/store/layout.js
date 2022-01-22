// import { api } from 'boot/axios'

export default {
  namespaced: true,
  state: {
    showAuthModal: false
  },
  getters: {},
  mutations: {
    SET_STATE(state, { property, data }) {
      state[property] = data
    }
  },
  actions: {
    show({ commit }) {
      commit('SET_STATE', { property: 'showAuthModal', data: true })
    },
    hide({ commit }) {
      commit('SET_STATE', { property: 'showAuthModal', data: false })
    }
  }
}
