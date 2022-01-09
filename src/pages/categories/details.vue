<template>
   <app-layout>
      <template #toolbar>
         <toolbar-one backWithText>
            <template #middle>
               <p class="text-center text-body1">Electronics</p>
            </template>
            <template #append>
               <div>
                  <q-btn flat round dense color="primary" icon="las la-shopping-cart" class="q-ml-md" />
                  <q-btn flat round dense color="primary" icon="search" class="q-ml-md" to="/search-view" />
               </div>
            </template>
         </toolbar-one>
      </template>

      <div id="category_slider">
         <swiper :slides-per-view="3.5" :freeMode="true" :mousewheel="true" :space-between="5">
            <swiper-slide v-for="(item, i) in items" :key="i">
               <p @click="onCategoryClick(item)" class="text-item" :class="{'active': item.slug == activeCategory}">{{ item.name }}</p>
            </swiper-slide>
         </swiper>
      </div>

      <!-- Results -->
      <div class="row q-col-gutter-md q-mt-md">
         <div class="col-6" v-for="item in 4" :key="item">
            <product-card name="Cafe Basilico" :price="32.50" :star="3.5" :reviews="1259" image="https://cdn.quasar.dev/img/chicken-salad.jpg" />
         </div>
      </div>

   </app-layout>
</template>

<script>

import AppLayout from 'layouts/AppLayout.vue'
import ToolbarOne from 'components/toolbars/ToolbarOne.vue'
import ProductCard from 'components/ProductCard'

import { Swiper, SwiperSlide } from 'swiper/vue'

export default {
   components: {
      AppLayout, ToolbarOne, ProductCard, Swiper, SwiperSlide
   },
   data() {
      return {
         activeCategory: null
      }
   },
   computed: {
      items() {
         return this.$store.state.appData.categories
      }
   },
   mounted() {
      this.activeCategory = this.$route.params.slug
   },
   methods: {
      onCategoryClick(item) {
         this.activeCategory = item.slug
         this.$router.push(`/categories/${item.slug}`)
      }
   }
}
</script>

<style lang="scss" scoped>
#category_slider {
   .text-item {
      color: $primary;
      text-align: center;
      padding: 5px 10px;
      border: 1px solid transparent;
      border-radius: 18px;
      transition: all 0.2s ease-in-out;
      &.active {
         border-color: $primary;
         font-weight: 500;
      }
   }
}
</style>
