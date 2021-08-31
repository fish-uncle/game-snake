<template lang="pug">
.game-map.pos-r(:style="styleMap")
	slot
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, computed } from 'vue'
import Game from '@/core/Game'

export default defineComponent({
	name: 'game-map',
	setup() {
		const game: Game = Game.Instance()
		const state = reactive({ game })

		const styleMap = computed(() => {
			return {
				width: state.game.width + 'px',
				height: state.game.height + 'px',
			}
		})

		return {
			...toRefs(state),
			styleMap,
		}
	},
})
</script>
<style lang="scss" scoped>
.game-map {
	background-color: #ccc;
}
</style>
