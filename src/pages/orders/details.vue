<template>
   <app-layout>
      <div v-if="order">
         <q-card>
            <q-card-section>
               <h6>Order Information</h6>
            </q-card-section>
         </q-card>
      </div>
   </app-layout>
</template>

<script>
import AppLayout from 'layouts/AppLayout.vue'
export default {
   components: {
      AppLayout
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
