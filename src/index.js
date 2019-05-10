'use strict';

let map; // 地图类对象
let snake; // 蛇类对象
let food; // 食物类对象
let timer; // 定时器对象
let sum = 0; // 分数

//地图类
function Map() {
  this.width = 800; // 地图宽度
  this.height = 400; // 地图高度
  this.position = 'absolute'; // 定位方式
  this.color = '#cccccc'; // 地图颜色
  this._map = null; // 保存地图dom元素

  this.show = function () {
    // 用于显示地图
    // 创建地图div元素
    this._map = document.createElement('div');
    //设置地图样式
    this._map.style.left = 0;
    this._map.style.top = 0;
    this._map.style.width = this.width + 'px';
    this._map.style.height = this.height + 'px';
    this._map.style.position = this.position;
    this._map.style.backgroundColor = this.color;

    // 将地图div元素追加到body标签之间
    document.getElementsByTagName('body')[0].appendChild(this._map);
  };
}

//食物类
function Food() {
  this.width = 20; // 宽度
  this.height = 20; // 高度
  this.position = 'absolute'; // 定位方式
  this.color = '#666'; // 食物颜色
  this._food = null; // 用于保存食物dom元素
  this.x = 0; // 横向第几个格
  this.y = 0; // 纵向第几个格

  this.show = function () {
    //用于显示食物
    if (this._food == null) {
      this._food = document.createElement('div');

      //设置食物样式
      this._food.style.width = this.width + 'px';
      this._food.style.height = this.height + 'px';
      this._food.style.position = this.position;
      this._food.style.backgroundColor = this.color;

      map._map.appendChild(this._food);
    }
    //如果之前创建过，只需要重新设置坐标
    this.x = Math.floor(Math.random() * 40);
    this.y = Math.floor(Math.random() * 20);
    this._food.style.left = this.x * this.width + 'px';
    this._food.style.top = this.y * this.height + 'px';
  };
}

//蛇类
function Snake() {
  this.width = 20;    // 蛇节宽度
  this.height = 20;    // 蛇节高度
  this.position = 'absolute'; // 蛇节定位方式
  this.direct = ''; // 蛇的移动方向
  //所有蛇节全部信息
  this.body = [[3, 2, '#333', null], [2, 2, '#666', null], [1, 2, '#666', null]];
  this.speed = 100; // 蛇的移动速度

  this.setDirect = function (code) {
    switch (code) {
      case 37:
        this.direct = 'left';
        break;
      case 38:
        this.direct = 'up';
        break;
      case 39:
        this.direct = 'right';
        break;
      case 40:
        this.direct = 'down';
        break;
    }
  };

  this.show = function () {
    //用于显示蛇
    for (let i = 0; i < this.body.length; i++) {
      if (this.body[i][3] == null) {
        this.body[i][3] = document.createElement('div');
        this.body[i][3].style.width = this.width + 'px';
        this.body[i][3].style.height = this.height + 'px';
        this.body[i][3].style.position = this.position;
        this.body[i][3].style.backgroundColor = this.body[i][2];
        map._map.appendChild(this.body[i][3]);
      }
      //设置蛇节的横纵坐标
      this.body[i][3].style.left = this.body[i][0] * this.width + 'px';
      this.body[i][3].style.top = this.body[i][1] * this.height + 'px';
    }
  };

  this.move = function () {
    //移动蛇身
    let length = this.body.length - 1;
    for (let i = length; i > 0; i--) {
      //让后面的蛇节的坐标等于前面蛇节的坐标
      this.body[i][0] = this.body[i - 1][0]; //横坐标
      this.body[i][1] = this.body[i - 1][1]; //纵坐标

    }
    switch (this.direct) {
      case 'right':
        this.body[0][0] = this.body[0][0] + 1;
        break;
      case 'down':
        this.body[0][1] = this.body[0][1] + 1;
        break;
      case 'left':
        this.body[0][0] = this.body[0][0] - 1;
        break;
      case 'up':
        this.body[0][1] = this.body[0][1] - 1;
        break;
      default:
        return;
    }

    //判断蛇吃到食物
    if (this.body[0][0] == food.x && this.body[0][1] == food.y) {
      let x = this.body[length][0];
      let y = this.body[length][1];
      sum++;
      document.title = '分数:' + sum + '分';
      this.body.push([x, y, '#666', null]);
      food.show();
    }

    //判断撞墙死
    if (this.body[0][0] < 0 || this.body[0][0] > 39 || this.body[0][1] < 0 || this.body[0][1] > 19) {
      alert('撞墙死');
      clearTimeout(timer);
      return;
    }

    //吃到自己死
    for (let i = 1; i < this.body.length; i++) {
      if (this.body[0][0] == this.body[i][0] && this.body[0][1] == this.body[i][1]) {
        alert('吃到自己死');
        clearTimeout(timer);
        return;
      }
    }

    this.show();
  }
}

window.onload = function () {
  map = new Map(); //实例化地图类对象
  map.show();    //显示地图


  food = new Food(); //实例化食物类对象
  food.show(); //显示食物

  snake = new Snake(); //实例化蛇类对象
  snake.show();
  timer = setInterval(function () {
    snake.move()
  }, snake.speed);

  document.onkeydown = function () {
    let code;
    if (window.event) {
      code = window.event.keyCode;
    } else {
      code = event.keyCode;
    }
    snake.setDirect(code);
  };

};