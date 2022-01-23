<template>
   <div>
      <q-input outlined color="secondary" v-model="addressForm.address_1" type="text" placeholder="Address 1" input-class="text-body1" class="q-mb-md" />
   </div>
</template>

<script>
export default {
   emits: ['update:modelValue'],
   props: {
      modelValue: {
         type: [String, Number, Boolean]
      }
   }
}
</script>

<style lang="scss" scoped>
</style>
