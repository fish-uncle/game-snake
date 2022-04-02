import Factory from '@/core/Base/factory'
import Food from '@/core/Food'
import Snake from '@/core/Snake'
import LogTask from '@/core/Log/task'

const width = 1000 // 地图宽度
const height = 800 // 地图高度
const blockWidth = 20 // 单元格宽度
const blockHeight = 20 // 单元格高度
export default class Game extends Factory<Game> {
	debug = true
	score = 0 // 得分
	width = width
	height = height
	status: 'WAITING' | 'PLAYING' | 'END' = 'WAITING'
	logList: Array<LogTask> = []
	snake: Snake = Snake.Instance({
		blockWidth,
		blockHeight,
		numX: width / blockWidth,
		numY: height / blockHeight,
	})
	food: Food = Food.Instance({
		blockWidth,
		blockHeight,
		numX: width / blockWidth,
		numY: height / blockHeight,
	})
	timer: any = null
	canvas: any = null
	ctx: any = null

	// 添加日志
	pusLog(message: string): void {
		this.logList.push(new LogTask(message))
	}

	// 清空日志
	clearLog(): void {
		this.logList = []
	}

	// 游戏开始
	start() {
		this.canvas = document.getElementById('canvas')
		this.canvas.width = width
		this.canvas.height = height

		this.score = 0
		this.snake.reborn()
		this.status = 'PLAYING'
		if (this.debug) {
			this.pusLog('游戏开始……')
			this.pusLog(`当前速度 ${1000 / this.snake.speed}……`)
		}
		this.timer = setInterval(() => {
			this.move()
		}, this.snake.speed)
	}

	end() {
		clearTimeout(this.timer)
		this.status = 'END'
		this.pusLog('游戏结束……')
		this.pusLog('总得分：' + this.score)
	}

	move() {
		//移动蛇身
		const length = this.snake.body.length - 1
		for (let i = length; i > 0; i--) {
			//让后面的蛇节的坐标等于前面蛇节的坐标
			this.snake.body[i][0] = this.snake.body[i - 1][0] //横坐标
			this.snake.body[i][1] = this.snake.body[i - 1][1] //纵坐标
		}
		switch (this.snake.direct) {
			case 'right':
				this.snake.body[0][0] = this.snake.body[0][0] + 1
				break
			case 'down':
				this.snake.body[0][1] = this.snake.body[0][1] + 1
				break
			case 'left':
				this.snake.body[0][0] = this.snake.body[0][0] - 1
				break
			case 'up':
				this.snake.body[0][1] = this.snake.body[0][1] - 1
				break
			default:
				return
		}

		//判断蛇吃到食物
		if (this.snake.body[0][0] == this.food.x && this.snake.body[0][1] == this.food.y) {
			const x = this.snake.body[length][0]
			const y = this.snake.body[length][1]
			this.score = this.score + 1
			this.pusLog('分数:' + this.score + '分')
			if (this.snake.speed > 10) this.snake.speed -= 50
			this.pusLog(`当前速度 ${1000 / this.snake.speed}……`)
			this.snake.body = [...this.snake.body, [x, y]]
			this.food.move()
		}

		//判断撞墙死
		if (
			this.snake.body[0][0] < 0 ||
			this.snake.body[0][0] > width / blockWidth - 1 ||
			this.snake.body[0][1] < 0 ||
			this.snake.body[0][1] > height / blockHeight - 1
		) {
			this.pusLog('撞墙死...')
			this.end()
			return
		}

		//吃到自己死
		for (let i = 1; i < this.snake.body.length; i++) {
			if (this.snake.body[0][0] == this.snake.body[i][0] && this.snake.body[0][1] == this.snake.body[i][1]) {
				this.pusLog('吃到自己死...')
				this.end()
				return
			}
		}
	}
}
