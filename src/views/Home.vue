<template>
  <div class="bg-neutral-800 font-medium text-xl">
    <div class="container text-center py-4 text-primary-200  border-0 border-b-2 border-supporting-700">
      <span>SKINSMAT.CH</span>
    </div>
  </div>
  <div class="container py-6 px-4">
    <SkinsMatch/>
  </div>
</template>

<script>
// @ is an alias to /src
import SkinsMatch from "@/components/SkinsMatch.vue";

export default {
  name: "Home",
  components: {
    SkinsMatch,
  },
};
</script>
