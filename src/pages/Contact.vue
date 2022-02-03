<template>
   <app-layout>
      <template #toolbar>
         <toolbar-one backWithText :searchIcon="false">
            <template #middle>
               <p class="text-center text-body1 text-bold ">Contact</p>
            </template>
         </toolbar-one>
      </template>

      <h5>Contact</h5>
   </app-layout>
</template>

<script>
import ToolbarOne from 'components/toolbars/ToolbarOne.vue'
import AppLayout from 'layouts/AppLayout.vue'
import { defineComponent } from 'vue'
import { createMetaMixin } from 'quasar'

export default defineComponent({
   name: 'PageIndex',
   components: { AppLayout, ToolbarOne },
   mixins: [createMetaMixin(() => ({ title: 'Galaxy Telecom' }))],
   data() {
      return {
         heroSlider: null,
         loading: false
      }
   }
})
</script>
