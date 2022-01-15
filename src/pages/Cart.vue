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

            <div v-if="localCartItems.length" class="flex justify-between items-center q-px-md q-my-lg">
               <div>
                  <p class="text-grey-6" style="font-size: 12px;">Total ({{totalCartItems}} Items)</p>
                  <p class="text-bold text-body1">{{ getTotalPrice }}</p>
               </div>
               <q-btn rounded to="/checkout" color="primary" class="q-px-xl q-py-sm">Buy Now</q-btn>
            </div>
            <!-- Empty cart footer -->
            <div v-else class="q-ma-md">
               <q-btn rounded to="/" color="primary" class="full-width q-py-sm" label="Continue Shopping" />
            </div>
         </q-footer>
      </template>

      <!-- Main Content -->
      <section v-if="localCartItems.length">
         <!-- Check box -->
         <div class="flex justify-between">
            <q-checkbox @click="onCheckAll" v-model="checkAll" label="Select All" />
            <span v-if="selected.length" @click="onDeleteAll" class="text-primary">Delete All</span>
         </div>
         <!-- List -->
         <div>
            <q-list>
               <q-item v-for="(item, i) in localCartItems" :key="i" tag="label" :class="{'custom-shadow': i==0}" class="bg-white round-10 q-mt-md">
                  <q-item-section side top>
                     <q-checkbox v-model="selected" :val="item.id" />
                  </q-item-section>

                  <!-- Label -->
                  <q-item-section>
                     <q-item-label>
                        <p class="text-body1">{{ item.name }}</p>
                     </q-item-label>
                     <q-item-label caption>
                        <!-- <p class="flex items-center" style="margin-top: 5px;">
                           <span class="bg-grey-14 inline-block rounded-borders" style="width:19px; height:19px;"></span>
                           <span class="q-ml-sm inline-block ">Grey</span>
                        </p> -->
                        <p class="text-h6 text-black q-mt-sm text-bold">{{item.formatted_price[0]}}{{ (item.price.inCurrentCurrency.amount * item.quantity).toFixed(2) }}</p>
                     </q-item-label>
                     <!-- Quantity adjust -->
                     <q-item-label>
                        <div class="flex justify-end">
                           <div style="margin-top: -25px;">
                              <q-btn dense unelevated @click="item.quantity !== 1 ? --item.quantity : null" color="grey-3" class="round-10 text-grey-6" icon="remove" />
                              <q-btn outline dense unelevated color="grey-3" class="round-10 q-px-md text-grey-10 q-mx-sm">{{ item.quantity }}</q-btn>
                              <q-btn dense unelevated @click="++item.quantity" color="grey-3" class="round-10 text-grey-6" icon="add" />
                           </div>
                        </div>
                     </q-item-label>
                  </q-item-section>
               </q-item>

            </q-list>
         </div>
      </section>

      <!-- Empty Cart -->
      <section v-else>
         <div class="text-center q-mt-lg">
            <cart-svg />
            <div class="q-mt-lg q-pa-md">
               <h6>Your cart is empty</h6>
               <p>looks like you haven't made your choice yet. Come on, find the item you want.</p>
            </div>
         </div>
      </section>

   </app-layout>
</template>

<script>
import AppLayout from 'layouts/AppLayout.vue'
import ToolbarOne from 'components/toolbars/ToolbarOne.vue'
import CartSvg from 'components/svg/CartSvg.vue'
import { createMetaMixin } from 'quasar'
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
   created() {
      this.initLocaldata()
   },
   computed: {
      allIds() {
         return this.localCartItems.map(c => c.id)
      },
      totalCartItems() {
         if (this.selected.length) {
            return this.selected.length
         } else {
            return this.localCartItems.length
         }
      },
      getTotalPrice() {
         if (this.selected.length) {
            let p = 0
            let symbol = ''
            this.selected.forEach(id => {
               const product = this.localCartItems.find(item => item.id === id)
               p += (product.price.inCurrentCurrency.amount * product.quantity)

               // this is a little bit hack for currency symbol
               symbol = product.formatted_price[0]
            })
            return `${symbol}${p}`
         } else {
            return this.localCartItems.reduce((acc, product) => {
               let symbol = ''
               acc += product.price.inCurrentCurrency.amount * product.quantity

               // this is a little bit hack for currency symbol
               symbol = product.formatted_price[0]

               return `${symbol}${acc}`
            }, 0)
         }
      }
   },
   methods: {
      initLocaldata() {
         const localCart = JSON.parse(localStorage.getItem('localCart'))
         if (localCart && localCart.length) {
            this.localCartItems = localCart
         }
      },
      onCheckAll() {
         console.log('check all')
         if (this.checkAll) this.selected = this.allIds
         else this.selected = []
      },
      onDeleteAll() {
         this.selected.forEach(id => {
            this.localCartItems = this.localCartItems.filter(product => product.id !== id)
         })

         this.$q.notify({
            message: 'Removed from Cart',
            color: 'warning'
         })
      }
   },
   watch: {
      localCartItems(val) {
         localStorage.setItem('localCart', JSON.stringify(val))
      },
      selected(val) {
         if (val.length === this.allIds.length) this.checkAll = true
         else this.checkAll = false
      }
   }
}
</script>

<style lang="scss" scoped>
</style>
