<template>
   <app-layout>
      <template #toolbar>
         <toolbar-one canMessage>
            <template #prepend>
               <back-btn />
            </template>
            <template #middle>
               <p class="text-center text-body1 text-bold q-mr-xl">Update Profile</p>
            </template>
            <template #append>
               <div></div>
            </template>
         </toolbar-one>
      </template>

      <div>
         <form @submit.prevent="updateProfile" class="q-mt-lg">
            <div class="q-mb-md flex justify-center">
               <image-atach-field v-model="form.image" />
            </div>
            <!-- First and Last Name -->
            <div class="row q-col-gutter-sm">
               <div class="col">
                  <q-input outlined color="secondary" v-model="form.first_name" type="text" placeholder="First Name" input-class="text-body1" class="q-mb-md" />
               </div>
               <div class="col">
                  <q-input outlined color="secondary" v-model="form.last_name" type="text" placeholder="Last Name" input-class="text-body1" class="q-mb-md" />
               </div>
            </div>
            <!-- Mobile -->
            <div class="row q-col-gutter-sm">
               <!-- <div class="col-3">
                  <q-select outlined v-model="countryCode" :options="mobileOptions" class="small-select-box" dropdown-icon="expand_more" />
               </div> -->
               <div class="col">
                  <q-input outlined color="secondary" v-model="form.phone" type="tel" placeholder="Mobile Number" input-class="text-body1" class="q-mb-md" />
               </div>
            </div>

            <!-- Email -->
            <q-input outlined color="secondary" disable v-model="form.email" type="email" placeholder="Email Address" input-class="text-body1" class="q-mb-md" />
            <!-- Password -->
            <q-input outlined color="secondary" v-model="form.password" :type="passwordVisible?`text`:`password`" input-class="text-body1" placeholder="Password" class="q-mb-md">
               <template #append>
                  <q-avatar @click="passwordVisible=!passwordVisible" :icon="passwordVisible?`visibility_off`:`visibility`" font-size="25px"></q-avatar>
               </template>
            </q-input>
            <!-- Confirm Password -->
            <q-input outlined color="secondary" v-model="form.password_confirmation" type="password" input-class="text-body1" placeholder="Confirm Password"></q-input>

            <div class="flex justify-end">
               <q-btn type="submit" :loading="savingState" :disable="savingState" color="primary" rounded label="Update Profile" class="q-mt-md" />
            </div>
         </form>

         <form @submit.prevent="updateAddress">
            <h6 class="q-my-md">Update Address</h6>
            <q-input outlined color="secondary" v-model="addressForm.address_1" type="text" placeholder="Address 1" input-class="text-body1" class="q-mb-md" />
            <q-input outlined color="secondary" v-model="addressForm.address_2" type="text" placeholder="Address 2" input-class="text-body1" class="q-mb-md" />
            <q-input outlined color="secondary" v-model="addressForm.city" type="text" placeholder="City" input-class="text-body1" class="q-mb-md" />
            <q-input outlined color="secondary" v-model="addressForm.country" type="text" placeholder="Country" input-class="text-body1" class="q-mb-md" />
            <q-input outlined color="secondary" v-model="addressForm.state" type="text" placeholder="State" input-class="text-body1" class="q-mb-md" />
            <q-input outlined color="secondary" v-model="addressForm.zip" type="text" placeholder="Zip Code" input-class="text-body1" class="q-mb-md" />

            <div class="flex justify-end">
               <q-btn :loading="savingState2" :disable="savingState2" type="submit" color="primary" rounded label="Update Address" />
            </div>
         </form>

         <div class="q-my-xl"></div>
      </div>
   </app-layout>
</template>

<script>
import AppLayout from 'layouts/AppLayout.vue'
import ToolbarOne from 'components/toolbars/ToolbarOne.vue'
import BackBtn from 'components/buttons/BackBtn.vue'
import ImageAtachField from 'components/form/ImageAtachField.vue'
import { mapState } from 'vuex'
export default {
   components: {
      AppLayout, ToolbarOne, BackBtn, ImageAtachField
   },
   data() {
      return {
         form: {
            image: '',
            first_name: '',
            last_name: '',
            phone: '',
            email: '',
            password: '',
            password_confirmation: ''
         },
         addressForm: {
            address_1: '',
            address_2: '',
            city: '',
            state: '',
            country: '',
            zip: ''
         },
         countryCode: '+880',
         mobileOptions: ['+880', '+650', '+84'],
         passwordVisible: false,
         savingState: false,
         savingState2: false
      }
   },
   computed: {
      ...mapState('auth', ['user', 'address'])
   },
   methods: {
      async updateProfile() {
         this.savingState = true
         try {
            const res = await this.$api.post('/account/profile', this.form)
            console.log(res)
            this.$q.notify({
               type: 'positive',
               message: 'Profile updated successfully!'
            })
         } catch (error) {
            console.log(error)
            this.$q.notify({
               type: 'negative',
               message: 'Request Fail!'
            })
         } finally {
            this.savingState = false
         }
      },
      async updateAddress() {
         this.savingState2 = true
         try {
            const res = await this.$api.post('account/address', this.addressForm)
            this.$store.commit('auth/SET_ADDRESS', res.data)
            this.$q.notify({
               type: 'positive',
               message: 'Address updated successfully!'
            })
         } catch (error) {
            console.log(error)
            this.$q.notify({
               type: 'negative',
               message: 'Request Fail!'
            })
         } finally {
            this.savingState2 = false
         }
      }
   },
   watch: {
      user: {
         handler: function (val) {
            this.form = { ...this.form, ...val }
         },
         immediate: true
      },
      address: {
         handler: function (val) {
            if (val) this.addressForm = val
         },
         immediate: true
      }
   }
}
</script>

<style lang="scss" scoped>
</style>
