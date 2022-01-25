<template>
   <app-layout :footer="false">
      <!-- Toolbar setup -->
      <template #toolbar>
         <toolbar-one backWithText>
            <template #middle>
               <p class="text-center text-body1 text-bold" style="margin-right: 60px;">Create an Account</p>
            </template>
            <template #append>
               <div></div>
            </template>
         </toolbar-one>
      </template>

      <!-- Main Content -->
      <div class="q-mt-md">
         <form @submit.prevent="formSubmit" class="q-mt-lg">
            <!-- First and Last Name -->
            <div class="row q-col-gutter-sm">
               <div class="col">
                  <q-input outlined color="secondary" v-model="form.first_name" type="text" placeholder="First Name" input-class="text-body1" class="q-mt-md" />
                  <p v-if="validationErrors.first_name" class="text-negative">This field is required.</p>
               </div>
               <div class="col">
                  <q-input outlined color="secondary" v-model="form.last_name" type="text" placeholder="Last Name" input-class="text-body1" class="q-mt-md" />
                  <p v-if="validationErrors.last_name" class="text-negative">This field is required.</p>
               </div>
            </div>
            <!-- Mobile -->
            <div class="row q-col-gutter-sm">
               <!-- <div class="col-3">
                  <q-select outlined v-model="countryCode" :options="mobileOptions" class="small-select-box" dropdown-icon="expand_more" />
               </div> -->
               <div class="col">
                  <q-input outlined color="secondary" v-model="form.phone" type="tel" placeholder="Mobile Number" input-class="text-body1" class="q-mt-md" />
                  <p v-if="validationErrors.phone" class="text-negative">This field is required.</p>
               </div>
            </div>

            <!-- Email -->
            <q-input outlined color="secondary" v-model="form.email" type="email" placeholder="Email Address" input-class="text-body1" class="q-mt-md" />
            <p v-if="validationErrors.email" class="text-negative">This field is required.</p>
            <!-- Password -->
            <q-input outlined color="secondary" v-model="form.password" :type="passwordVisible?`text`:`password`" input-class="text-body1" placeholder="Password" class="q-mt-md">
               <template #append>
                  <q-avatar @click="passwordVisible=!passwordVisible" :icon="passwordVisible?`visibility_off`:`visibility`" font-size="25px"></q-avatar>
               </template>
            </q-input>
            <p v-if="validationErrors.password" class="text-negative">This field is required.</p>
            <!-- Confirm Password -->
            <q-input outlined color="secondary" v-model="form.password_confirmation" type="password" input-class="text-body1" placeholder="Confirm Password" class="q-mt-md"></q-input>
            <p v-if="validationErrors.password_confirmation" class="text-negative">This field is required.</p>

            <div class="flex justify-between q-mt-md">
               <p v-if="false" class="text-negative">Incorect password</p>
               <p class="text-body2 q-ml-auto">Forgot Password?</p>
            </div>

            <p class="text-grey-5 q-mt-md">By signing up for a Elektra account you are agreeing to our community Terms of service and privacy policy.</p>

            <q-btn rounded no-caps :loading="savingState" :disable="savingState" size="lg" type="submit" label="Sign Up" color="primary" class="full-width q-mt-lg" />
            <p class="text-grey-6 text-body1 text-center q-my-md">Or Sign up with</p>
            <q-btn rounded outline no-caps size="lg" color="grey" class="full-width">
               <facebook-svg />
               <span class="q-ml-md">Continue With FB</span>
            </q-btn>
            <q-btn rounded outline no-caps size="lg" color="grey" class="full-width q-mt-md">
               <google-svg />
               <span class="q-ml-md">Continue With Google</span>
            </q-btn>

            <p class="text-body1 q-mt-lg text-center">Already have an account?
               <q-btn dense flat no-caps to="/signin" label="Log In" class="text-bold text-body1" />
            </p>
         </form>
      </div>
   </app-layout>
</template>

<script>
import ToolbarOne from 'components/toolbars/ToolbarOne.vue'
import AppLayout from 'layouts/AppLayout.vue'
import { mapActions } from 'vuex'
import FacebookSvg from 'components/svg/Facebook.vue'
import GoogleSvg from 'components/svg/Google.vue'

export default {
   components: {
      ToolbarOne, AppLayout, FacebookSvg, GoogleSvg
   },
   data() {
      return {
         form: {
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            password_confirmation: "",
            phone: ""
         },
         countryCode: '+880',
         passwordVisible: false,
         mobileOptions: ['+880', '+650', '+84'],
         savingState: false
      }
   },
   methods: {
      ...mapActions('auth', ['regester']),
      async formSubmit() {
         this.savingState = true
         try {
            await this.regester({
               url: '/register',
               data: { ...this.form }
            })

            this.$q.notify({
               type: 'blue',
               message: 'Your account created successfully!',
               position: 'top'
            })

            this.$router.replace('/home')
         } catch (error) {
            console.log(error)
         } finally {
            this.savingState = false
         }
      }
   }
}
</script>

<style lang="scss">
.small-select-box {
   .q-field__append.q-field__marginal {
      padding-left: 0px !important;
   }
   .q-field__control {
      padding: 0 7px !important;
   }
}
</style>
