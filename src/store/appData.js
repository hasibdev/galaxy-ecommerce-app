import { api } from 'boot/axios'

export default {
   namespaced: true,
   state: {
      categories: null
   },
   mutations: {
      SET_DATA(state, { property, data }) {
         state[property] = data
      }
   },
   actions: {
      async fetchCategories({ commit }) {
         const res = await api.get('/featured-categories')
         commit('SET_DATA', { property: 'categories', data: res.data.categories })
      }
   }
}
