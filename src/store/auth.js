import { api } from 'boot/axios'

export default {
   namespaced: true,
   state: function () {
      return {
         status: false,
         user: null
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
      }
   },
   actions: {
      async checkAuth({ commit }) {
         try {
            const token = localStorage.getItem('token')
            if (!token) return Promise.reject(false)

            const res = await api.get('/account/profile')
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
            commit('SET_AUTH', { status: true, user: res.data.user })
            return Promise.resolve(res)
         } catch (error) {
            return Promise.reject(error)
         }
      },
      async logout() {
         try {
            const res = await api.post('/logout')
            return Promise.resolve(res)
         } catch (error) {
            return Promise.reject(error)
         }
      }
   }
}
