<template>
   <div>
      <div class="q-mb-lg flex justify-between">
         <h5>Today's Best Deal</h5>
         <span>View All</span>
      </div>

      <div class="row q-col-gutter-md">
         <div class="col-6" v-for="item in items" :key="item.id">
            <product-card @click="$router.push(`/products/${item.id}`)" :name="item.name" :price="item.formatted_price" :star="item.rating_percent" :reviews="item.reviews.length" :image="item.base_image.path" />
         </div>
      </div>
   </div>
</template>

<script>
import ProductCard from 'components/ProductCard'
export default {
   components: {
      ProductCard
   },
   data() {
      return {
         items: []
      }
   },
   async created() {
      const res = await this.$api('/storefront/vertical-products/1')
      this.items = res.data
   }
}
</script>

<style lang="scss" scoped>
</style>
