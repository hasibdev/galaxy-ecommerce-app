<template>
   <div id="toolbar_one" class="flex justify-between items-center full-width q-py-md q-px-sm custom-shadow">
      <!-- Prepend -->
      <div class="prepend-content">
         <slot name="prepend">
            <q-icon v-if="canBack" @click="$router.back()" name="arrow_back" color="primary" size="25px" class="q-pr-sm" />
            <back-btn v-if="backWithText" />
         </slot>
      </div>

      <!-- Middle Input area -->
      <div class="middle-content">
         <slot name="middle">
            <p class="text-center text-body1 text-bold">{{ title }}</p>
            <!-- <q-icon name="las la-search" color="grey-5" class="search-icon q-px-sm" />
            <input @click="openSearchView" @focus="openSearchView" class="search-input" placeholder="Search" type="text"> -->
         </slot>
      </div>

      <!-- Append -->
      <div class="append-content">
         <slot name="append">
            <q-icon @click="openSearchView" v-if="searchIcon" size="30px" color="primary" name="search" />

            <q-btn to="/cart" v-if="cartIcon" flat round dense color="primary" class="q-mx-sm">
               <q-icon name="o_shopping_cart" />
               <q-badge color="orange" rounded floating>{{ totalCart }}</q-badge>
            </q-btn>
            <q-btn @click="openMessage" v-if="canMessage" flat round dense color="primary" icon="las la-sms" class="q-ml-sm" />
         </slot>
      </div>
   </div>
</template>

<script>
import BackBtn from 'components/buttons/BackBtn.vue'
import HelpChat from 'components/modals/HelpChat.vue'
import { mapGetters } from 'vuex'
export default {
   props: {
      canBack: {
         type: Boolean,
         default: false
      },
      cartIcon: {
         type: Boolean,
         default: true
      },
      canMessage: {
         type: Boolean,
         default: false
      },
      searchIcon: {
         type: Boolean,
         default: true
      },
      backWithText: {
         type: Boolean,
         default: false
      },
      title: {
         type: [String, Number],
         default: "Home"
      }
   },
   components: {
      BackBtn
   },
   computed: {
      ...mapGetters('cart', ['totalCart'])
   },
   methods: {
      openSearchView(e) {
         e.preventDefault()
         this.$router.push('/search-view')
      },
      openMessage(e) {
         this.$q.dialog({
            component: HelpChat
         })
      }
   }
}
</script>

<style lang="scss" scoped>
</style>
