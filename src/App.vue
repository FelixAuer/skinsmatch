<template>
  <div>
    <div class="w-full  bg-neutral-800 font-medium text-xl">
      <div class="text-center py-4 text-primary-200  border-0 border-b-2 border-supporting-700">
        <span>SKINSMAT.CH</span>
      </div>
    </div>
    <div class="h-full flex flex-col container mx-auto ">
      <main class="flex-grow">
        <router-view/>
      </main>
      <div class="container mx-auto text-center text-xs text-neutral-400 pb-4 bg-neutral-900">
        <div>
          <a href="https://www.felixauer.com">Felix Auer</a>, 2021
        </div>
      </div>
    </div>
  </div>
</template>

<style>
</style>
