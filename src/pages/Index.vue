<template>
   <app-layout>
      <template #toolbar>
         <toolbar-one>
            <template #prepend>
               <logo-image />
            </template>

            <template #middle>
               <div></div>
            </template>
         </toolbar-one>

      </template>

      <hero-slider />

      <br>
      <banner-slider />

      <br>
      <todays-best />

   </app-layout>
</template>

<script>
import AppLayout from 'layouts/AppLayout.vue'
import { defineComponent } from 'vue'
import HeroSlider from 'components/home/HeroSlider.vue'
import TodaysBest from 'components/home/TodaysBest.vue'
import BannerSlider from 'components/home/BannerSlider.vue'
import { createMetaMixin } from 'quasar'
import ToolbarOne from 'components/toolbars/ToolbarOne.vue'
import LogoImage from 'components/LogoImage.vue'

export default defineComponent({
   name: 'PageIndex',
   components: { AppLayout, BannerSlider, TodaysBest, HeroSlider, ToolbarOne, LogoImage },
   mixins: [createMetaMixin(() => ({ title: 'Galaxy Telecom' }))],
   data() {
      return {
         heroSlider: null,
         loading: false
      }
   }
})
</script>
