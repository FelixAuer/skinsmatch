<template>
  <div class="bg-neutral-600">
    <div class="py-3 px-3 bg-neutral-800 uppercase">
      <div
          class="flex text-xl font-medium text-primary-200 justify-between"
      >
        <div class="uppercase">Disc Dice</div>
      </div>
    </div>
    <div class="px-3 pb-3" v-if="disc">
      <div class="mt-3 ">
        <div>Throw</div>
        <div class="text-3xl text-white">
          {{ mThrow.name }}
        </div>
        <div v-if="mThrow.description" class="text-sm">({{ mThrow.description }})</div>
      </div>
      <div class="mt-3 ">
        <div>Disc</div>
        <div class="text-3xl text-white">
          {{ disc.name }}
        </div>
        <div v-if="disc.description" class="text-sm">({{ disc.description }})</div>
      </div>
      <div class="mt-3">
        <button
            type="button"
            @click="roll"
            class="w-full uppercase items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium text-neutral-50 bg-supporting-600 hover:bg-supporting-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:bg-supporting-500 disabled:opacity-50"
        >
          Roll
        </button>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "DiscDice",
  components: {},
  props: {},
  data() {
    return {
      mThrow: null,
      disc: null,
      throws: [
        {name: "Hyzer"},
        {name: "Anhyzer"},
        {name: "Forehand"},
        {name: "Roller"},
        {name: "Backhand"},
        {name: "Wildcard", description: "Throw however you want"},
      ],
      discs: [
        {name: "Putter"},
        {name: "Mid"},
        {name: "Driver"},
        {name: "Overstable"},
        {name: "Flippy"},
        {name: "Wildcard", description: "Throw whatever you want"},
      ],
    };
  },
  mounted() {
    this.roll();
  },
  methods: {
    roll() {
      console.log(this.throws[Math.floor(Math.random() * this.throws.length)])
      this.mThrow = this.throws[Math.floor(Math.random() * this.throws.length)];
      this.disc = this.discs[Math.floor(Math.random() * this.discs.length)];
    }
  },
};
</script>

<style>
</style>
