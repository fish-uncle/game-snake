import Factory from '@/core/Base/factory'

//食物类
export default class Food extends Factory<Food> {
	width: number // 宽度
	height: number // 高度
	numX: number
	numY: number
	x = 0 // 横向第几个格
	y = 0 // 纵向第几个格

	constructor(obj: { blockWidth: number; blockHeight: number; numX: number; numY: number }) {
		super()
		this.width = obj.blockWidth
		this.height = obj.blockHeight
		this.numX = obj.numX
		this.numY = obj.numY
		this.x = Math.floor(Math.random() * this.numX)
		this.y = Math.floor(Math.random() * this.numY)
	}

	move() {
		this.x = Math.floor(Math.random() * this.numX)
		this.y = Math.floor(Math.random() * this.numY)
	}
}
