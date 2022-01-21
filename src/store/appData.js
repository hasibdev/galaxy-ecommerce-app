import { api } from 'boot/axios'

export default {
  namespaced: true,
  state: {
    categories: null,
    heroSliders: [],
    todaysBest: []
  },
  getters: {
    getRecentSearch() {
      const localData = JSON.parse(localStorage.getItem('recentSearch'))

      return localData ? localData.slice(0, 4) : []
    }
  },
  mutations: {
    SET_DATA(state, { property, data }) {
      state[property] = data
    },
    ADD_RECENT_SEARCH(state, item) {
      const localData = JSON.parse(localStorage.getItem('recentSearch'))
      if (localData) {
        const newData = [item, ...localData]
        localStorage.setItem('recentSearch', JSON.stringify(newData))
      } else {
        localStorage.setItem('recentSearch', JSON.stringify([item]))
      }
    },
    REMOVE_RECENT_SEARCH(state, id) {
      const localData = JSON.parse(localStorage.getItem('recentSearch'))
      const newData = localData.filter(item => item.id !== id)
      localStorage.setItem('recentSearch', JSON.stringify(newData))
    }
  },
  actions: {
    async fetchCategories({ commit }) {
      try {
        const res = await api.get('/featured-categories')
        commit('SET_DATA', { property: 'categories', data: res.data.categories })
      } catch (error) {
        console.log(error)
      }
    },
    async fetchHeroSliders({ commit }) {
      try {
        const res = await api.get('/sliders')
        commit('SET_DATA', { property: 'heroSliders', data: res.data.slides })
      } catch (error) {
        console.log(error)
      }
    },
    async fetchTodaysBest({ commit }) {
      try {
        const res = await api.get('/storefront/vertical-products/1')
        commit('SET_DATA', { property: 'todaysBest', data: res.data })
      } catch (error) {
        console.log(error)
      }
    }
  }
}
