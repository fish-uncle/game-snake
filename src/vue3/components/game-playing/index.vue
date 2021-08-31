<template lang="pug">
.game-start-bg.pos-a
	game-snake
	game-food
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import gameFood from '@/vue3/components/game-food/index.vue'
import gameSnake from '@/vue3/components/game-snake/index.vue'

export default defineComponent({
	name: 'game-playing',
	components: { gameFood, gameSnake },
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
