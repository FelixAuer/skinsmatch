<template>
  <div class="py-3 px-3 bg-neutral-800 uppercase mt-4 cursor-pointer" @click="foldOut = !foldOut">
    <div class="flex justify-between">
      <div class="uppercase font-medium text text-primary-200">
        {{  title }}
      </div>
      <span>V</span>
    </div>
  </div>
  <div v-if="foldOut" class="bg-neutral-600 px-3 text-sm py-2">
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "FoldoutPanel",
  props: {
    title: {
      type: String,
      required: true
    }
  },
  data(){
    return {
      foldOut: false
    }
  }
}
</script>

<style scoped>

</style>