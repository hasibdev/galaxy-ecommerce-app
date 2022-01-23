export default {
  namespaced: true,
  state: () => ({
    validationErrors: {}
  }),
  getters: {
    validationErrors(state) {
      return state.validationErrors
    }
  },

  mutations: {
    SET_VALIDATION_ERRORS(state, validationErrors) {
      state.validationErrors = validationErrors
    }
  },

  actions: {
    setErrors({ commit }, validationErrors) {
      commit("SET_VALIDATION_ERRORS", validationErrors)
    },
    clearErrors({ commit }) {
      commit("SET_VALIDATION_ERRORS", {})
    }
  }

}
