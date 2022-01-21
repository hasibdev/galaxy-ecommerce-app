import { api } from 'boot/axios'

export default {
  namespaced: true,
  state: {
    items: [],
    quantity: 0,
    shippingCost: {},
    subTotal: {},
    taxes: [],
    total: {},
    availableShippingMethods: [],
    coupon: {},
    cartLoadingState: false
  },
  getters: {
    totalCart(state) {
      return state.items.length
    }
  },
  mutations: {
    SET_DATA(state, { property, data }) {
      state[property] = data
    },
    SET_ITEMS(state, data) {
      const items = Object.keys(data).map(key => ({ ...data[key] }))
      state.items = items
    }
  },
  actions: {
    async loadData({ commit }) {
      try {
        commit('SET_DATA', { property: 'cartLoadingState', data: true })

        const res = await api.get('/cart')

        const asm = res.data.availableShippingMethods
        const shippingMethods = Object.keys(asm).map(key => ({ ...asm[key] }))

        commit('SET_ITEMS', res.data.items)
        commit('SET_DATA', { property: 'quantity', data: res.data.quantity })
        commit('SET_DATA', { property: 'shippingCost', data: res.data.shippingCost })
        commit('SET_DATA', { property: 'subTotal', data: res.data.subTotal })
        commit('SET_DATA', { property: 'taxes', data: res.data.taxes })
        commit('SET_DATA', { property: 'availableShippingMethods', data: shippingMethods })
        commit('SET_DATA', { property: 'coupon', data: res.data.coupon })
      } catch (error) {
        console.log(error)
      } finally {
        commit('SET_DATA', { property: 'cartLoadingState', data: false })
      }
    }
  }
}
