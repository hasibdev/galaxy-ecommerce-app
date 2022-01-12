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
      regester() {
         console.log('register')
      }
   }
}
