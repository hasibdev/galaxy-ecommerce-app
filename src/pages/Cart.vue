<template>
   <app-layout>
      <!-- Toolbar Setup -->
      <template #toolbar>
         <toolbar-one backWithText>
            <template #append>
               <div></div>
            </template>
            <template #middle>
               <p class="text-center text-body1 text-bold q-mr-lg">Shopping Cart</p>
            </template>

         </toolbar-one>
      </template>
      <!-- Footer -->
      <template #footer>
         <q-footer id="app_footer" class="bg-white text-grey-9">

            <div v-if="items.length" class="flex justify-between items-center q-px-md q-my-lg">
               <div>
                  <p class="text-grey-6" style="font-size: 12px;">Total ({{items.length}} Items)</p>
                  <p class="text-bold text-body1">{{ getTotalPrice }}</p>
               </div>
               <q-btn rounded @click="addCheckout" color="primary" class="q-px-xl q-py-sm">Buy Now</q-btn>
            </div>
            <!-- Empty cart footer -->
            <div v-else class="q-ma-md">
               <q-btn rounded to="/" color="primary" class="full-width q-py-sm" label="Continue Shopping" />
            </div>
         </q-footer>
      </template>

      <!-- Main Content -->
      <section>
         <!-- Check box -->
         <div v-if="items.length" class="flex justify-between">
            <q-checkbox @click="onCheckAll" v-model="checkAll" label="Select All" />
            <span v-if="selected.length" @click="onDeleteAll" class="text-primary">Delete All</span>
         </div>
         <!-- List -->
         <div>
            <q-list>
               <q-item v-for="(item, i) in items" :key="i" tag="label" class="bg-white custom-shadow round-10 q-mt-md">
                  <q-item-section side top>
                     <q-checkbox v-model="selected" :val="item.id" />
                  </q-item-section>

                  <!-- Label -->
                  <q-item-section>
                     <q-item-label>
                        <p class="text-body1">{{ item.product.name }}</p>
                     </q-item-label>
                     <q-item-label caption>
                        <!-- <p class="flex items-center" style="margin-top: 5px;">
                           <span class="bg-grey-14 inline-block rounded-borders" style="width:19px; height:19px;"></span>
                           <span class="q-ml-sm inline-block ">Grey</span>
                        </p> -->
                        <p class="text-h6 text-black text-bold">{{getPrice(item)}}</p>
                     </q-item-label>
                     <!-- Quantity adjust -->
                     <q-item-label>
                        <div class="flex justify-end">
                           <div style="margin-top: -25px;">
                              <q-btn dense unelevated @click="adjustQty('decrement', item.qty, item)" color="grey-3" class="round-10 text-grey-6" icon="remove" />
                              <q-btn outline dense unelevated color="grey-3" class="round-10 q-px-md text-grey-10 q-mx-sm">{{ item.qty }}</q-btn>
                              <q-btn dense unelevated @click="adjustQty('increment', item.qty, item)" class="round-10 text-grey-6" icon="add" />
                           </div>
                        </div>
                     </q-item-label>
                  </q-item-section>
               </q-item>

            </q-list>
         </div>
      </section>

      <!-- Empty Cart -->
      <section v-if="!cartLoadingState && !items.length">
         <div class="text-center q-mt-lg">
            <cart-svg />
            <div class="q-mt-lg q-pa-md">
               <h6>Your cart is empty</h6>
               <p>looks like you haven't made your choice yet. Come on, find the item you want.</p>
            </div>
         </div>
      </section>

      <!-- Loading state -->
      <div v-if="cartLoadingState" class="text-center q-mt-xl">
         <q-spinner color="grey-14" size="3em" />
      </div>

   </app-layout>
</template>

<script>
import AppLayout from 'layouts/AppLayout.vue'
import ToolbarOne from 'components/toolbars/ToolbarOne.vue'
import CartSvg from 'components/svg/CartSvg.vue'
import { createMetaMixin } from 'quasar'
import { mapState } from 'vuex'

export default {
   mixins: [createMetaMixin(() => ({ title: 'Galaxy Shop' }))],
   components: {
      AppLayout, ToolbarOne, CartSvg
   },
   data() {
      return {
         localCartItems: [],
         selected: [],
         checkAll: false
      }
   },

   computed: {
      ...mapState('cart', ['items', 'subTotal', 'cartLoadingState']),
      allIds() {
         return this.items.map(c => c.id)
      },

      getTotalPrice() {
         let symbol = ''
         const total = this.items.reduce((acc, p) => {
            symbol = p.total.formatted[0]
            const amount = acc + (p.total.amount * p.qty)
            return amount
         }, 0).toFixed(2)

         return `${symbol}${total}`
      }
   },
   methods: {
      onCheckAll() {
         if (this.checkAll) this.selected = this.allIds
         else this.selected = []
      },
      onDeleteAll() {
         this.selected.forEach(id => {
            this.$store.commit('cart/REMOVE', id)
            // this.localCartItems = this.localCartItems.filter(product => product.id !== id)
         })

         this.$q.notify({
            message: 'Removed from Cart',
            color: 'warning'
         })
      },
      addCheckout() {
         const userStatus = this.$store.state.auth.status
         if (!userStatus) {
            this.$store.dispatch('layout/show')
         } else {
            this.$router.push('/checkout')
         }
      },
      adjustQty(mode, qty, item) {
         this.$store.dispatch('cart/adjustQty', { mode, qty, item })
      },
      getPrice(item) {
         const amount = (item.total.amount * item.qty).toFixed(2)
         const symbol = item.total.formatted[0]

         return `${symbol}${amount}`
      }
   },
   watch: {
      selected(val) {
         if (val.length === this.allIds.length) this.checkAll = true
         else this.checkAll = false
      }
   }
}
</script>

<style lang="scss" scoped>
</style>
