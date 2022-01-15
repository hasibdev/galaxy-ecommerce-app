<template>
   <app-layout>
      <template v-if="localFavItems.length">
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
               <q-btn no-caps to="/checkout" color="primary" rounded class="flex-1 q-ml-md" label="Buy Now" />
            </div>
         </div>
      </template>

      <!-- If no favourite -->
      <template v-else>
         <p class="text-body1">No Favourit Item Found!</p>
      </template>
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
         const localfavourite = JSON.parse(localStorage.getItem('localfavourite'))
         if (localfavourite && localfavourite.length) {
            this.localFavItems = localfavourite
         }
      },
      removeFavorite(id) {
         this.localFavItems = this.localFavItems.filter(p => p.id !== id)
         this.$q.notify({
            message: 'Removed from Favourite',
            color: 'warning'
         })
      }
   },
   watch: {
      localFavItems(val) {
         localStorage.setItem('localfavourite', JSON.stringify(val))
      }
   }
}
</script>

<style lang="scss" scoped>
</style>
