<template>
   <q-footer id="app_footer" class="bg-white text-grey-9">

      <ul class="menu-list">
         <li v-for="(item, i) in items" :key="i" @click="handleRoute(item)" :class="{active: item.name == $route.name}" class="text-grey-7">
            <q-icon :name="item.icon" size="25px" />
            <p class="q-mb-none text-subtitle2">{{item.label}}</p>
         </li>
      </ul>

   </q-footer>
</template>

<script>
export default {
   name: 'app-footer',
   data() {
      return {
         items: [
            {
               label: "Home",
               icon: "home",
               to: '/',
               name: 'home'
            },
            {
               label: "My Order",
               icon: "shopping_cart",
               to: '/orders',
               name: 'orders'
            },
            {
               label: "Favourite",
               icon: "favorite",
               to: '/favourite',
               name: 'favourite'
            },
            {
               label: "Profile",
               icon: "person",
               to: '/profile',
               name: 'profile'
            }
         ]
      }
   },
   methods: {
      handleRoute(item) {
         this.$router.push(item.to)
      }
   }
}
</script>

<style lang="scss" scoped>
#app_footer {
   bottom: -1px;
   box-shadow: -10px 0px 20px $grey-5;
   border-top-left-radius: 28px;
   border-top-right-radius: 28px;
   .menu-list {
      list-style: none;
      display: flex;
      justify-content: space-between;
      width: 100%;
      padding: 13px 25px;
      //  border-top: 0.2px solid $grey-5;
      margin: 0;
      li {
         text-align: center;
         transition: 0.2s ease-in-out;
         &.active {
            color: $primary !important;
         }
      }
   }
}
</style>
