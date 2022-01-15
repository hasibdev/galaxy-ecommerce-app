import { api } from 'boot/axios'

export default {
  namespaced: true,
  state: function () {
    return {
      status: false,
      user: null,
      address: null
    }
  },
  getters: {
    getUser(state) {
      return state.user
    }
  },
  mutations: {
    SET_AUTH(state, data) {
      state.status = data.status
      state.user = data.user
    },
    SET_ADDRESS(state, data) {
      state.address = data
    }
  },
  actions: {
    async checkAuth({ commit }) {
      try {
        const token = localStorage.getItem('token')
        if (!token) return Promise.reject(false)

        const res = await api.get('/account/profile')
        const resAddress = await api.get('/account/address')
        if (resAddress.data.address) {
          commit('SET_ADDRESS', resAddress.data.address)
        }

        commit('SET_AUTH', { status: true, user: res.data.account })
        return Promise.resolve(res)
      } catch (error) {
        console.log(error)
        return Promise.reject(error)
      }
    },
    async login({ commit }, { data, url }) {
      try {
        const res = await api.post(url, data)
        localStorage.setItem('token', res.data.token)

        commit('SET_AUTH', { status: true, user: res.data.user })

        return Promise.resolve(res)
      } catch (error) {
        console.error(error)
        return Promise.reject(error)
      }
    },
    async regester({ commit }, { data, url }) {
      try {
        const res = await api.post(url, data)
        console.log(res)
        localStorage.setItem('token', res.data.token)

        commit('SET_AUTH', { status: true, user: res.data.user })
        return Promise.resolve(res)
      } catch (error) {
        return Promise.reject(error)
      }
    },
    async logout() {
      try {
        const res = await api.post('/logout')
        localStorage.removeItem('token')
        return Promise.resolve(res)
      } catch (error) {
        return Promise.reject(error)
      }
    }
  }
}
