import { boot } from 'quasar/wrappers'
import { Notify } from 'quasar'
import axios from 'axios'

axios.defaults.withCredentials = true

const api = axios.create({
  baseURL: 'https://galaxytelecom.fr/api'
})

export default boot(({ app, store }) => {
  api.interceptors.request.use(async function (config) {
    store.dispatch('validation/clearErrors')
    // Do something before request is sent
    const token = localStorage.getItem('token')
    config.headers.common.Authorization = `Bearer ${token || ''}`

    return config
  }, function (error) {
    // Do something with request error
    console.log('Axios Request error: ', error)

    return Promise.reject(error)
  })
  api.interceptors.response.use(function (config) {
    return config
  }, async function (err) {
    if (err.response.status === 422) {
      store.dispatch("validation/setErrors", err.response.data.errors)
      Notify.create({
        type: 'negative',
        message: 'Form validation error!',
        position: 'top'
      })
    }
    return Promise.reject(err)
  })

  app.config.globalProperties.$axios = axios
  app.config.globalProperties.$api = api
})

export { api }
