'use strict'

let map // 地图类对象
let snake // 蛇类对象
let food // 食物类对象
let timer // 定时器对象
let sum = 0 // 分数

//蛇类
function Snake() {
	this.width = 20 // 蛇节宽度
	this.height = 20 // 蛇节高度
	this.position = 'absolute' // 蛇节定位方式
	this.direct = '' // 蛇的移动方向
	//所有蛇节全部信息
	this.body = [
		[3, 2, '#333', null],
		[2, 2, '#666', null],
		[1, 2, '#666', null],
	]
	this.speed = 100 // 蛇的移动速度

	this.setDirect = function (code) {
		switch (code) {
			case 37:
				this.direct = 'left'
				break
			case 38:
				this.direct = 'up'
				break
			case 39:
				this.direct = 'right'
				break
			case 40:
				this.direct = 'down'
				break
		}
	}

	this.show = function () {
		//用于显示蛇
		for (let i = 0; i < this.body.length; i++) {
			if (this.body[i][3] == null) {
				this.body[i][3] = document.createElement('div')
				this.body[i][3].style.width = this.width + 'px'
				this.body[i][3].style.height = this.height + 'px'
				this.body[i][3].style.position = this.position
				this.body[i][3].style.backgroundColor = this.body[i][2]
				map._map.appendChild(this.body[i][3])
			}
			//设置蛇节的横纵坐标
			this.body[i][3].style.left = this.body[i][0] * this.width + 'px'
			this.body[i][3].style.top = this.body[i][1] * this.height + 'px'
		}
	}

	this.move = function () {
		//移动蛇身
		let length = this.body.length - 1
		for (let i = length; i > 0; i--) {
			//让后面的蛇节的坐标等于前面蛇节的坐标
			this.body[i][0] = this.body[i - 1][0] //横坐标
			this.body[i][1] = this.body[i - 1][1] //纵坐标
		}
		switch (this.direct) {
			case 'right':
				this.body[0][0] = this.body[0][0] + 1
				break
			case 'down':
				this.body[0][1] = this.body[0][1] + 1
				break
			case 'left':
				this.body[0][0] = this.body[0][0] - 1
				break
			case 'up':
				this.body[0][1] = this.body[0][1] - 1
				break
			default:
				return
		}

		//判断蛇吃到食物
		if (this.body[0][0] == food.x && this.body[0][1] == food.y) {
			let x = this.body[length][0]
			let y = this.body[length][1]
			sum++
			document.title = '分数:' + sum + '分'
			this.body.push([x, y, '#666', null])
			food.show()
		}

		//判断撞墙死
		if (this.body[0][0] < 0 || this.body[0][0] > 39 || this.body[0][1] < 0 || this.body[0][1] > 19) {
			alert('撞墙死')
			clearTimeout(timer)
			return
		}

		//吃到自己死
		for (let i = 1; i < this.body.length; i++) {
			if (this.body[0][0] == this.body[i][0] && this.body[0][1] == this.body[i][1]) {
				alert('吃到自己死')
				clearTimeout(timer)
				return
			}
		}

		this.show()
	}
}

window.onload = function () {
	map = new Map() //实例化地图类对象
	map.show() //显示地图

	food = new Food() //实例化食物类对象
	food.show() //显示食物

	snake = new Snake() //实例化蛇类对象
	snake.show()
	timer = setInterval(function () {
		snake.move()
	}, snake.speed)

	document.onkeydown = function () {
		let code
		if (window.event) {
			code = window.event.keyCode
		} else {
			code = event.keyCode
		}
		snake.setDirect(code)
	}
}
