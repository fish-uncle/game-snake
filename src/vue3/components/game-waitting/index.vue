<template lang="pug">
.game-no-start-bg.pos-a.fn-flex
	.game-start-container
		.game-start-btn.pos-a.cursor-pointer(@click="start") 开始
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import Game from '@/core/Game'

export default defineComponent({
	name: 'game-waitting',
	setup() {
		const game: Game = Game.Instance()
		const state = reactive({ game })

		const start = () => {
			state.game.start()
		}

		return {
			...toRefs(state),
			start,
		}
	},
})
</script>
<style lang="scss" scoped>
.game-start-btn {
	font-size: 20px;
	color: #fff;
	&:hover {
		opacity: 0.8;
	}
}
.game-no-start-bg {
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	overflow: hidden;
	align-items: center;
	justify-content: center;
	background-color: rgba(0, 0, 0, 0.6);
}
</style>
