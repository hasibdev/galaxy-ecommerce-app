import { mapGetters } from "vuex"
import { boot } from 'quasar/wrappers'

export default boot(({ app }) => {
  app.mixin({
    computed: {
      ...mapGetters({
        validationErrors: "validation/validationErrors"
      })
    }

  })
})
