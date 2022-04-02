<template lang="pug">
.game-start-bg.pos-a
	canvas#canvas
	game-food
</template>
<script lang="ts">
import { defineComponent, onBeforeMount, onMounted, reactive, toRefs } from 'vue'
import gameFood from '@/vue3/components/game-food/index.vue'
import Game from '@/core/Game'
import { off, on } from '@/vue3/utils/dom'

export default defineComponent({
	name: 'game-playing',
	components: { gameFood },
	setup() {
		const game: Game = Game.Instance()
		const state = reactive({ game })

		const keydown = e => {
			if (state.game.status === 'PLAYING') {
				let direct
				switch (e.keyCode) {
					case 37:
						direct = 'left'
						break
					case 38:
						direct = 'up'
						break
					case 39:
						direct = 'right'
						break
					case 40:
						direct = 'down'
						break
				}
				state.game.snake.direct = direct
			}
		}

		onBeforeMount(() => {
			off(document.documentElement, 'keydown', keydown)
		})

		onMounted(() => {
			on(document.documentElement, 'keydown', keydown)
		})

		return {
			...toRefs(state),
		}
	},
})
</script>
<style lang="scss" scoped>
.game-start-bg {
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	overflow: hidden;
}
</style>
