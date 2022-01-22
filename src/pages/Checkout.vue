<template>
   <app-layout>
      <template #toolbar>
         <toolbar-one backWithText>
            <template #middle>
               <p class="text-center text-body1 text-bold q-mr-lg">Checkout</p>
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
               <q-btn rounded unelevated @click="placeOrder" color="primary" class="q-px-xl q-py-sm">Place Order</q-btn>
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

            <div v-if="form.shipping">
               <p class="text-bold text-body1 q-mt-md">{{ form.shipping.street }}</p>
               <p class="text-grey-7 text-body1 q-mt-sm">{{ form.shipping.city }} <span v-if="form.shipping.countr">, {{ form.shipping.country }}</span></p>
               <p class="text-grey-7 text-body1 q-mt-sm" v-if="user && user.phone">{{ user.phone }}</p>
               <p class="text-grey-7 text-body1 q-mt-sm" v-else>{{ user && user.email }}</p>
            </div>
            <div v-else>
               <p class="text-grey-7 text-body1 q-mt-sm">No Address Found!</p>
               <p class="text-grey-7 text-body1">Please update you Address</p>
            </div>
         </div>
         <!-- Billing Address -->
         <div class="q-mt-lg">
            <div class="flex justify-between items-center">
               <h6>
                  <q-icon name="store" color="primary" size="md" />
                  Billing Address
               </h6>
               <span @click="openBilling" class="text-primary">Edit</span>
            </div>

            <div v-if="form.billing">
               <p class="text-bold text-body1 q-mt-md">{{ form.billing.street }}</p>
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

export default {
   mixins: [createMetaMixin(() => ({ title: 'Checkout' }))],
   components: {
      AppLayout, ToolbarOne
   },
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
            order_note: "Some note",
            terms_and_conditions: true,
            payment_method: 'cod'
         }
      }
   },
   computed: {
      ...mapState('auth', ['user', 'address']),
      ...mapState('cart', ['subTotal', 'cartLoadingState', 'availableShippingMethods'])
   },
   methods: {
      async placeOrder() {
         try {
            const res = await this.$api.post('/checkout', {
               customer_email: this.user.email,
               ...this.form
            })
            console.log(res)
         } catch (error) {
            console.log(error)
         }
      },
      openBilling() {
         this.$q.dialog({
            component: BillingAddress
         }).onOk(() => {
            console.log('Ok')
         })
      },
      openShipping() {
         this.$q.dialog({
            component: ShippingAddress
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
      }
   }

}
</script>

<style lang="scss" scoped>
</style>
