<template>
   <q-dialog v-model="visible" @hide="onDialogHide">
      <q-card class="q-dialog-plugin q-pa-md">
         <p class="text-body1 text-bold">You are not logged in!</p>

         <p class="text-body1 q-my-md">
            Please <router-link to="/signin" class="text-primary">Signin</router-link> with your credentials or <router-link to="/signup" class="text-primary">Create new account</router-link>.
         </p>

         <div class="flex justify-end">
            <q-btn label="Signin" color="primary" @click="handleRoute('signin')" class="q-mr-sm" />
            <q-btn label="Signup" color="grey" @click="handleRoute('signup')" />
         </div>
      </q-card>
   </q-dialog>
</template>

<script>
import { mapState } from 'vuex'
export default {
   components: {
   },
   emits: [
      // REQUIRED
      'ok', 'hide'
   ],
   data() {
      return {
         visible: false
      }
   },
   computed: {
      ...mapState('layout', ['showAuthModal'])
   },

   methods: {

      // following method is REQUIRED
      // (don't change its name --> "show")
      show() {
         this.$refs.dialog.show()
      },

      // following method is REQUIRED
      // (don't change its name --> "hide")
      hide() {
         this.$refs.dialog.hide()
      },

      onDialogHide() {
         // required to be emitted
         // when QDialog emits "hide" event
         //  this.$store.dispatch('layout/hide')
         this.$emit('hide')
      },

      handleRoute(path) {
         this.$store.dispatch('layout/hide')
         this.$router.push(path)
      }

   },
   watch: {
      showAuthModal: {
         handler: function (val) {
            if (val) {
               this.visible = true
            } else {
               this.visible = false
            }
         },
         immediate: true
      },
      visible(val) {
         if (!val) {
            this.$store.dispatch('layout/hide')
         }
      }
   }

}
</script>
