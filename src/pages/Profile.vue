<template>
   <app-layout>
      <template #toolbar>
         <toolbar-one canMessage>
            <template #middle>
               <p class="text-center text-body1 text-bold q-ml-xl">Profile</p>
            </template>
         </toolbar-one>
      </template>
      <div class="text-center">
         <q-avatar size="150px">
            <img :src="require('assets/images/user-04.png')">
         </q-avatar>
         <h6 class="q-mt-lg">Jane Doe</h6>
      </div>

      <div class="flex items-center q-mt-lg custom-shadow q-px-md q-py-sm round-10">
         <div class="q-pa-sm round-10 bg-blue-1">
            <q-icon name="las la-wallet text-primary" size="30px" />
         </div>
         <div class="q-ml-sm">
            <h6>$4,899</h6>
            <p>Balance</p>
         </div>

         <q-btn class="q-ml-auto" rounded unelevated color="primary">Top Up</q-btn>

      </div>

      <!-- List -->
      <div id="profile_expansion" class="q-mt-lg">
         <q-list class="rounded-borders">
            <q-expansion-item icon="las la-user-circle" label="My Profile">
               <q-card>
                  <q-card-section>
                     Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, eius reprehenderit eos corrupti
                     commodi magni quaerat ex numquam, dolorum officiis modi facere maiores architecto suscipit iste
                     eveniet doloribus ullam aliquid.
                  </q-card-section>
               </q-card>
            </q-expansion-item>
            <q-expansion-item icon="las la-map-marker" label="My Address">
               <q-card>
                  <q-card-section>
                     Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, eius reprehenderit eos corrupti
                     commodi magni quaerat ex numquam, dolorum officiis modi facere maiores architecto suscipit iste
                     eveniet doloribus ullam aliquid.
                  </q-card-section>
               </q-card>
            </q-expansion-item>
            <q-expansion-item icon="las la-bell" label="Notification">
               <q-card>
                  <q-card-section>
                     Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, eius reprehenderit eos corrupti
                     commodi magni quaerat ex numquam, dolorum officiis modi facere maiores architecto suscipit iste
                     eveniet doloribus ullam aliquid.
                  </q-card-section>
               </q-card>
            </q-expansion-item>
            <q-expansion-item icon="gpp_good" label="Help Center">
               <q-card>
                  <q-card-section>
                     Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, eius reprehenderit eos corrupti
                     commodi magni quaerat ex numquam, dolorum officiis modi facere maiores architecto suscipit iste
                     eveniet doloribus ullam aliquid.
                  </q-card-section>
               </q-card>
            </q-expansion-item>
            <q-expansion-item @click="onLogout" icon="logout" label="Logout" expand-icon-class="hidden"> </q-expansion-item>
         </q-list>
      </div>

   </app-layout>
</template>

<script>
import ToolbarOne from 'components/toolbars/ToolbarOne.vue'
import AppLayout from 'layouts/AppLayout.vue'
import { createMetaMixin } from 'quasar'
import { mapActions } from 'vuex'

export default {
   mixins: [createMetaMixin(() => ({ title: 'My Profile' }))],
   components: {
      AppLayout, ToolbarOne
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
