<template>
   <app-layout>
      <template #toolbar>
         <toolbar-one backWithText>
            <template #middle>
               <div></div>
            </template>
         </toolbar-one>
      </template>

      <div v-if="order">
         <q-card class="custom-shadow">
            <q-card-section>
               <h6>Order Information</h6>
            </q-card-section>
         </q-card>
      </div>
   </app-layout>
</template>

<script>
import AppLayout from 'layouts/AppLayout.vue'
import ToolbarOne from 'components/toolbars/ToolbarOne.vue'

export default {
   components: {
      AppLayout, ToolbarOne
   },
   data() {
      return {
         order: null
      }
   },
   async created() {
      try {
         this.loadingOrders = true
         const res = await this.$api.get(`/account/orders/${this.$route.params.id}`)
         this.order = res.data
         console.log(res.data)
      } catch (error) {
         console.log(error)
      } finally {
         this.loadingOrders = false
      }
   }
}
</script>

<style lang="scss" scoped>
</style>
