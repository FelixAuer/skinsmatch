<template>
  <div v-if="game === null">
    <MatchCreator @new-game="startGame"/>
  </div>
  <div v-else>
    <div v-if="!finished">
      <div class="py-3 px-3 bg-neutral-800 uppercase">
        <div
            v-if="game.suddenDeath"
            class="flex mb-2 text-3xl font-medium text-primary-200 justify-between"
        >
          <div class="uppercase">Sudden Death</div>
          <div class="text-right">
            {{ openSkins }} Skin<span v-if="openSkins > 1">s</span> - $
            {{ openSkins * game.payout }}
          </div>
        </div>
        <div
            v-else
            class="flex mb-2 text-3xl font-medium text-primary-200 justify-between"
        >
          <div class="uppercase">Hole {{ currentHoleName }}</div>
          <div class="text-right">
            {{ openSkins }} Skin<span v-if="openSkins > 1">s</span> - $
            {{ openSkins * game.payout }}
          </div>
        </div>
        <div class="flex text-sm">
          <div class="flex-1">
            {{ game.currentHole }} / {{ game.holes.length }}
          </div>
          <div class="flex-1 text-right">${{ game.payout }} / Skin</div>
        </div>
      </div>

      <k-progress
          style="margin: 0 !important"
          :percent="percentage"
          :color="['#DE911D', '#F7C948']"
          bg-color="#B1B1B1"
          :show-text="false"
          :border="false"
      ></k-progress>

      <div class="bg-neutral-600 px-3 py-4 uppercase">
        <div
            v-if="game.suddenDeath"
            class="mb-4 text-sm text-center"
            style="text-transform: none"
        >
          <p>
            Closest to the pin, last one to miss a putt or longest drive. Find a
            way to settle this and choose the winner.
          </p>
        </div>

        <div v-for="(player, position) in game.players" :key="player.id">
          <div :class="firstThrowerStyling(position)">
            <div class="flex py-1">
              <div class="flex-grow py-1">
                <div class="text-xl leading-tight text-primary-100">
                  {{ player.name }}
                </div>
                <div class="text-sm leading-tight">
                  {{ wonSkins(player.id) }} Skins - ${{
                    wonSkins(player.id) * game.payout
                  }}
                  <span v-if="currentHoleCTP === player.id"
                        class="inline-flex items-center justify-center px-2 py-1 mr-2 text-xs font-bold leading-none text-primary-100 bg-supporting-900 rounded-full">CTP</span>
                  <span v-if="currentHoleLD === player.id"
                        class="inline-flex items-center justify-center px-2 py-1 mr-2 text-xs font-bold leading-none text-primary-100 bg-supporting-900 rounded-full">LD</span>
                </div>
              </div>
              <div class="flex justify-center py-1">
                <button
                    type="button"
                    v-if="!finished"
                    @click="claimSkin(player.id)"
                    class="inline-flex items-center px-2.5 py-1.5 border border-transparent uppercase text-xs font-medium text-neutral-50 bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    v-text="claimText"
                ></button>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-5 flex space-x-4" v-if="!finished && !game.suddenDeath">
          <button
              type="button"
              @click="setMode('ctp')"
              :disabled="mode === 'longdrive'"
              class="w-1/2 uppercase items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium text-neutral-50 bg-supporting-700 hover:bg-supporting-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:bg-supporting-500 disabled:opacity-50"
          >
            <span v-text="mode === 'ctp' ? 'cancel' : 'ctp'"></span>
          </button>
          <button
              type="button"
              @click="setMode('longdrive')"
              :disabled="mode === 'ctp'"
              class="w-1/2 uppercase items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium text-neutral-50 bg-supporting-700 hover:bg-supporting-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:bg-supporting-500 disabled:opacity-50"
          >
            <span
                v-text="mode === 'longdrive' ? 'cancel' : 'longest drive'"
            ></span>
          </button>
        </div>
        <div class="mt-3" v-if="!finished && !game.suddenDeath">
          <button
              type="button"
              @click="push"
              :disabled="mode != 'skin'"
              class="w-full uppercase items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium text-neutral-50 bg-supporting-600 hover:bg-supporting-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:bg-supporting-500 disabled:opacity-50"
          >
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
            <div class="flex flex-col justify-around">
              {{ wonSkins(player.id) }} Skins / ${{
                wonSkins(player.id) * game.payout
              }}
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
            <li
                v-for="settlement in settleDebts"
                :key="settlement.from + '-' + settlement.to"
            >
              {{ playerName(settlement.from) }} &#10142;
              {{ playerName(settlement.to) }}: ${{ settlement.amount }}
            </li>
          </ul>
        </div>
      </div>

      <div class="py-3 px-3 bg-neutral-800 uppercase mt-4">
        <div>
          <div class="uppercase font-medium text text-primary-200">
            Details
          </div>
        </div>
      </div>
      <div class="bg-neutral-600 px-3 text-sm py-2 uppercase">
        <div
            v-for="hole in game.holes"
            :key="hole.id"
            class="mb-2"
        >
          <div class="font-bold">
            Hole {{ hole.id }}
          </div>
          <div>
            <div
                v-text=" hole.winner != null ? 'Winner: '+ playerName(hole.winner) + ' (' + openSkinsHole(hole.id) + ' skins)': 'pushed'">
            </div>
            <div v-if="hole.ctp != null" v-text=" 'CTP: '+ playerName(hole.ctp) + ' (1 skin)'">
            </div>
            <div v-if="hole.longdrive != null" v-text=" 'Longest Drive: '+ playerName(hole.longdrive) + ' (1 skin)'">
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="flex justify-between uppercase text-xs mt-4">
      <div><span @click="newGame">New Game</span></div>
      <div class="text-right" v-if="game.currentHole !== 1">
        <span @click="redoLastHole">Redo last hole</span>
      </div>
    </div>
  </div>
  <FoldoutPanel v-if="game === null" title="Rules">
    <h3 class="text-lg">What's a Skins Match?</h3>
    <p class="mb-4">
      <i>Skins</i> is a match play type format for golf-like games, most
      commonly played by three or four players. Players compete for money or
      other rewards on a per-hole basis.
    </p>
    <h3 class="text-lg">How To Play</h3>
    <p class="mb-2">
      Before the game players decide on reward for winning a hole - called a
      "skin", e.g. $5 per hole. Players can either pool their money at the start
      of the game and pay the winner directly after each whole or settle their
      debts after the game.
    </p>
    <p class="mb-2">
      As a match play type format every hole is played by itself. The single
      player with the lowest score on a hole wins the skin and reaps the reward
      for that hole.
    </p>
    <p class="mb-2">
      <b>Pushing the hole:</b> Should two or more players have an equally low
      best score nobody wins the skin. The prize is kept in the pot and gets
      added to the next hole's skin. Skins keep stacking until a single player
      wins a hole.
    </p>
    <p class="mb-2">
      If the last hole gets pushed players have to decide on a way to determine
      the winner of the skins that are still on the line. Popular examples are
      CTP, longest drive, or last one to miss a putt.
    </p>
    <p class="mb-4">
      <b>Extra Skins:</b> Players can earn extra skins by landing their first drives closest to the pin (CTP) or by
      having the longest drive. These extra skins are awarded on a hole by hole basis if and when the flight decides to
      compete for them.
    </p>
    <h3 class="font-bold">Tee Order</h3>
    <p class="mb-4">
      Players keep the same tee order throughout the round. The first person to
      take the box rotates with every hole. In other words: the second player to
      tee off on the first hole is the first one to tee off on the second hole,
      and so on.
    </p>
  </FoldoutPanel>
</template>

<script>
import MatchCreator from "./MatchCreator.vue";
import DebtService from "../services/DebtService.js";
import KProgress from "k-progress-v3";
import FoldoutPanel from "./FoldoutPanel.vue";

export default {
  name: "SkinsMatch",
  components: {
    MatchCreator,
    KProgress,
    FoldoutPanel,
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
      deep: true,
    },
  },
  data() {
    return {
      game: null,
      mode: "skin",
    };
  },
  computed: {
    claimText() {
      switch (this.mode) {
        case "skin":
          return "claim";
        case "ctp":
          return "claim ctp";
        case "longdrive":
          return "claim ld";
        default:
          return "claim";
      }
    },
    openSkins() {
      let openSkins = 0;
      for (let i = 0; i < this.game.currentHole - 1; i++) {
        if (this.game.holes[i].pushed === true) {
          openSkins++;
        } else {
          openSkins = 0;
        }
      }
      openSkins++;
      return openSkins;
    },
    percentage() {
      return Math.round((100 * this.game.currentHole) / this.game.holes.length);
    },
    finished() {
      return this.game.currentHole == this.game.holes.length + 1;
    },
    settleDebts() {
      return DebtService.settleDebts(
          this.game.holes,
          this.game.payout,
          JSON.parse(JSON.stringify(this.game.players))
      );
    },
    currentHoleName() {
      return this.game.holes[this.game.currentHole - 1].id;
    },
    currentHoleCTP() {
      return this.game.holes[this.game.currentHole - 1].ctp;
    },
    currentHoleLD() {
      return this.game.holes[this.game.currentHole - 1].longdrive;
    },
  },
  methods: {
    openSkinsHole(hole) {
      let openSkins = 0;
      for (let i = 0; i < hole - 1; i++) {
        if (this.game.holes[i].pushed === true) {
          openSkins++;
        } else {
          openSkins = 0;
        }
      }
      openSkins++;
      return openSkins;
    },
    setMode(mode) {
      if (this.mode === mode) {
        this.mode = "skin";
        return;
      }
      this.game.holes[this.game.currentHole - 1][mode] = null
      this.mode = mode;
    },
    wonSkins(playerId) {
      let won = 0;
      let skinsOnTheLine = 1;
      for (let i = 0; i < this.game.holes.length; i++) {
        if (this.game.holes[i].pushed) {
          skinsOnTheLine++;
        }

        if (this.game.holes[i].winner === playerId) {
          won += skinsOnTheLine;
        }
        if (!this.game.holes[i].pushed) {
          skinsOnTheLine = 1;
        }
        if (this.game.holes[i].ctp === playerId) {
          won += 1;
        }
        if (this.game.holes[i].longdrive === playerId) {
          won += 1;
        }
      }
      return won;
    },
    claimSkin(playerId) {
      this.vibrate();
      switch (this.mode) {
        case "skin":
          this.game.holes[this.game.currentHole - 1].winner = playerId;
          this.game.currentHole++;
          return;
        case "ctp":
          this.game.holes[this.game.currentHole - 1].ctp = playerId;
          this.mode = "skin";
          return;
        case "longdrive":
          this.game.holes[this.game.currentHole - 1].longdrive = playerId;
          this.mode = "skin";
          return;
      }
    },
    vibrate() {
      if (!window) {
        return;
      }

      if (!window.navigator) {
        return;
      }

      if (!window.navigator.vibrate) {
        return;
      }

      window.navigator.vibrate(100);
    },
    push() {
      this.vibrate();

      if (this.game.currentHole === this.game.holes.length) {
        this.game.suddenDeath = true;
        return;
      }
      this.game.holes[this.game.currentHole - 1].pushed = true;
      this.game.currentHole++;
    },
    redoLastHole() {
      if (this.game.suddenDeath) {
        this.game.suddenDeath = false;
        return;
      }
      this.game.currentHole--;
      this.game.holes[this.game.currentHole - 1].winner = null;
      this.game.holes[this.game.currentHole - 1].pushed = null;
      this.game.holes[this.game.currentHole - 1].ctp = null;
      this.game.holes[this.game.currentHole - 1].ld = null;
    },
    newGame() {
      if (confirm("Start new game?")) {
        this.game = null;
      }
    },
    startGame(game) {
      this.game = game;
    },
    playerName(playerId) {
      for (let i = 0; i < this.game.players.length; i++) {
        if (this.game.players[i].id === playerId) {
          return this.game.players[i].name;
        }
      }
      return "Hans";
    },
    firstThrowerStyling(position) {
      if (
          (this.game.currentHole - 1) % this.game.players.length == position &&
          !this.game.suddenDeath
      ) {
        return "bg-neutral-700 -mx-3 px-3";
      }
      if (
          (this.game.currentHole - 1) % this.game.players.length ==
          position - 1 &&
          this.game.suddenDeath
      ) {
        return "bg-neutral-700 -mx-3 px-3";
      }
      return "";
    },
  },
};
</script>

<style>
.k-progress-outer {
  padding-right: 0 !important;
}
</style>
