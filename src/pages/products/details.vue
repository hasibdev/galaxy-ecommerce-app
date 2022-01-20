<template>
   <app-layout :footer="false">
      <!-- Toolbar setup -->
      <template #toolbar>
         <toolbar-one backWithText>
            <template #middle>
               <div class="flex justify-center">
                  <logo-image />
               </div>
            </template>
            <template #append>
               <!-- <q-icon color="grey-10" size="22px" name="share" class="q-pa-md" /> -->
               <span class="material-icons-outlined text-h6 q-pa-sm">
                  share
               </span>
            </template>
         </toolbar-one>
      </template>
      <!-- Footer -->
      <template #footer>
         <q-footer class="bg-white text-grey-9">
            <div class="flex justify-between items-center q-px-md q-my-lg">
               <q-btn dense flat @click="addToFavorit(product)" color="red" :icon="alreadyInFavorite ? 'favorite' : 'favorite_border'" class="q-pa-md round-10"></q-btn>
               <q-btn rounded @click="addToCart(product)" color="primary" class="q-px-xl q-py-sm flex-1 q-ml-lg">Add to cart</q-btn>
            </div>
         </q-footer>
      </template>

      <!-- Page Content -->
      <template v-if="product">
         <!-- Products Slider -->
         <div class="products-swiper">
            <swiper :pagination="{clickable: true}" :slides-per-view="1" :mousewheel="true">
               <swiper-slide v-for="(item, i) in product.files" :key="i">
                  <q-img :src="item.path" />
               </swiper-slide>
            </swiper>
         </div>

         <!-- Main Content -->
         <div class="q-mt-lg relative-position">
            <!-- Product details -->
            <h5 class="">{{ product.name }}</h5>
            <!-- Ragings -->
            <div class="flex items-center q-mt-sm">
               <q-rating no-dimming :model-value="product.rating_percent" icon-half="star_half" :max="5" size="18px" color-selected="orange" color-half="orange" color="grey-5" />
               <span style="font-size: 12px;margin-left: 5px;">{{product.rating_percent}} | <span class="text-blue-8">{{ product.reviews.length }} Reviews</span></span>
            </div>

            <h5 class="q-mt-sm text-bold">{{ product.formatted_price }}</h5>

            <!-- <div @click="addToFavorit(product)" class="floating-btn">
               <span :class="{'text-primary': alreadyInFavorite}" class="material-icons-outlined text-h5 q-pa-sm">
                  favorite_border
               </span>
            </div> -->
         </div>

         <div class="flex items-center">
            <!-- Variant -->
            <div class="flex-1">
               <div class="q-mt-md flex">
                  <span class="">Color: </span>
                  <div class="bg-primary q-ml-sm color-box"></div>
                  <div class="bg-secondary q-ml-sm color-box"></div>
                  <div class="bg-warning q-ml-sm color-box"></div>
                  <div class="bg-negative q-ml-sm color-box"></div>
               </div>
            </div>

            <div style="width:10px;"></div>

            <!-- Sold range -->
            <div class="sold-range q-mt-md flex-1">
               <span class="first-range"></span>
               <span class="second-range"></span>
               <span class="content">200 Sold</span>
            </div>
         </div>

         <!-- Description -->
         <div class="q-mt-lg">
            <p class="text-body1" style="font-size:20px;">Description Product</p>
            <p class="text-grey-7" v-html="product.description"> </p>
         </div>
      </template>

      <!-- Loading state -->
      <template v-else>
         <div class="text-center q-mt-xl">
            <q-spinner color="grey-14" size="3em" />
         </div>
      </template>

   </app-layout>
</template>

<script>
import ToolbarOne from 'components/toolbars/ToolbarOne.vue'
import LogoImage from 'components/LogoImage.vue'
import AppLayout from 'layouts/AppLayout.vue'
import { Swiper, SwiperSlide } from 'swiper/vue'

import 'swiper/css'
import "swiper/css/pagination"
export default {
   components: {
      ToolbarOne, AppLayout, Swiper, SwiperSlide, LogoImage
   },
   data() {
      return {
         product: null,
         localFavItems: [],
         localCartItems: []
      }
   },
   computed: {
      alreadyInFavorite() {
         if (this.product) {
            return this.localFavItems.find(p => p.id === this.product.id)
         }
         return false
      }
   },
   async created() {
      this.initLocaldata()

      const resProduct = await this.$api.get(`/products/${this.$route.params.slug}`)
      this.product = resProduct.data.product
   },
   methods: {
      initLocaldata() {
         // local favourite
         const localfavourite = JSON.parse(localStorage.getItem('localfavourite'))
         if (localfavourite && localfavourite.length) {
            this.localFavItems = localfavourite
         }
         // local cart
         const localCart = JSON.parse(localStorage.getItem('localCart'))
         if (localCart && localCart.length) {
            this.localCartItems = localCart
         }
      },
      addToFavorit(product) {
         const hasItem = this.localFavItems.some(p => p.id === product.id)
         if (hasItem) {
            this.localFavItems = this.localFavItems.filter(p => p.id !== product.id)
            this.$q.notify({
               message: 'Removed from Favourite',
               color: 'warning'
            })
         } else {
            this.localFavItems = [...this.localFavItems, product]
            this.$q.notify({
               message: 'Added to Favourite',
               color: 'info'
            })
         }
      },
      async addToCart(product) {
         const hasItem = this.localCartItems.some(p => p.id === product.id)
         if (hasItem) {
            const itemindex = this.localCartItems.findIndex(p => p.id === product.id)
            ++this.localCartItems[itemindex].quantity
            console.log(this.localCartItems)
         } else {
            this.localCartItems = [...this.localCartItems, { ...product, quantity: 1 }]
         }
         this.$q.notify({
            message: 'Added to Cart',
            color: 'info'
         })

         const data = {
            product_id: product.id,
            qty: 1
         }
         try {
            const res = await this.$api.post('cart/items', data)
            console.log(res)
            this.$q.notify({
               message: 'Added to Cart',
               color: 'info'
            })
         } catch (error) {
            console.log(error)
         }
      },
      onBuyNow() {
         this.$router.push('/checkout')
      }
   },
   watch: {
      localCartItems: {
         handler: function (val) {
            localStorage.setItem('localCart', JSON.stringify(val))
            this.$store.dispatch('cart/loadData')
         },
         deep: true
      },
      localFavItems(val) {
         localStorage.setItem('localfavourite', JSON.stringify(val))
      }
   }
}
</script>

<style lang="scss" scoped>
// Floating Favourite Icon
.floating-btn {
   position: absolute;
   top: 8px;
   right: 0;
}
</style>
