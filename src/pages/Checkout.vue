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
         <q-footer id="app_footer" class="bg-white text-grey-9 q-pa-md ">
            <div class="flex justify-between ">
               <p class="text-body1 ">Sub total price</p>
               <h6>{{ getTotalPrice }}</h6>
            </div>

            <div class="flex justify-between items-center q-mt-sm">
               <div>
                  <p class="text-grey-6">Total</p>
                  <p class="text-bold text-body1">{{ getTotalPrice }}</p>
               </div>
               <q-btn rounded unelevated @click="placeOrder" color="primary" class="q-px-xl q-py-sm">Place Order</q-btn>
            </div>

         </q-footer>
      </template>

      <!-- Main Content -->
      <div>
         <q-list>
            <q-item v-for="(item, i) in items" :key="i" tag="label" class="bg-white round-10 q-mt-md">
               <!-- Label -->
               <q-item-section avatar>
                  <q-avatar class="round-10" size="70px">
                     <img :src="item.base_image.path">
                  </q-avatar>
               </q-item-section>
               <q-item-section>
                  <p class="text-body1">{{ item.name }}</p>
                  <q-item-label caption>
                     <!-- <p class="flex items-center" style="margin-top: 5px;">
                        <span class="bg-grey-14 inline-block rounded-borders" style="width:19px; height:19px;"></span>
                        <span class="q-ml-sm inline-block ">Grey</span>
                     </p> -->
                     <p class="text-h6 text-black q-mt-sm text-bold">{{item.formatted_price[0]}}{{ (item.price.inCurrentCurrency.amount * item.quantity).toFixed(2) }}</p>
                  </q-item-label>
                  <!-- Quantity adjust -->
                  <q-item-label>
                     <div class="flex justify-end">
                        <div style="margin-top: -25px;">
                           <q-btn dense unelevated @click="item.quantity !== 1 ? --item.quantity : null" color="grey-3" class="round-10 text-grey-6" icon="remove" />
                           <q-btn outline dense unelevated color="grey-3" class="round-10 q-px-md text-grey-10 q-mx-sm">{{ item.quantity }}</q-btn>
                           <q-btn dense unelevated @click="++item.quantity" color="grey-3" class="round-10 text-grey-6" icon="add" />
                        </div>
                     </div>
                  </q-item-label>
               </q-item-section>
            </q-item>
         </q-list>

         <!-- Shipping Address -->
         <div class="q-mt-lg">
            <div class="flex justify-between items-center">
               <h6>
                  <q-icon name="o_map" color="primary" size="md" />
                  Shipping Address
               </h6>
               <span class="text-primary">Edit</span>
            </div>

            <div v-if="shippingAddress">
               <p class="text-bold text-body1 q-mt-md">{{ shippingAddress.street }}</p>
               <p class="text-grey-7 text-body1 q-mt-sm">{{ shippingAddress.city }}, {{ shippingAddress.country }}</p>
               <p class="text-grey-7 text-body1 q-mt-sm" v-if="user.phone">{{ user.phone }}</p>
               <p class="text-grey-7 text-body1 q-mt-sm" v-else>{{ user.email }}</p>
            </div>
            <div v-else>
               <p class="text-grey-7 text-body1 q-mt-sm">No Address Found!</p>
               <p class="text-grey-7 text-body1 q-mt-sm">Please add you Address</p>
            </div>
         </div>

         <q-separator class="q-my-lg" />

         <!-- Delivery Service -->
         <div class="">
            <div class="flex justify-between items-center">
               <h6>
                  <q-icon name="las la-truck" size="md" class="text-primary q-mr-sm" />
                  Free Shipping
               </h6>
               <!-- <span class="text-primary">Edit</span> -->
            </div>

            <p class="text-bold text-body1 q-mt-md">Delivery Service</p>
            <p class="text-grey-7 text-body1 q-mt-sm">FeedEx Reguler (3-4 days)</p>
            <p class="text-grey-7 text-body1 q-mt-sm">$0.00</p>

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
export default {
   mixins: [createMetaMixin(() => ({ title: 'Checkout' }))],
   components: {
      AppLayout, ToolbarOne
   },
   data() {
      return {
         items: [],
         shippingAddress: null
      }
   },
   computed: {
      ...mapState('checkout', ['products']),
      ...mapState('auth', ['user', 'address']),
      getTotalPrice() {
         const symbol = this.items[0].formatted_price[0]
         const total = this.items.reduce((acc, product) => {
            const t = acc += product.price.inCurrentCurrency.amount * product.quantity
            return t
         }, 0)

         return `${symbol}${total}`
      }
   },
   methods: {
      async placeOrder() {
         try {
            const res = await this.$api.post('/checkout', {
               customer_email: this.user.email,
               billing: this.address,
               shipping: this.address,
               payment_method: 'cod',
               shipping_method: "free_shipping",
               order_note: "Some note",
               terms_and_conditions: true
            })
            console.log(res)
         } catch (error) {
            console.log(error)
         }
      }
   },
   created() {
      //  Load Checkout data
      const localData = localStorage.getItem('checkout')
      this.items = JSON.parse(localData)
      // Load shipping address
      this.shippingAddress = this.address
   }
}
</script>

<style lang="scss" scoped>
</style>
