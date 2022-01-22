<template>
   <q-layout view="hHh lpR fFf">

      <q-page-container>
         <auth-modal />

         <router-view />
      </q-page-container>

   </q-layout>
</template>

<script>
import AuthModal from 'components/modals/AuthModal.vue'
export default {
   name: "Layout",
   components: {
      AuthModal
   }
}
</script>
