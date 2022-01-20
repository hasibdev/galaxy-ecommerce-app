import { boot } from 'quasar/wrappers'
import axios from 'axios'

const api = axios.create({
  baseURL: 'https://galaxytelecom.fr/api'
  // withCredentials: true
})

api.interceptors.request.use(async function (config) {
  // Do something before request is sent
  const token = localStorage.getItem('token')
  config.headers.common.Authorization = `Bearer ${token || ''}`
  // config.headers.common['Access-Control-Allow-Origin'] = '*'

  return config
}, function (error) {
  // Do something with request error
  console.log('Axios Request error: ', error)

  return Promise.reject(error)
})

export default boot(({ app }) => {
  app.config.globalProperties.$axios = axios

  app.config.globalProperties.$api = api
})

export { api }
