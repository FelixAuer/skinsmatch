<template>
  <div class="container py-6 px-4">
    <div class="bg-supporting-50 p-4 mb-6 hidden md:block">
      <div class="flex">
        <div class="flex-shrink-0">
          <!-- Heroicon name: solid/exclamation -->
          <svg class="h-5 w-5 text-supporting-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
               fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clip-rule="evenodd"/>
          </svg>
        </div>
        <div class="ml-3">
          <h3 class="text-sm font-medium text-supporting-800">
            Build for mobile usage
          </h3>
          <div class="mt-2 text-sm text-supporting-700">
            <p>
              This web app was designed to be used on a smart phone and will look pretty bad on a big screen.
            </p>
          </div>
        </div>
      </div>
    </div>
    <div>
      <SkinsMatch/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import SkinsMatch from "../components/SkinsMatch.vue";

export default {
  name: "Home",
  components: {
    SkinsMatch
  },
};
</script>
