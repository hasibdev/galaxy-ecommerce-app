<template>
   <div>
      <q-card class="custom-shadow round-15 overflow-hidden">
         <q-img @click="$router.push(`/products/${product.slug}`)" :src="product.base_image.path" />
         <q-btn fab unelevated flat dense fab-mini @click="addToFavorit(product)" :icon="getFavIcon" color="red" class="absolute" style="top:0; right:0;" />
      </q-card>

      <!-- Product info -->
      <div @click="$router.push(`/products/${product.slug}`)" class="q-mt-lg text-center">
         <p style="font-size:15px;">{{ product.name }}</p>

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
export default {
   data() {
      return {
         localFavItems: []
      }
   },
   props: {
      product: {
         type: Object,
         required: true
      }
   },
   computed: {
      getFavIcon() {
         return this.localFavItems.map(x => x.id).includes(this.product.id) ? 'favorite' : 'favorite_border'
      }
   },
   methods: {
      addToFavorit(product) {
         const hasItem = this.localFavItems.some(p => p.id === product.id)
         if (hasItem) {
            this.localFavItems = this.localFavItems.filter(p => p.id !== product.id)
            this.$q.notify({
               message: 'Removed from Favourite',
               color: 'warning',
               position: 'top'
            })
         } else {
            this.localFavItems = [...this.localFavItems, product]
            this.$q.notify({
               message: 'Added to Favourite',
               color: 'positive',
               position: 'top'
            })
         }
      }
   },
   created() {
      const localfavourite = JSON.parse(localStorage.getItem('localfavourite'))
      if (localfavourite && localfavourite.length) {
         this.localFavItems = localfavourite
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
