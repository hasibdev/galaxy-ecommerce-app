<template>
   <div>
      <!-- Todays Best -->
      <div class="q-mb-lg flex justify-between">
         <h5>Today's Best</h5>
         <!-- <span>View All</span> -->
      </div>

      <div class="row q-col-gutter-md">
         <!-- Product Card  -->
         <template v-if="todaysBest.length">
            <div class="col-6" v-for="item in todaysBest" :key="item.id">
               <product-card :product="item" />
            </div>
         </template>

         <!-- Product Card Skeleton -->
         <template v-else>
            <div v-for="item in 4" :key="item" class="col-6">
               <product-skeleton />
            </div>
         </template>
      </div>

      <q-separator class="q-my-lg" />
      <!-- Accessories -->
      <div class="q-mb-lg flex justify-between">
         <h5>Accessories</h5>
         <!-- <span>View All</span> -->
      </div>

      <div class="row q-col-gutter-md">
         <!-- Product Card  -->
         <template v-if="accessories.length">
            <div class="col-6" v-for="item in accessories" :key="item.id">
               <product-card :product="item" />
            </div>
         </template>

         <!-- Product Card Skeleton -->
         <template v-else>
            <div v-for="item in 4" :key="item" class="col-6">
               <product-skeleton />
            </div>
         </template>
      </div>

      <q-separator class="q-my-lg" />

      <!-- Today's Best Deal -->
      <!-- <div class="q-mb-lg flex justify-between">
         <h5>Today's Best Deal</h5>
      </div>

      <div class="row q-col-gutter-md">
         <template v-if="todaysBestDeal.length">
            <div class="col-6" v-for="item in todaysBestDeal" :key="item.id">
               <product-card :product="item" />
            </div>
         </template>

         <template v-else>
            <div v-for="item in 4" :key="item" class="col-6">
               <product-skeleton />
            </div>
         </template>
      </div> -->

   </div>
</template>

<script>
import ProductCard from 'components/ProductCard'
import ProductSkeleton from 'components/skeletons/ProductCartSkeleton.vue'
import { mapState } from 'vuex'
export default {
   components: {
      ProductCard, ProductSkeleton
   },
   computed: {
      ...mapState('appData', ['todaysBestDeal', 'todaysBest', 'accessories'])
      // todaysBestDeal() {
      //    return this.$store.state.appData.todaysBestDeal
      // }
   }
}
</script>

<style lang="scss" scoped>
</style>
