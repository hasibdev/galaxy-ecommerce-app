<template>
   <app-layout>
      <h3>Contact with us</h3>
   </app-layout>
</template>

<script>
import AppLayout from 'layouts/AppLayout.vue'
import { defineComponent } from 'vue'
import { createMetaMixin } from 'quasar'

export default defineComponent({
   name: 'PageIndex',
   components: { AppLayout },
   mixins: [createMetaMixin(() => ({ title: 'Galaxy Telecom' }))],
   data() {
      return {
         heroSlider: null,
         loading: false
      }
   }
})
</script>
