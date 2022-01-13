<template>
   <app-layout :footer="false">
      <!-- Toolbar -->
      <template #toolbar>
         <toolbar-one canBack>
            <!-- <template #prepend>
               <q-icon @click="$router.back()" name="las la-angle-left" color="primary" size="25px" class="q-pr-sm" />
            </template> -->

            <template #middle>
               <div class="text-center">
                  <q-icon name="las la-search" color="grey-5" class="search-icon q-px-sm" />
                  <input v-model="searchText" @input="onSearch" ref="searchInput" class="search-input" placeholder="Search" type="text">
               </div>
            </template>
            <!-- <template v-if="!searchText" #append>
               <p @click="$router.back()" class="q-pl-md">Cancle</p>
            </template> -->
         </toolbar-one>
      </template>

      <!-- Search Suggestions -->
      <div v-if="!searchText">
         <!-- Recent search -->
         <div>
            <div class="flex justify-between items-center">
               <h6 class="text-bold">Recent Search</h6>
               <!-- <span v-if="recentSearch.length">View All</span> -->
            </div>
            <p v-if="!recentSearch.length">No Recent Search!</p>
            <!-- List -->
            <q-list v-else>
               <q-item v-for="(item, i) in recentSearch" :key="i" v-ripple class="q-my-sm round-10 bg-white" :class="{'custom-shadow': i==0}">
                  <q-item-section avatar @click="$router.push(`/products/${item.slug}`)">
                     <q-avatar rounded color="transparent" text-color="white">
                        <q-img class="rounded-borders" :src="item.base_image.path" />
                     </q-avatar>
                  </q-item-section>

                  <q-item-section @click="$router.push(`/products/${item.slug}`)">
                     <q-item-label>
                        <p class="text-body1 text-bold">{{ item.name }}</p>
                     </q-item-label>
                  </q-item-section>

                  <q-item-section side>
                     <q-icon @click="removeRecentSearch(item.id)" name="las la-times" size="20px" color="grey-10" />
                  </q-item-section>
               </q-item>
            </q-list>
         </div>
         <!-- Popular Search -->
         <div style="height: 30px;"></div>
         <div>
            <div class="flex justify-between items-center">
               <h6 class="text-bold">Popular Search</h6>
               <!-- <span>View All</span> -->
            </div>
            <!-- List -->
            <q-list>
               <q-item v-for="(item, i) in popularSearch" :key="i" class="q-my-sm round-10 bg-white" :class="{'custom-shadow': i==0}">
                  <q-item-section avatar @click="$router.push(`/products/${item.slug}`)">
                     <q-avatar rounded color="transparent" text-color="white">
                        <q-img class="rounded-borders" :src="item.base_image.path" />
                     </q-avatar>
                  </q-item-section>

                  <q-item-section @click="$router.push(`/products/${item.slug}`)">
                     <q-item-label>
                        <p class="text-body1 text-bold">{{ item.name }}</p>
                     </q-item-label>
                  </q-item-section>

                  <q-item-section side @click="removePopularSearch(item.id)">
                     <q-icon name="las la-times" size="20px" color="grey-10" />
                  </q-item-section>
               </q-item>
            </q-list>
         </div>
      </div>

      <!-- Search Results -->
      <div v-else>
         <div class="flex justify-between items-center">
            <p class="text-body1">Best Match
               <q-icon name="las la-angle-down" />
            </p>
            <div>
               <!-- <q-icon name="las la-bars" size="25px" class="text-bold text-grey-8" /> -->
               <q-icon @click="openFilter" name="las la-sliders-h" size="25px" class="text-bold text-grey-8 q-ml-sm" />
            </div>
         </div>

         <!-- Results -->
         <div class="row q-col-gutter-md q-mt-md">
            <template v-if="searchResults && searchResults.length">
               <div class="col-6" v-for="(item, i) in searchResults" :key="i">
                  <product-card @click="onProductItemClick(item)" :name="item.name" :price="item.formatted_price" :star="item.rating_percent" :reviews="item.reviews.length" :image="item.base_image.path" />
               </div>
            </template>
            <!-- Product Card Skeleton -->
            <template v-else>
               <div v-for="item in 4" :key="item" class="col-6">
                  <product-skeleton />
               </div>
            </template>
         </div>

      </div>

   </app-layout>
</template>

<script>
import ProductCard from 'components/ProductCard'
import AppLayout from 'layouts/AppLayout.vue'
import ToolbarOne from 'components/toolbars/ToolbarOne.vue'
import SearchFilter from 'components/modals/SearchFilter.vue'
import ProductSkeleton from 'components/skeletons/ProductCartSkeleton.vue'
import { debounce } from 'quasar'

export default {
   components: {
      AppLayout, ToolbarOne, ProductCard, ProductSkeleton
   },
   data() {
      return {
         searchText: '',
         searchResults: null,
         recentSearch: [],
         popularSearch: []
      }
   },
   mounted() {
      this.$refs.searchInput.focus()
      this.recentSearch = this.$store.getters['appData/getRecentSearch']
      this.popularSearch = this.$store.state.appData.todaysBest
   },
   methods: {
      openFilter() {
         this.$q.dialog({ component: SearchFilter })
      },
      onSearch: debounce(async function () {
         if (!this.searchText) {
            return
         }

         try {
            const res = await this.$api.get(`/products?query=${this.searchText}`)
            this.searchResults = res.data.products.data
         } catch (error) {
            console.log(error)
         }
      }, 300),
      onProductItemClick(item) {
         this.$router.push(`/products/${item.slug}`)

         // Save to local storage
         this.$store.commit('appData/ADD_RECENT_SEARCH', item)
      },
      removeRecentSearch(id) {
         this.recentSearch = this.recentSearch.filter(item => item.id !== id)
         this.$store.commit('appData/REMOVE_RECENT_SEARCH', id)
      },
      removePopularSearch(id) {
         this.popularSearch = this.popularSearch.filter(item => item.id !== id)
      }
   }
}
</script>

<style lang="scss" scoped>
</style>
