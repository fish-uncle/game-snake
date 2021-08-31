<template lang="pug">
.game-food.pos-a(:style="styleFood")
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, computed } from 'vue'
import Game from '@/core/Game'

export default defineComponent({
	name: 'game-food',
	setup() {
		const game: Game = Game.Instance()
		const state = reactive({ game })

		const styleFood = computed(() => {
			return {
				width: state.game.food.width + 'px',
				height: state.game.food.height + 'px',
				left: state.game.food.x * state.game.food.width + 'px',
				top: state.game.food.y * state.game.food.width + 'px',
			}
		})

		return {
			...toRefs(state),
			styleFood,
		}
	},
})
</script>
<style lang="scss" scoped>
.game-food {
	background-color: #666;
}
</style>
