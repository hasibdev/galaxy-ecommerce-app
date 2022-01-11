<template>
   <app-layout>
      <div v-for="(item, i) in localFavItems" :key="i" :class="{'custom-shadow': i==0}" class="bg-white round-10 q-pa-sm q-mt-md">
         <div class="flex no-wrap items-center">
            <div>
               <q-avatar size="70px" class="round-10">
                  <img :src="item.base_image.path">
               </q-avatar>
            </div>
            <div class="q-ml-md">
               <p class="text-body1">{{ item.name }}</p>
               <div class="flex">
                  <q-rating :model-value="item.rating_percent" icon-half="star_half" :max="5" size="13px" color="secondary" />
                  <span class="q-ml-sm" style="font-size: 10px;">{{ item.reviews.length }} Reviews</span>
               </div>

               <p class="text-h6 text-bold q-mt-sm">{{ item.formatted_price }}</p>
            </div>
         </div>

         <div class="flex q-mt-sm">
            <q-btn @click="removeFavorite(item.id)" outline dense color="primary" class="round-10 q-pa-sm" icon="las la-trash" />
            <q-btn no-caps color="primary" rounded class="flex-1 q-ml-md" label="Buy Now" />
         </div>
      </div>
   </app-layout>
</template>

<script>
import AppLayout from 'layouts/AppLayout.vue'
import { createMetaMixin } from 'quasar'
export default {
   mixins: [createMetaMixin(() => ({ title: 'My Favourit' }))],
   components: {
      AppLayout
   },
   data() {
      return {
         localFavItems: []
      }
   },
   created() {
      this.initLocaldata()
   },
   methods: {
      initLocaldata() {
         const localCart = JSON.parse(localStorage.getItem('localCart'))
         if (localCart && localCart.length) {
            this.localFavItems = localCart
         }
      },
      removeFavorite(id) {
         this.localFavItems = this.localFavItems.filter(p => p.id !== id)
      }
   },
   watch: {
      localFavItems(val) {
         localStorage.setItem('localCart', JSON.stringify(val))
      }
   }
}
</script>

<style lang="scss" scoped>
</style>
