<template>
   <app-layout>
      <!-- Toolbar -->
      <template #toolbar>
         <toolbar-one :canBack="true" :searchIcon="false">
            <template #middle>
               <p class="text-center text-body1 text-bold q-ml-md">Order Details</p>
            </template>
         </toolbar-one>
      </template>

      <!-- Footer -->
      <template #footer>
         <q-footer id="app_footer" class="bg-white text-grey-9">

            <div v-if="order" class="q-pa-md">
               <div class="row">
                  <div class="col-5">
                     <p class="text-body1">Subtotal: </p>
                  </div>
                  <div class="col-7">
                     <p class="text-body1">{{order.sub_total.formatted}}</p>
                  </div>
               </div>
               <div class="row">
                  <div class="col-5">
                     <p class="text-body1">{{order.shipping_method}}: </p>
                  </div>
                  <div class="col-7">
                     <p class="text-body1">{{order.shipping_cost.formatted}}</p>
                  </div>
               </div>
               <div class="row">
                  <div class="col-5">
                     <h6>Total: </h6>
                  </div>
                  <div class="col-7">
                     <h6>{{ order.total.formatted }}</h6>
                  </div>
               </div>
            </div>
         </q-footer>
      </template>

      <div v-if="order">
         <!-- Order Info -->
         <q-card class="custom-shadow">
            <q-card-section>
               <h6>Order Information</h6>

               <!-- Email -->
               <div class="row text-body1 q-mt-sm">
                  <div class="col-4">Email: </div>
                  <div class="col-8">
                     <p class="text-grey">{{ order.customer_email }}</p>
                  </div>
               </div>
               <!-- Date -->
               <div class="row text-body1 q-mt-sm">
                  <div class="col-4">Date: </div>
                  <div class="col-8">
                     <p class="text-grey">{{ formatDate(order.created_at) }}</p>
                  </div>
               </div>
               <div class="row text-body1 q-mt-sm">
                  <!-- Shipping Method -->
                  <div class="col-4">Shipping Method: </div>
                  <div class="col-8">
                     <p class="text-grey">{{ order.shipping_method }}</p>
                  </div>
               </div>
               <div class="row text-body1 q-mt-sm">
                  <!-- Payment Method -->
                  <div class="col-4">Payment Method: </div>
                  <div class="col-8">
                     <p class="text-grey">{{ order.payment_method }}</p>
                  </div>
               </div>
            </q-card-section>
         </q-card>

         <!-- Billing Info -->
         <q-card class="custom-shadow q-mt-md">
            <q-card-section>
               <h6>Billing Address</h6>
               <div class="text-body1 q-mt-sm">
                  <p class="text-grey q-mb-sm">{{ order.billing_first_name }} {{ order.billing_last_name }}</p>
                  <p class="text-grey">{{ order.billing_address_1 }} </p>
                  <p class="text-grey">{{ order.billing_address_2 }} </p>
                  <p class="text-grey">{{ order.billing_city }}, {{ order.billing_country }} {{ order.billing_zip }} </p>
               </div>
            </q-card-section>
         </q-card>
         <!-- Shipping Info -->
         <q-card class="custom-shadow q-mt-md">
            <q-card-section>
               <h6>Shipping Address</h6>
               <div class="text-body1 q-mt-sm">
                  <p class="text-grey q-mb-sm">{{ order.shipping_first_name }} {{ order.shipping_last_name }}</p>
                  <p class="text-grey">{{ order.shipping_address_1 }} </p>
                  <p class="text-grey">{{ order.shipping_address_2 }} </p>
                  <p class="text-grey">{{ order.shipping_city }}, {{ order.shipping_country }} {{ order.shipping_zip }} </p>
               </div>
            </q-card-section>
         </q-card>

         <!-- Products list -->
         <div class="q-mt-lg">
            <h6>Products</h6>
            <q-list>
               <q-item v-for="(item, i) in order.products" :key="i" tag="label" class="bg-white round-10 q-mt-sm">
                  <!-- Label -->
                  <q-item-section>
                     <q-item-label>
                        <p class="text-body1">{{ item.product.name }}</p>
                     </q-item-label>
                     <q-item-label>
                        <p class="text-grey">UNIT PRICE: {{ item.unit_price.formatted }}</p>
                        <p class="text-grey">QUANTITY: {{ item.qty }}</p>
                        <p class="text-grey">LINE TOTAL: {{ item.line_total.formatted }}</p>
                     </q-item-label>
                  </q-item-section>
               </q-item>
            </q-list>
         </div>
      </div>
   </app-layout>
</template>

<script>
import AppLayout from 'layouts/AppLayout.vue'
import ToolbarOne from 'components/toolbars/ToolbarOne.vue'
import { date } from 'quasar'

export default {
   components: {
      AppLayout, ToolbarOne
   },
   data() {
      return {
         order: null
      }
   },
   methods: {
      formatDate(val) {
         return date.formatDate(val, 'MMM DD, YYYY')
      }
   },
   async created() {
      try {
         this.loadingOrders = true
         const res = await this.$api.get(`/account/orders/${this.$route.params.id}`)
         this.order = res.data
         console.log(res.data)
      } catch (error) {
         console.log(error)
      } finally {
         this.loadingOrders = false
      }
   }
}
</script>

<style lang="scss" scoped>
</style>
