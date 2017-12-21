# 多用户任务管理系统

## 采用的技术

### 前端技术
- 使用 HTML5、scss
- 使用 javascript、jQuery

### 前端构建技术
- Node.js 6+/ Yarn
- Gulp、Webpack、Babel
- TSC

### 安装
yarn add --dev gulp gulp-util
yarn add --dev gulp-less
yarn add -D webpack-stream@3.2.0
yarn add --dev babel-core babel-loader babel-preset-es2015

## 游戏算法
随机位置，采用Fisher-Yates洗牌算法

检查算法
  检查成功条件:每行、每列、每宫都有1-9

  数据抽取

  抽取行数据
  抽取列数据
  抽取宫数据

  抽取宫数据-坐标计算


    第六宫，序号 n=5（序号从0开始）
          坐标：bx = n%3 =2;
               by = n/3 =1;

起始宫内小格坐标：x0 = bx * 3 = 6;
               y0 = by * 3 = 3;
其它宫内小格坐标：x = x0 + i % 3;
  小格的序号为i: y = y0 + i / 3;


## 启动项目
yarn install
cd src
gulp && gulp watch

cd www
打开index.html在浏览器显示


