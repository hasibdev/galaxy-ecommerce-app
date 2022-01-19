<template>
   <div id="home-hero">
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

      <div class="under-bottom q-pa-md round-10 custom-shadow">
         <p>Hello</p>
      </div>
   </div>
</template>

<script>
export default {
   data() {
      return {
         slide: 1
      }
   },
   computed: {
      items() {
         return this.$store.state.appData.heroSliders
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
