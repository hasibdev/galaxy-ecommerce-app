<template>
   <app-layout>
      <template #toolbar>
         <toolbar-one canBack :searchIcon="false">
            <template #middle>
               <p class="text-center text-body1 text-bold q-ml-md">My Favourite</p>
            </template>
         </toolbar-one>
      </template>

      <template v-if="localFavItems.length">
         <div>
            <q-input outlined placeholder="Search your favourite items">
               <template v-slot:prepend>
                  <q-icon name="search" />
               </template>
            </q-input>
         </div>

         <div class="row q-col-gutter-md">
            <div class="col-6 q-mt-lg" v-for="item in localFavItems" :key="item.id">
               <product-card :product="item" />
            </div>
         </div>

      </template>

      <!-- If no favourite -->
      <div v-else class="text-center q-mt-xl">
         <q-icon size="180px" color="grey-7" name="las la-frown" />
         <p class="text-body1">No Favourit Item Found!</p>
      </div>
   </app-layout>
</template>

<script>
import AppLayout from 'layouts/AppLayout.vue'
import { createMetaMixin } from 'quasar'
import ToolbarOne from 'components/toolbars/ToolbarOne.vue'
import ProductCard from 'components/ProductCard'

export default {
   mixins: [createMetaMixin(() => ({ title: 'My Favourit' }))],
   components: {
      AppLayout, ToolbarOne, ProductCard
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
      },
      addCheckout(item) {
         const data = [{ ...item, quantity: 1 }]
         this.$store.commit('checkout/SET_DATA', { property: 'products', data })
         localStorage.setItem('checkout', JSON.stringify(data))
         this.$router.push('/checkout')
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
