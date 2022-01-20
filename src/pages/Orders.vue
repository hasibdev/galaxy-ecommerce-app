<template>
   <app-layout>
      <template #toolbar>
         <toolbar-one canBack :canMessage="true" :cartIcon="false" :searchIcon="false">
            <template #middle>
               <p class="text-center text-body1 text-bold q-ml-md">My Orders</p>
            </template>
         </toolbar-one>
      </template>

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
      <div v-for="(item, i) in 2" :key="i" class="bg-white custom-shadow round-10 q-pa-sm q-mt-md">
         <div class="flex no-wrap">
            <div>
               <q-avatar size="70px" class="round-10">
                  <img src="https://cdn.quasar.dev/img/boy-avatar.png">
               </q-avatar>
            </div>
            <div class="q-ml-md">
               <div class="flex items-start justify-between no-wrap">
                  <p class="text-body1">Beats 3 Wireless Over‑Ear Headphones</p>
                  <q-badge rounded color="primary" label="Delivered" />
               </div>
               <p class="text-bold">$120</p>

               <div class="flex">
                  <p class="">x 2pcs </p>
                  <p class="flex items-center q-ml-lg">
                     <span class="inline-block ">Color: </span>
                     <span class="bg-grey-6 q-ml-sm inline-block rounded-borders" style="width:15px; height:15px;"></span>
                  </p>

                  <div class="flex no-wrap items-center q-mt-sm">
                     <q-badge rounded outline color="orange" label="Give Feedback" class="q-mr-md" />
                     <q-badge rounded outline color="primary" label="Re-Order" />
                  </div>
               </div>
            </div>
         </div>

      </div>
   </app-layout>
</template>

<script>
import AppLayout from 'layouts/AppLayout.vue'
import ToolbarOne from 'components/toolbars/ToolbarOne.vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { createMetaMixin } from 'quasar'
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
         currentValue: 'shipped'
      }
   },
   async created() {
      try {
         const res = await this.$api.get('/account/orders')
         console.log(res.data.orders)
      } catch (error) {
         console.log(error)
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
