<template>
  <div v-if="game === null">
    <MatchCreator @new-game="startGame"/>
  </div>
  <div v-else>
    <div v-if="!finished">
      <div class="py-3 px-3 bg-neutral-800 uppercase">
        <div v-if="game.suddenDeath" class="mb-2">
          <div class="uppercase font-medium text-xl text-primary-200">
            Sudden Death
          </div>
        </div>
        <div v-else class="flex mb-2 text-xl text-primary-200">
          <div class="uppercase font-medium  flex-1">
            Hole {{ game.currentHole }}
          </div>
          <div class="flex-1 text-right">
            {{ openSkins }} Skin<span v-if="openSkins > 1">s</span> - $ {{ openSkins * game.payout }}
          </div>
        </div>
        <div class="flex text-sm">
          <div class="flex-1">
            {{ game.currentHole }} / {{ game.holes.length }}
          </div>
          <div class="flex-1 text-right">
            ${{ game.payout }} / Skin
          </div>
        </div>
      </div>

      <div class="bg-neutral-600 px-3 py-4 uppercase">
        <div v-if="game.suddenDeath" class="mb-4 text-sm text-center" style="text-transform: none">
          <p>Closest to the pin, last one to miss a put or longest drive. Find a way to settle this and chose the
            winner.</p>
        </div>

        <div class="mb-2" v-for="(player, position) in game.players" :key="player.id">
          <div class="flex">
            <div class="flex-grow py-1">
              <div class="text-xl leading-tight text-primary-100">{{ player.name }} <span class="text-sm"
                                                                         v-if="(game.currentHole -1) % game.players.length == position && !game.suddenDeath">&#x1F94F;</span>
              </div>
              <div class="text-sm leading-tight">{{ wonSkins(player.id) }} Skins - ${{
                  wonSkins(player.id) * game.payout
                }}
              </div>
            </div>
            <div class="flex justify-center py-1">
              <button type="button" v-if="!finished" @click="claimSkin(player.id)"
                      class="inline-flex items-center px-2.5 py-1.5 border border-transparent uppercase text-xs font-medium  text-neutral-50 bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                Claim
              </button>
            </div>
          </div>
        </div>

        <div class="mt-5" v-if="!finished && !game.suddenDeath">
          <button type="button" @click="push"
                  class="w-full uppercase items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium text-neutral-50 bg-supporting-600 hover:bg-supporting-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:bg-supporting-500">
            Push
          </button>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="py-3 px-3 bg-neutral-800 uppercase">
        <div>
          <div class="uppercase font-medium text-xl text-primary-200">
            Finished
          </div>
        </div>
      </div>
      <div class="bg-neutral-600 px-3 py-2 uppercase">
        <div v-for="player in game.players" :key="player.id">
          <div class="flex justify-between align-middle">
            <div class="text-primary-100">{{ player.name }}</div>
            <div class="flex flex-col justify-around">{{ wonSkins(player.id) }} Skins /
              ${{ wonSkins(player.id) * game.payout }}
            </div>
          </div>
        </div>
      </div>

      <div class="py-3 px-3 bg-neutral-800 uppercase mt-4">
        <div>
          <div class="uppercase font-medium text text-primary-200">
            Paying debts
          </div>
        </div>
      </div>
      <div class="bg-neutral-600 px-3 text-sm py-2 uppercase">
        <div>
          <ul>
            <li v-for="settlement in settleDebts" :key="settlement.from +'-'+ settlement.to">
              {{ playerName(settlement.from) }} &#10142; {{ playerName(settlement.to) }}:
              ${{ settlement.amount }}
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="flex justify-between uppercase text-xs mt-4">
      <div><span @click="newGame">New Game</span></div>
      <div class=text-right v-if="game.currentHole !== 1"><span @click="redoLastHole">Redo last hole</span></div>
    </div>
  </div>

</template>

<script>
import MatchCreator from "@/components/MatchCreator";
import DebtService from "@/services/DebtService";

export default {
  name: "SkinsMatch",
  components: {
    MatchCreator
  },
  props: {
    msg: String,
  },
  mounted() {
    if (localStorage.game) {
      this.game = JSON.parse(localStorage.game);
    }
  },
  watch: {
    game: {
      handler(newGame) {
        localStorage.game = JSON.stringify(newGame);
      },
      deep: true
    }
  },
  data() {
    return {
      game: null
    }
  },
  computed: {
    openSkins() {
      let openSkins = 0
      for (let i = 0; i < this.game.currentHole - 1; i++) {
        if (this.game.holes[i].pushed === true) {
          openSkins++
        } else {
          openSkins = 0
        }
      }
      openSkins++
      return openSkins
    },

    finished() {
      return this.game.currentHole == this.game.holes.length + 1
    },
    settleDebts() {
      return DebtService.settleDebts(this.game.holes, this.game.payout, JSON.parse(JSON.stringify(this.game.players)))
    }
  }
  ,
  methods: {
    wonSkins(playerId) {
      let won = 0;
      let skinsOnTheLine = 1;
      for (let i = 0; i < this.game.holes.length; i++) {
        if (this.game.holes[i].pushed) {
          skinsOnTheLine++
        }

        if (this.game.holes[i].winner === playerId) {
          won += skinsOnTheLine
        }
        if (!this.game.holes[i].pushed) {
          skinsOnTheLine = 1
        }
      }
      return won
    },
    claimSkin(playerId) {
      this.game.holes[this.game.currentHole - 1].winner = playerId
      this.game.currentHole++
    },
    push() {
      if (this.game.currentHole === this.game.holes.length) {
        this.game.suddenDeath = true
        return
      }
      this.game.holes[this.game.currentHole - 1].pushed = true
      this.game.currentHole++
    },
    redoLastHole() {
      if (this.game.suddenDeath) {
        this.game.suddenDeath = false
        return
      }
      this.game.currentHole--;
      this.game.holes[this.game.currentHole - 1].winner = null
      this.game.holes[this.game.currentHole - 1].pushed = null
    },
    newGame() {
      if (confirm('Start new game?')) {
        this.game = null
      }
    },
    startGame(game) {
      this.game = game
    },
    playerName(playerId) {
      for (let i = 0; i < this.game.players.length; i++) {
        if (this.game.players[i].id === playerId) {
          return this.game.players[i].name
        }
      }
      return "Hans"
    }
  }
}
;
</script>
