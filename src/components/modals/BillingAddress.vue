<template>
   <q-dialog position="bottom" ref="dialog" @hide="onDialogHide">
      <q-card class="q-dialog-plugin q-pa-md">
         <div class="flex justify-between items-center q-mb-xl">
            <h6>Billing Address</h6>
            <q-icon @click="hide" name="expand_more" size="md" color="grey-10" />
         </div>

         <q-input outlined color="secondary" v-model="addressForm.first_name" type="text" placeholder="First Name" input-class="text-body1" class="q-mb-md" />
         <q-input outlined color="secondary" v-model="addressForm.last_name" type="text" placeholder="Last Name" input-class="text-body1" class="q-mb-md" />
         <q-input outlined color="secondary" v-model="addressForm.address_1" type="text" placeholder="Street" input-class="text-body1" class="q-mb-md" />
         <q-input outlined color="secondary" v-model="addressForm.city" type="text" placeholder="City" input-class="text-body1" class="q-mb-md" />
         <q-select outlined emit-value map-options v-model="addressForm.country" option-value="key" option-label="name" input-debounce="0" label="Select country" :options="countries" behavior="menu" class="q-mb-md"></q-select>
         <q-input outlined color="secondary" v-model="addressForm.state" type="text" placeholder="State" input-class="text-body1" class="q-mb-md" />
         <q-input outlined color="secondary" v-model="addressForm.zip" type="text" placeholder="Zip Code" input-class="text-body1" class="q-mb-md" />

         <div class="flex justify-end">
            <q-btn @click="updateAddress" color="primary" rounded label="Update Address" />
         </div>

      </q-card>
   </q-dialog>
</template>

<script>
import { mapState } from 'vuex'

export default {
   components: {
   },
   props: {
      // ...your custom props
      data: {
         type: Object
      }
   },

   emits: [
      // REQUIRED
      'ok', 'hide'
   ],

   computed: {
      ...mapState('appData', ['countries'])
   },

   data() {
      return {
         addressForm: {
            first_name: "",
            last_name: "",
            address_1: '',
            city: '',
            state: '',
            country: '',
            zip: ''
         }
      }
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
         this.$emit('hide')
      },
      updateAddress() {
         this.$emit('ok', this.addressForm)
         this.hide()
      }
   },
   created() {
      this.$store.dispatch('appData/fetchCountries')
      this.addressForm = { ...this.data }
   }
}
</script>
