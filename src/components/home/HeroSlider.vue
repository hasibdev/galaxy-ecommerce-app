<template>
   <div v-intersection.once="interHeroSlider" id="home-hero">
      <q-carousel navigation autoplay swipeable infinite v-model="slide" height="230px" transition-prev="slide-right" transition-next="slide-left" transition-duration="1000" animated control-color="grey-10" class="rounded-borders">

         <template v-if="items.length">
            <q-carousel-slide v-for="(item, i) in items" :key="i" :name="i" :img-src="item.file.path" class="column no-wrap">
               <div class="q-mt-md slide-content">
                  <h5 class="text-bold q-mb-sm text-grey-3">{{item.caption_1}}</h5>
                  <p class="q-pr-xl text-body1 text-grey-5">{{item.caption_2}}</p>
                  <q-btn color="orange-7" :label="item.call_to_action_text" class="q-mt-lg" />
               </div>
            </q-carousel-slide>
         </template>

         <template v-else>
            <q-carousel-slide v-for="item in 4" :key="item" :name="item" class="column no-wrap">
               <q-skeleton square height="230px" class="rounded-borders" />
            </q-carousel-slide>
         </template>

      </q-carousel>

      <!-- Bottom slide -->
      <div class="under-bottom round-10 custom-shadow">
         <!-- Slider -->
         <div id="hero_bottom_slider">
            <swiper :slides-per-view="1" :autoHeight="true" :mousewheel="true" :space-between="0">
               <swiper-slide v-for="(item, i) in bottomSlide" :key="i">
                  <div class="flex items-center no-wrap q-pa-md">
                     <q-icon :name="item.icon" color="primary" size="40px" />
                     <div class="q-ml-md">
                        <p class="text-body1">{{ item.title }}</p>
                        <p class="text-grey">{{ item.subtitle }}</p>
                     </div>
                  </div>
               </swiper-slide>
            </swiper>
         </div>
      </div>
   </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue'

export default {
   components: {
      Swiper, SwiperSlide
   },
   data() {
      return {
         slide: 1,
         bottomSlide: [
            {
               title: 'Payment & Delivery',
               subtitle: 'Free shipping for orders over $50',
               icon: 'las la-truck'
            },
            {
               title: 'Return & Refund',
               subtitle: 'Free 100% money back guarantee',
               icon: 'las la-spinner'
            },
            {
               title: 'Quality Support',
               subtitle: 'Alway online feedback 24/7',
               icon: 'las la-life-ring'
            },
            {
               title: 'JOIN OUR NEWSLETTER',
               subtitle: '10% off by subscribing to our newsletter',
               icon: 'las la-envelope'
            }
         ]
      }
   },
   computed: {
      items() {
         return this.$store.state.appData.heroSliders
      }
   },
   methods: {
      interHeroSlider() {
         this.$store.dispatch('appData/fetchHeroSliders')
      }
   }

}
</script>

<style lang="scss">
#home-hero {
   position: relative;
   .q-carousel__navigation-icon--inactive {
      opacity: 0.5 !important;
   }
   .q-carousel__navigation-inner {
      button {
         i {
            font-size: 12px !important;
         }
      }
   }
   .q-carousel__navigation--bottom {
      bottom: 15px;
   }
   .slide-content {
   }
   .q-carousel__navigation-icon--active {
      color: #000 !important;
   }
   .under-bottom {
      margin-top: -10px;
      background: #fff;
      position: relative;
      z-index: 9;
   }
}
</style>
