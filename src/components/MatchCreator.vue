<template>
  <div>
    <div class="text-center py-3 bg-neutral-800">
      <h1 class="uppercase font-medium text-xl text-neutral-200">New Skinsmatch</h1>
    </div>
    <div class="bg-neutral-600 px-2 py-2">
      <div class="grid grid-cols-4 gap-6">
        <div class="col-span-2">
          <label for="holes" class="block text-sm font-medium uppercase">Holes</label>
          <input autocomplete="off" type="number" name="holes" id="holes" v-model="holes"
                 class="mt-1 focus:ring-supporting-500 focus:border-supporting-500 block w-full  text-sm   bg-neutral-400 placeholder-neutral-200 text-neutral-100 font-bold"/>
        </div>

        <div class="col-span-2">
          <label for="payout" class="block text-sm font-medium uppercase">$ per Skin</label>
          <div class="mt-1 flex  ">
                <span
                    class="inline-flex items-center px-3  bg-neutral-800 text-sm">
                  $
                </span>
            <input autocomplete="off" type="number" name="payout" id="payout" v-model="payout"
                   class="focus:ring-supporting-500 focus:border-supporting-500 flex-1 block w-full rounded-none text-sm bg-neutral-400 placeholder-neutral-200 text-neutral-100 font-bold">
          </div>
        </div>
      </div>

      <div class="mt-4 mb-1">
        <span class="block text-sm font-medium uppercase">Players</span>
      </div>
      <div v-for="player in players" :key="player.id">
        <div class="flex">
          <span
              class="flex-1 block w-full rounded-none text-sm uppercase"
          >
            {{ player.name }}
          </span>
          <span
              @click="removePlayer(player.id)"
              class="inline-flex items-center px-3">
                  x
                </span>
        </div>
      </div>
      <div class="flex mt-1">
        <form v-on:submit.prevent="addPlayer">
        <input autocomplete="off" v-model="newPlayerName" type="text" name="newPlayer" id="newPlayer"
               placeholder="New Player Name" ref="newPlayerName"
               class="uppercase focus:ring-supporting-500 focus:border-supporting-500 flex-1 block w-full rounded-none text-sm bg-neutral-400 placeholder-neutral-200 text-neutral-100"
        />
        <span
            @click="addPlayer"
            class="inline-flex items-center px-3 bg-neutral-800
hover:bg-neutral-700 focus:ring-2 focus:ring-offset-2 focus:bg-neutral-600">
                  +
                </span>
        </form>
      </div>


      <div class="mt-3">
        <div class="relative flex items-start">
          <div class="flex items-center h-5">
            <input id="comments" name="comments" type="checkbox"
                   class="focus:ring-supporting-500 h-4 w-4 text-supporting-600 bg-neutral-400"
                   v-model="randomizeOrder"/>
          </div>
          <div class="ml-3 text-sm">
            <label for="comments" class="text-sm font-medium uppercase">Random tee order</label>
          </div>
        </div>
      </div>


      <div class="mt-4" v-if="this.players.length > 0">
        <span class="block text-sm font-medium uppercase">buy in: ${{ sumPerPlayer }} per player</span>
      </div>
      <div v-if="error" class="text-sm mt-4 text-center text-red-300">
        <span>{{ error }}</span>
      </div>

      <div class="mt-3">
        <button type="button" @click="startGame"
                class="w-full uppercase items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium text-neutral-50 bg-supporting-600 hover:bg-supporting-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:bg-supporting-500">
          Start Game
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MatchCreator",
  emits: ["newGame"],
  data() {
    return {
      holes: 9,
      payout: 4,
      players: [],
      newPlayerName: '',
      nextId: 0,
      error: '',
      randomizeOrder: true
    }
  },
  computed: {
    sumPerPlayer() {
      if (this.players.length > 0) {
        return Math.round(100 * this.payout * this.holes / this.players.length) / 100;
      }
      return '-';
    }
  },
  methods: {
    addPlayer() {
      if (this.newPlayerName.length <= 0) {
        this.error = "Please enter a name!"
        this.$refs.newPlayerName.focus()
        return
      }
      if (this.nameInUse()) {
        this.error = "Name already in use!"
        this.$refs.newPlayerName.focus()
        return
      }
      this.error = ''

      this.players.push({
        name: this.newPlayerName,
        id: this.nextId
      })
      this.newPlayerName = ''
      this.nextId++

      this.$refs.newPlayerName.focus()
    },
    removePlayer(playerId) {
      for (let i = 0; i < this.players.length; i++) {
        if (this.players[i].id === playerId) {
          this.players.splice(i, 1)
        }
      }
    },
    nameInUse() {
      for (let i = 0; i < this.players.length; i++) {
        if (this.players[i].name.toLowerCase() === this.newPlayerName.toLowerCase()) {
          return true
        }
      }
      return false
    },
    startGame() {
      if (this.players.length <= 1) {
        this.error = 'You need at least two players to start a game!'
        return;
      }
      if (this.holes < 3) {
        this.error = 'You need at three holes to start a game!'
        return;
      }
      if (this.payout <= 0) {
        this.error = 'You need to play for at least one cent!'
        return;
      }


      let holes = []
      for (let i = 0; i < this.holes; i++) {
        holes.push({
          id: i + 1,
          pushed: false,
          winner: null
        })
      }

      if (this.randomizeOrder) {
        let j, x, i;
        for (i = this.players.length - 1; i > 0; i--) {
          j = Math.floor(Math.random() * (i + 1));
          x = this.players[i];
          this.players[i] = this.players[j];
          this.players[j] = x;
        }
      }

      this.$emit('newGame', {
        holes: holes,
        players: this.players,
        payout: this.payout,
        currentHole: 1,
        suddenDeath: false,
      })

    }
  }
};
</script>

