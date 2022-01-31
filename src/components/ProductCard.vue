<template>
   <div>
      <q-card class="custom-shadow round-15 overflow-hidden">
         <q-img @click="$router.push(`/products/${product.slug}`)" :src="product.base_image.path" />
         <q-btn fab unelevated flat dense fab-mini @click="addToFavorit(product)" :icon="getFavIcon" color="red" class="absolute" style="top:0; right:0;" />
      </q-card>

      <!-- Product info -->
      <div @click="$router.push(`/products/${product.slug}`)" class="q-mt-lg text-center">
         <p style="font-size:15px;" class="ellipsis-2-lines">{{ product.name }}</p>

         <!-- Ragings -->
         <div class="flex justify-center q-mt-sm">
            <q-rating no-dimming :model-value="product.rating_percent" icon-half="star_half" :max="5" size="14px" color-selected="orange" color-half="orange" color="grey-5" />
            <span style="font-size: 10px;margin-left: 5px;">{{product.rating_percent}} | <span class="text-blue-8">{{ product.reviews.length }} Reviews</span></span>
         </div>

         <p class="text-h6 text-bold q-mt-sm">{{ product.formatted_price }}</p>
      </div>
   </div>
</template>

<script>
import { mapState } from 'vuex'
export default {

   props: {
      product: {
         type: Object,
         required: true
      }
   },
   computed: {
      ...mapState('favorites', ['favorites']),
      getFavIcon() {
         return this.favorites.find(p => p.id === this.product.id) ? 'favorite' : 'favorite_border'
      }
   },
   methods: {
      async addToFavorit(product) {
         this.$store.commit('favorites/TOGGLE', product)
      }
   }
}
</script>

<style lang="scss" scoped>
</style>
