<template>
   <app-layout>
      <template #toolbar>
         <toolbar-one canBack>
            <template #middle>
               <p class="text-center text-body1 text-bold q-ml-md">My Orders</p>
            </template>
         </toolbar-one>
      </template>

      <!-- Loading state -->
      <template v-if="loadingOrders">
         <div class="text-center q-mt-xl">
            <q-spinner color="grey-14" size="3em" />
         </div>
      </template>

      <div v-if="!loadingOrders && orders.length">
         <!-- main Content -->
         <!-- Slider -->
         <div id="orders_category_slider">
            <swiper :slides-per-view="3" :freeMode="true" :mousewheel="true" :space-between="5">
               <swiper-slide v-for="(item, i) in items" :key="i">
                  <p class="text-item" @click="currentValue=item.value" :class="{active: currentValue==item.value}">{{ item.title }}</p>
               </swiper-slide>
            </swiper>
         </div>

         <!-- Content list -->
         <div v-for="(order, i) in orders" :key="i" @click="$router.push(`/orders/${order.id}`)" class="bg-white custom-shadow round-10 q-pa-sm q-mt-md flex justify-between no-wrap items-center">
            <div class="flex-1 q-pl-sm">
               <div class="flex justify-between items-center full-width">
                  <h6>Order ID #{{ order.id }}</h6>
                  <q-badge rounded :color="getColor(order.status)" :label="order.status" />
               </div>
               <div class="flex justify-between items-end q-mt-sm">
                  <p class="text-body1 text-bold text-grey-14">Total: {{ order.total.formatted }}</p>
                  <p class="text-grey text-body2">{{ formatDate(order.created_at) }}</p>
               </div>
            </div>
            <div class="q-ml-sm">
               <q-icon size="20px" color="grey-7" name="navigate_next" />
            </div>
         </div>
      </div>

      <div v-if="!loadingOrders && !orders.length" class="text-center q-mt-xl">
         <q-icon size="180px" color="grey-7" name="las la-frown" />
         <p class="text-body1">No Order Item Found!</p>
      </div>
   </app-layout>
</template>

<script>
import AppLayout from 'layouts/AppLayout.vue'
import ToolbarOne from 'components/toolbars/ToolbarOne.vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { createMetaMixin, date } from 'quasar'

export default {
   components: {
      AppLayout, ToolbarOne, Swiper, SwiperSlide
   },
   mixins: [createMetaMixin(() => ({ title: "My Orders" }))],
   data() {
      return {
         items: [
            { title: "To Ship", value: 'shipped' },
            { title: "To Deliver", value: 'delivered' },
            { title: "Cancled", value: 'cancled' }
         ],
         orders: [],
         currentValue: 'shipped',
         loadingOrders: false
      }
   },
   methods: {
      getColor(val) {
         const colors = {
            pending: 'primary',
            pending_payment: 'orange'
         }
         return colors[val]
      },
      formatDate(val) {
         return date.formatDate(val, 'MMM DD, YYYY')
      }
   },
   async created() {
      try {
         this.loadingOrders = true
         const res = await this.$api.get('/account/orders')
         this.orders = res.data.orders.data
         console.log(res.data.orders)
      } catch (error) {
         console.log(error)
      } finally {
         this.loadingOrders = false
      }
   }
}
</script>

<style lang="scss" scoped>
#orders_category_slider {
   .text-item {
      text-align: center;
      padding: 5px 10px;
      border-bottom: 2px solid transparent;
      // border-radius: 18px;
      transition: all 0.2s ease-in-out;
      &.active {
         color: $primary;
         border-color: $primary;
         font-weight: 500;
      }
   }
}
</style>
