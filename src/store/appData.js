import { api } from 'boot/axios'

export default {
   namespaced: true,
   state: {
      categories: null
   },
   actions: {
      async fetchCategories(state) {
         const res = await api.get('/featured-categories')
         state.categories = res.data.categories
      }
   }
}
