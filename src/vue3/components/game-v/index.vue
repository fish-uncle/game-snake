<template lang="pug">
game-map
	game-waiting(v-if="game.status === 'WAITING' || game.status === 'END'")
	game-playing(v-if="game.status === 'PLAYING'")
game-log
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from 'vue'
import gamePlaying from '@/vue3/components/game-playing/index.vue'
import gameWaiting from '@/vue3/components/game-waitting/index.vue'
import gameLog from '@/vue3/components/game-log/index.vue'
import gameMap from '@/vue3/components/game-map/index.vue'
import Game from '@/core/Game'

export default defineComponent({
	name: 'game-v',
	components: {
		gameWaiting,
		gamePlaying,
		gameLog,
		gameMap,
	},
	setup() {
		const game: Game = Game.Instance()
		const state = reactive({ game })

		onMounted(() => {
			window.game = state.game
		})

		return {
			...toRefs(state),
		}
	},
})
</script>
