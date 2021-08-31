<template lang="pug">
.game-snake.pos-a(v-for="snake in game.snake.body" :style="styleSnake(snake)")
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted, onBeforeMount } from 'vue'
import Game from '@/core/Game'
import { on, off } from '@/vue3/utils/dom'

export default defineComponent({
	name: 'game-snake',
	setup() {
		const game: Game = Game.Instance()
		const state = reactive({ game })

		const styleSnake = snake => {
			return {
				width: state.game.snake.width + 'px',
				height: state.game.snake.height + 'px',
				left: snake[0] * state.game.food.width + 'px',
				top: snake[1] * state.game.food.height + 'px',
			}
		}

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
			styleSnake,
		}
	},
})
</script>
<style lang="scss" scoped>
.game-snake {
	background-color: #666;
	&:first-child {
		background-color: #333;
	}
}
</style>
