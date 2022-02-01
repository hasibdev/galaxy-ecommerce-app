<template>
   <app-layout :footer="false">
      <!-- Toolbar setup -->
      <template #toolbar>
         <toolbar-one backWithText>
            <template #middle>
               <p class="text-center text-body1 text-bold" style="margin-right: 60px;">Login</p>
            </template>
            <template #append>
               <div></div>
            </template>
         </toolbar-one>
      </template>

      <!-- Main Content -->
      <div class="q-mt-md">
         <div class="text-center">
            <shop-svg />
            <h6 class="text-bold letter-space-1 q-mt-sm">I Web Design</h6>
            <p class="text-subtitle1 text-grey-7">Enter your e-mail account and password.</p>
         </div>

         <form @submit.prevent="formSubmit" class="q-mt-lg">
            <p v-if="errorMessage" class="text-negative q-mb-sm">{{ errorMessage }}</p>
            <q-input outlined color="secondary" v-model="form.email" type="email" placeholder="Email Address" input-class="text-body1" class="q-mt-md" />
            <p v-if="validationErrors.email" class="text-negative">This field is required.</p>

            <q-input outlined color="secondary" v-model="form.password" :type="passwordVisible?`text`:`password`" input-class="text-body1" class="q-mt-md" placeholder="Password">
               <template #append>
                  <q-avatar @click="passwordVisible=!passwordVisible" :icon="passwordVisible?`visibility_off`:`visibility`" font-size="25px"></q-avatar>
               </template>
            </q-input>
            <p v-if="validationErrors.password" class="text-negative">This field is required.</p>

            <div class="flex justify-between q-mt-md">
               <p v-if="false" class="text-negative">Incorect password</p>
               <p class="text-body2 q-ml-auto">Forgot Password?</p>
            </div>

            <q-btn rounded no-caps :disable="savingState" :loading="savingState" type="submit" size="lg" label="Login" color="primary" class="full-width q-mt-lg" />

            <p class="text-grey-6 text-body1 text-center q-my-md">Or</p>
            <q-btn rounded outline no-caps href="https://www.galaxytelecom.fr/api/login/facbook" size="lg" color="grey" class="full-width">
               <facebook-svg />
               <span class="q-ml-md">Continue With FB</span>
            </q-btn>
            <q-btn rounded outline href="https://www.galaxytelecom.fr/api/login/google" no-caps size="lg" color="grey" class="full-width q-mt-md">
               <google-svg />
               <span class="q-ml-md">Continue With Google</span>
            </q-btn>

            <p class="text-body1 q-mt-lg text-center">Don't have an account?
               <q-btn dense flat no-caps to="/signup" label="Sign Up" class="text-bold text-body1" />
            </p>
         </form>
      </div>
   </app-layout>
</template>

<script>
import ToolbarOne from 'components/toolbars/ToolbarOne.vue'
import AppLayout from 'layouts/AppLayout.vue'
import ShopSvg from 'components/svg/ShopSvg.vue'
import { mapActions } from 'vuex'
import FacebookSvg from 'components/svg/Facebook.vue'
import GoogleSvg from 'components/svg/Google.vue'

export default {
   components: {
      ToolbarOne, AppLayout, ShopSvg, FacebookSvg, GoogleSvg
   },
   data() {
      return {
         form: {
            email: '',
            password: ''
         },
         passwordVisible: false,
         savingState: false,
         errorMessage: ''
      }
   },
   methods: {
      ...mapActions('auth', ['login']),
      async formSubmit() {
         this.savingState = true
         this.errorMessage = ''
         try {
            await this.login({ url: '/login', data: this.form })

            this.$q.notify({
               type: 'positive',
               message: 'You are signed in!',
               position: 'top'
            })

            this.$router.replace('/home')
         } catch (error) {
            // console.log({ ...error })
            this.errorMessage = error.response.data.message
         } finally {
            this.savingState = false
         }
      },
      async googleLogin() {
         const res = await fetch('https://www.galaxytelecom.fr/api/login/google')
         console.log(res)
      }
   }
}
</script>

<style lang="scss" scoped>
</style>
