import Factory from '@/core/Base/factory'

//蛇类
export default class Snake extends Factory<Snake> {
	width: number // 蛇节宽度
	height: number // 蛇节高度
	direct: 'left' | 'up' | 'right' | 'down' = 'right' // 蛇的移动方向
	//所有蛇节全部信息
	body = [
		[3, 2],
		[2, 2],
		[1, 2],
	]
	speed = 700 // 蛇的移动速度

	constructor(obj: { blockWidth: number; blockHeight: number; numX: number; numY: number }) {
		super()
		this.width = obj.blockWidth
		this.height = obj.blockHeight
	}

	reborn() {
		this.body = [
			[3, 2],
			[2, 2],
			[1, 2],
		]
		this.speed = 700
		this.direct = 'right'
		this.draw()
	}

	draw() {
		const canvas: any = document.getElementById('canvas')
		const c: any = canvas.getContext('2d')
		c.clearRect(0, 0, canvas.width, canvas.height)
		c.beginPath()
		for (let i = 0; i < this.body.length; i++) {
			c.fullStyle = '#ffffff'
			c.lineStyle = '#ffffff'
			c.fillRect(this.body[i][0] * 20, this.body[i][1] * 20, 20, 20)
		}
		requestAnimationFrame(this.draw.bind(this))
	}
}
