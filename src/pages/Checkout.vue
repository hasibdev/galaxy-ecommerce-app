<template>
   <app-layout>
      <template #toolbar>
         <toolbar-one backWithText>
            <template #middle>
               <p class="text-center text-body1 text-bold q-mr-xl">Checkout</p>
            </template>
            <template #append>
               <div></div>
            </template>
         </toolbar-one>
      </template>

      <!-- Footer -->
      <template #footer>
         <q-footer v-if="!cartLoadingState" id="app_footer" class="bg-white text-grey-9 q-pa-md ">
            <div class="flex justify-between ">
               <p class="text-body1 ">Sub total price</p>
               <h6>{{ subTotal.formatted }}</h6>
            </div>

            <div class="flex justify-between items-center q-mt-sm">
               <div>
                  <p class="text-grey-6">Total</p>
                  <p class="text-bold text-body1">{{ subTotal.formatted }}</p>
               </div>
               <q-btn rounded unelevated @click="placeOrder" :disable="savingState || !form.terms_and_conditions" :loading="savingState" color="primary" class="q-px-xl q-py-sm">Place Order</q-btn>
            </div>

         </q-footer>

         <q-footer v-else class="bg-white text-grey-9 q-pa-md ">
            <!-- Loading state -->
            <div class="text-center">
               <q-spinner color="grey-14" size="3em" />
            </div>
         </q-footer>
      </template>

      <!-- Main Content -->
      <div>

         <!-- Shipping Address -->
         <div class="q-mt-lg">
            <div class="flex justify-between items-center">
               <h6>
                  <q-icon name="o_map" color="primary" size="md" />
                  Shipping Address
               </h6>
               <span @click="openShipping" class="text-primary">Edit</span>
            </div>

            <p v-if="validationErrors['shipping.country']" class="text-negative text-body1">Shipping Address is required!</p>
            <div v-if="form.shipping">
               <p class="text-bold text-body1 q-mt-md">{{ form.shipping.address_1 }}</p>
               <p class="text-grey-7 text-body1 q-mt-sm">{{ form.shipping.city }} <span v-if="form.shipping.country">, {{ form.shipping.country }}</span></p>
               <p class="text-grey-7 text-body1 q-mt-sm" v-if="user && user.phone">{{ user.phone }}</p>
               <p class="text-grey-7 text-body1 q-mt-sm" v-else>{{ user && user.email }}</p>
            </div>
            <div v-else>
               <p class="text-grey-7 text-body1 q-mt-sm">No Address Found!</p>
               <p class="text-grey-7 text-body1">Please update you Address</p>
            </div>
         </div>

         <div class="q-my-md" style="margin-left: -8px">
            <q-checkbox v-model="sameAsshipping" label="Billing is same as Shipping?" />
         </div>

         <!-- Billing Address -->
         <div class="">
            <div class="flex justify-between items-center">
               <h6>
                  <q-icon name="store" color="primary" size="md" />
                  Billing Address
               </h6>
               <span @click="openBilling" class="text-primary">Edit</span>
            </div>

            <p v-if="validationErrors['billing.address_1']" class="text-negative text-body1">Billing Address is required!</p>
            <div v-if="form.billing">

               <p class="text-bold text-body1 q-mt-md">{{ form.billing.address_1 }}</p>
               <p class="text-grey-7 text-body1 q-mt-sm">{{ form.billing.city }}<span v-if=" form.billing.country">, {{ form.billing.country }}</span></p>
               <p class="text-grey-7 text-body1 q-mt-sm" v-if="user && user.phone">{{ user.phone }}</p>
               <p class="text-grey-7 text-body1 q-mt-sm" v-else>{{ user && user.email }}</p>
            </div>
            <div v-else>
               <p class="text-grey-7 text-body1 q-mt-sm">No Address Found!</p>
               <p class="text-grey-7 text-body1">Please update you Address</p>
            </div>
         </div>

         <q-separator class="q-my-lg" />

         <!-- Delivery Service -->
         <div class="">
            <h6 class="q-mb-md">
               <q-icon name="las la-truck" size="md" class="text-primary q-mr-sm" />
               Shipping Method
            </h6>
            <!-- <span class="text-primary">Edit</span> -->

            <div v-for="(item, i) in availableShippingMethods" :key="i" class="flex justify-between items-center">
               <q-radio dense v-model="form.shipping_method" :val="item.name" :label="item.label" color="orange" />
               <p>{{ item.cost.formatted }}</p>
            </div>

         </div>

         <q-separator class="q-my-lg" />

         <div class="flex justify-between items-center">
            <h6>
               <q-icon name="las la-credit-card" size="md" class="text-primary q-mr-sm" />
               Payment Methods
            </h6>
            <span class="text-primary">Edit</span>
         </div>

         <h6>Cash on delivery</h6>

         <q-separator class="q-my-lg" />

         <!-- Note -->
         <div class="q-mt-lg">
            <h6>
               <q-icon name="description" size="md" class="text-primary q-mr-sm" />
               Order Note
            </h6>
            <q-input outlined color="secondary" v-model="form.order_note" type="textarea" placeholder="Write a note" input-class="text-body1" class="q-my-md" />
         </div>

         <q-checkbox v-model="form.terms_and_conditions" color="primary" label="Do you agree with the terms & conditions?" />

         <q-separator class="q-my-lg" />

      </div>
   </app-layout>
</template>

<script>
import ToolbarOne from 'components/toolbars/ToolbarOne.vue'
import AppLayout from 'layouts/AppLayout.vue'
import { createMetaMixin } from 'quasar'
import { mapState } from 'vuex'
import ShippingAddress from 'components/modals/ShippingAddress.vue'
import BillingAddress from 'components/modals/BillingAddress.vue'
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'

export default {
   mixins: [createMetaMixin(() => ({ title: 'Checkout' }))],
   components: {
      AppLayout, ToolbarOne
   },
   setup: () => ({ v$: useVuelidate() }),
   data() {
      return {
         form: {
            shipping: {
               first_name: "",
               last_name: "",
               address_1: "",
               city: "",
               zip: '',
               country: "",
               state: ""
            },
            billing: {
               first_name: "",
               last_name: "",
               address_1: "",
               city: "",
               zip: '',
               country: "",
               state: ""
            },
            shipping_method: 'free_shipping',
            order_note: "",
            terms_and_conditions: true,
            payment_method: 'cod'
         },
         savingState: false,
         sameAsshipping: false
      }
   },
   computed: {
      ...mapState('auth', ['user', 'address']),
      ...mapState('cart', ['subTotal', 'cartLoadingState', 'availableShippingMethods'])
   },
   methods: {
      async placeOrder() {
         try {
            this.savingState = true
            const res = await this.$api.post('/checkout', {
               customer_email: this.user.email,
               ...this.form
            })
            await this.$api.get(`checkout/${res.data.orderId}/complete?paymentMethod=${this.form.payment_method}`)

            this.$router.replace('/orders')
            this.$store.commit('cart/SET_DATA', { property: 'items', data: [] })

            this.$q.notify({
               type: 'positive',
               message: 'Order Placed Successfully!',
               position: 'top'
            })
         } catch (error) {
            console.log(error)
            this.$q.notify({
               type: 'negative',
               message: 'Order Placed Fail!',
               position: 'top'
            })
         } finally {
            this.savingState = false
         }
      },
      openBilling() {
         this.$q.dialog({
            component: BillingAddress,
            componentProps: {
               data: this.form.billing
            }
         }).onOk((val) => {
            this.form.billing = { ...val }
         })
      },
      openShipping() {
         this.$q.dialog({
            component: ShippingAddress,
            componentProps: {
               data: this.form.shipping
            }
         }).onOk((val) => {
            this.form.shipping = { ...val }
         })
      }
   },
   watch: {
      address: {
         handler: function (val) {
            this.form.shipping = {
               ...this.form.shipping,
               ...val
            }
            this.form.billing = {
               ...this.form.billing,
               ...val
            }
         },
         immediate: true
      },
      user: {
         handler: function (val) {
            if (!val) {
               return
            }
            this.form.shipping = {
               ...this.form.shipping,
               first_name: val.first_name,
               last_name: val.last_name
            }
            this.form.billing = {
               ...this.form.billing,
               first_name: val.first_name,
               last_name: val.last_name
            }
         },
         immediate: true
      },
      sameAsshipping(val) {
         if (val) {
            this.form.billing = { ...this.form.shipping }
         } else {
            console.log('not same')
         }
      }
   },
   validations() {
      return {
         form: {
            shipping: {
               first_name: { required },
               last_name: { required },
               address_1: { required },
               city: { required },
               zip: { required },
               country: { required },
               state: { required }
            },
            billing: {
               first_name: { required },
               last_name: { required },
               address_1: { required },
               city: { required },
               zip: { required },
               country: { required },
               state: { required }
            },
            shipping_method: { required },
            order_note: { required },
            terms_and_conditions: { required },
            payment_method: { required }
         }
      }
   }
}
</script>

<style lang="scss" scoped>
</style>
