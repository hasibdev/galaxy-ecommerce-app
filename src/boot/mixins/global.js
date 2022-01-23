import { boot } from 'quasar/wrappers'

export default boot(({ app }) => {
  app.mixin({
    methods: {
      formatImage(path) {
        return `https://galaxytelecom.fr/storage/media/${path}`
      }
    }
  })
})
