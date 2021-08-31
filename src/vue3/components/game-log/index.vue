<template lang="pug">
ul.log-box(:style="style")
	li.fn-flex(v-for="item in game.logList")
		span {{ item.date }}
		p {{ item.message }}
</template>
<script lang="ts">
import { computed, defineComponent, reactive, toRefs } from 'vue'
import Game from '@/core/Game'

export default defineComponent({
	name: 'log',
	setup() {
		const game: Game = Game.Instance()
		const state = reactive({ game })
		const style = computed(() => {
			return {
				width: state.game.width + 'px',
			}
		})
		return {
			...toRefs(state),
			style,
		}
	},
})
</script>
<style lang="scss" scoped>
.log-box {
	height: 200px;
	padding: 10px 0;
	overflow-y: auto;
	border: 1px solid #ddd;
	li {
		align-items: center;
		margin-bottom: 8px;

		span {
			padding-left: 10px;
			margin-right: 10px;
			color: #333;
		}
		p {
			color: #295a4c;
		}
	}
}
</style>
