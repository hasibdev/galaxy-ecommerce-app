<template>
   <div style="width: 200px;">
      <input :id="id" class="input" type="file" @change="handleChange">
      <label :for="id" class="input-label " :style="{'height' : height}" v-if="!previewUrl">
         <span class="text-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="label-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            <p class="">
               Click to upload
            </p>
         </span>
      </label>
      <div class="preview-image" :style="{'height' : height}" v-if="previewUrl">
         <img :src="previewUrl" alt="">
         <div class="overlay">
            <span @click="removeImage" class="pointer">
               <svg class="overlay-button" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
               </svg>
            </span>
         </div>
      </div>
   </div>
</template>

<script>
export default {
   emits: ['update:modelValue'],
   props: {
      height: {
         type: String,
         default: "200px"
      },
      url: {
         type: String,
         default: null
      },
      id: {
         type: String,
         default: `image_attach_field${Math.random().toFixed(5).split('.')[1]}`
      }
   },
   data() {
      return {
         previewUrl: null
      }
   },
   methods: {
      handleChange(e) {
         this.onFileChange(e)
      },

      onFileChange: function (event) {
         const file = event.target.files[0]
         if (!file) {
            return false
         }
         if (!file.type.match("image.*")) {
            return false
         }
         const reader = new FileReader()
         const that = this
         reader.onload = function (e) {
            that.previewUrl = e.target.result

            that.$emit("update:modelValue", e.target.result)
         }
         reader.readAsDataURL(file)
      },
      removeImage() {
         this.previewUrl = null
         this.$emit("update:modelValue", null)
      }
   },

   created() {
      this.previewUrl = this.url
   }
}
</script>

<style lang="scss" scoped>
.input {
   display: none;
}

.input-label {
   display: flex;
   justify-content: center;
   align-items: center;
   background: #f3f4f6;
   color: #6b7280;
   cursor: pointer;
   border-radius: 10px;

   &:hover {
      background: #d1d5db;
   }

   .label-icon {
      height: 1.5rem;
      margin-bottom: 0.75rem;
      margin-left: auto;
      margin-right: auto;
   }
}

.preview-image {
   // @apply relative w-full bg-gray-100 rounded-lg overflow-hidden;
   position: relative;
   width: 100%;
   background: #d1d5db;
   border-radius: 8px;
   overflow: hidden;
   img {
      height: 100%;
      width: 100%;
      object-fit: contain;
   }

   .overlay {
      content: "";
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: center;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      background: rgba(0, 0, 0, 0.6);
      opacity: 0;
      transition: all 0.3s;
      color: #fff;

      &-button {
         height: 1.2rem;
         color: red;
         background: #fff;
         position: absolute;
         border-radius: 3px;
         margin: 5px;
         top: 0.5rem;
         right: 0.5rem;
      }
   }

   &:hover .overlay {
      opacity: 1;
   }
}
</style>
