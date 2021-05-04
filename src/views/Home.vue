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

    <div>
      <FoldoutPanel
          title="Rules"
      >
        <h3 class="text-lg">What's a Skins Match?</h3>
        <p class="mb-4">
          <i>Skins</i> is a match play type format for golf-like games, most commonly played by three or four players.
          Players compete for money or other rewards on a per-hole basis.
        </p>
        <h3 class="text-lg">How To Play</h3>
        <p class="mb-2">
          Before the game players decide on reward for winning a hole - called a "skin", e.g. $5 per hole. Players can
          either pool their money at the start of the game and pay the winner
          directly after each whole or settle their debts after the game.
        </p>
        <p class="mb-2">As a match play type format every hole is played by itself. The single player with the lowest
          score on a hole
          wins
          the skin and reaps the reward for that hole.</p>
        <p class="mb-2"><b>Pushing the hole:</b> Should two or more players have an equally low best score nobody wins
          the skin. The
          prize is kept in the pot and gets added to the next hole's skin. Skins keep stacking until a single player
          wins a hole.</p>
        <p class="mb-4">If the last hole gets pushed players have to decide on a way to determine the winner of the
          skins that are
          still on the line. Popular examples are CTP, longest drive, or last one to miss a putt.</p>
        <h3 class="font-bold">Tee Order</h3>
        <p class="mb-4">
          Players keep the same tee order throughout the round. The first person to take the box rotates with every
          hole. In other words: the second player to tee off on the first hole is the first one to tee off on the second
          hole, and so on.
        </p>
      </FoldoutPanel>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import SkinsMatch from "@/components/SkinsMatch.vue";
import FoldoutPanel from "@/components/FoldoutPanel";

export default {
  name: "Home",
  components: {
    SkinsMatch,
    FoldoutPanel
  },
};
</script>
