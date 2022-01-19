<template>
   <app-layout>
      <template #toolbar>
         <toolbar-one canMessage>
            <template #middle>
               <p class="text-center text-body1 text-bold q-ml-xl">Profile</p>
            </template>
         </toolbar-one>
      </template>

      <div v-if="!user" class="text-center q-mt-xl">
         <q-spinner color="grey-14" size="3em" />
      </div>

      <div v-if="user">
         <div class="text-center">
            <q-avatar size="150px">
               <img v-if="user.image" :src="user.image">
               <img v-else :src="require('assets/images/user-01.png')">
            </q-avatar>
            <h6 class="q-mt-lg">{{ user.first_name }} {{ user.last_name }}</h6>
         </div>

         <div class="flex items-center q-mt-lg custom-shadow q-px-md q-py-sm round-10">
            <div class="q-pa-sm round-10 bg-blue-1">
               <q-icon name="las la-wallet text-primary" size="30px" />
            </div>
            <div class="q-ml-sm">
               <p class="text-body1">{{ user.email }}</p>
               <p v-if="user.phone" class="text-body2">{{ user.phone }}</p>
            </div>

            <q-btn class="q-ml-auto" to="/profile/update" rounded unelevated color="primary">Update</q-btn>

         </div>

         <!-- List -->
         <div id="profile_expansion" class="q-mt-lg">
            <q-list class="rounded-borders">
               <q-expansion-item icon="las la-user-circle" label="My Profile">
                  <q-card>
                     <q-card-section>
                        <address>
                           <p class="text-body1 q-mb-sm">First Name: {{ user.first_name }} </p>
                           <p class="text-body1 q-mb-sm">Last Name: {{ user.last_name }} </p>
                           <p class="text-body1 q-mb-sm">Email: {{ user.email }}</p>
                           <p class="text-body1 q-mb-sm">Phone: {{ user.phone }}</p>
                           <p class="text-body1">Last login: {{ user.last_login }}</p>
                        </address>
                     </q-card-section>
                  </q-card>
               </q-expansion-item>
               <q-expansion-item icon="las la-map-marker" label="My Address">
                  <q-card>
                     <q-card-section>
                        <address>
                           <p class="text-body1 q-mb-sm">Address One: {{ address.address_1 }} </p>
                           <p class="text-body1 q-mb-sm">Address Two: {{ address.address_2 }} </p>
                           <p class="text-body1 q-mb-sm">City: {{ address.city }} </p>
                           <p class="text-body1 q-mb-sm">Country: {{ address.country }} </p>
                           <p class="text-body1 q-mb-sm">State: {{ address.state }} </p>
                           <p class="text-body1 q-mb-sm">Zip Code: {{ address.zip }} </p>

                        </address>
                     </q-card-section>
                  </q-card>
               </q-expansion-item>

               <q-expansion-item @click="openMessage" icon="gpp_good" label="Help Center" expand-icon-class="hidden"> </q-expansion-item>
               <q-expansion-item @click="onLogout" icon="logout" label="Logout" expand-icon-class="hidden"> </q-expansion-item>
            </q-list>
         </div>
      </div>

   </app-layout>
</template>

<script>
import ToolbarOne from 'components/toolbars/ToolbarOne.vue'
import AppLayout from 'layouts/AppLayout.vue'
import { createMetaMixin } from 'quasar'
import { mapActions, mapState } from 'vuex'
import HelpChat from 'components/modals/HelpChat.vue'

export default {
   mixins: [createMetaMixin(() => ({ title: 'My Profile' }))],
   components: {
      AppLayout, ToolbarOne
   },
   computed: {
      ...mapState('auth', ['user', 'address'])
   },
   methods: {
      ...mapActions('auth', ['logout']),
      async onLogout() {
         try {
            await this.logout()
            this.$router.replace('/home')
         } catch (error) {
            console.log(error)
         }
      },
      openMessage(e) {
         this.$q.dialog({
            component: HelpChat
         })
      }
   }
}
</script>

<style lang="scss">
#profile_expansion {
   .q-item__section.q-item__section--avatar {
      align-items: center !important;
   }
   .q-list {
      .q-expansion-item {
         .q-item__section.q-item__section--avatar {
            .q-icon {
               color: $secondary !important;
               background: $cyan-1;
               padding: 12px 10px;
               border-radius: 10px;
            }
         }
      }
   }
}
</style>
