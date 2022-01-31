<template>
   <app-layout>
      <template #toolbar>
         <toolbar-one canBack :searchIcon="false">
            <template #middle>
               <p class="text-center text-body1 text-bold q-ml-md">My Favourite</p>
            </template>
         </toolbar-one>
      </template>

      <template v-if="favorites.length">
         <!-- Search -->
         <div>
            <q-input v-model="search" outlined placeholder="Search your favourite items">
               <template v-slot:prepend>
                  <q-icon name="search" />
               </template>
            </q-input>
         </div>

         <div class="row q-col-gutter-md">
            <div class="col-6 q-mt-lg" v-for="item in filteredItems" :key="item.id">
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
import { mapState } from 'vuex'

export default {
   mixins: [createMetaMixin(() => ({ title: 'My Favourit' }))],
   components: {
      AppLayout, ToolbarOne, ProductCard
   },
   data() {
      return {
         filteredItems: [],
         search: ''
      }
   },
   computed: {
      ...mapState('favorites', ['favorites'])
   },
   created() {
      this.filteredItems = this.favorites
   },
   methods: {
   },
   watch: {
      search: {
         handler: function (val) {
            if (!val) {
               this.filteredItems = this.favorites
            }
            this.filteredItems = this.favorites.filter(x => x.name.toLocaleLowerCase().includes(val.toLocaleLowerCase()))
         }
      }
   }
}
</script>

<style lang="scss" scoped>
</style>
