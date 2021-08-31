<template lang="pug">
game-v
</template>
<script lang="ts">
import { reactive, toRefs, defineComponent, onMounted } from 'vue'
import Game from '@/core/Game'
import gameV from '@/vue3/components/game-v/index.vue'

export default defineComponent({
	components: {
		gameV,
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
