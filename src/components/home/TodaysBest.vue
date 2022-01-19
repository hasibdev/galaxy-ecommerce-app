<template>
   <div>
      <div class="q-mb-lg flex justify-between">
         <h5>Today's Best Deal</h5>
         <span>View All</span>
      </div>

      <div class="row q-col-gutter-md">
         <!-- Product Card  -->
         <template v-if="items.length">
            <div class="col-6" v-for="item in items" :key="item.id">
               <product-card @click="$router.push(`/products/${item.slug}`)" :product="item" />
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
</template>

<script>
import ProductCard from 'components/ProductCard'
import ProductSkeleton from 'components/skeletons/ProductCartSkeleton.vue'
export default {
   components: {
      ProductCard, ProductSkeleton
   },
   computed: {
      items() {
         return this.$store.state.appData.todaysBest
      }
   }
}
</script>

<style lang="scss" scoped>
</style>
