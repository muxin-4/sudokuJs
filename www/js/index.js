/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	const Grid = __webpack_require__(1);
	
	
	
	const grid = new Grid($("#container"));
	grid.build();
	grid.layout();
	
	


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * 生成九宫格
	 */
	
	const Toolkit = __webpack_require__(2);
	const Sudoku = __webpack_require__(3);
	
	class Grid {
	  constructor(container) {
	    this._$container = container;
	  }
	
	  build() {
	
	    const sudoku = new Sudoku();
	    sudoku.make();
	    const matrix = sudoku.puzzleMatrix;
	
	    // const generator = new Generator();
	    // generator.generate();
	    // const matrix = generator.matrix;
	
	    const rowGroupClasses = ["row_g_top", "row_g_middle", "row_g_bottom"];
	    const colGroupClasses = ["col_g_left", "col_g_center", "col_g_right"];
	
	    const $cells = matrix.map(rowValues => rowValues
	      .map((cellValue, colIndex) => {
	
	        return $("<span>")
	          .addClass(colGroupClasses[colIndex % 3])
	          .addClass(cellValue ? "fixed" : "empty")
	          .text(cellValue);
	      }));
	
	    const $divArray = $cells
	      .map(($spanArray, rowIndex) => {
	
	        return $("<div>")
	          .addClass("row")
	          .addClass(rowGroupClasses[rowIndex % 3])
	          .append($spanArray);
	      });
	
	    this._$container.append($divArray);
	  }
	
	
	  layout() {
	    const width = $("span:first", this._$container).width();
	    $("span", this._$container)
	      .height(width)
	      .css({
	        "line-height": `${width}px`,
	        "font-size": width < 32 ? `${width /2}px` : ""
	      })
	  }
	}
	
	module.exports = Grid;


/***/ }),
/* 2 */
/***/ (function(module, exports) {

	/**
	 * 矩阵和数组相关工具
	 */
	
	const matrixToolkit = {
	
	  makeRow(v = 0) {
	      const array = new Array(9);
	      array.fill(v);
	      return array;
	  },
	
	  makeMatrix(v = 0) {
	      return Array.from({ length: 9 }, () => this.makeRow(v));
	  },
	
	  /**
	   * Fisher-Yates 洗牌算法
	   * 对传入数组进行随机排序，然后把这个数组返回出来
	   * @param {any} array
	   */
	
	  shuffle(array) {
	    const endIndex = array.length - 2;
	    for (let i = 0; i <= endIndex; i++) {
	      const j = i + Math.floor(Math.random() * (array.length - i));
	      [array[i], array[j]] = [array[j], array[i]];
	    }
	    return array;
	  },
	
	  /**
	   * 检查指定位置可以填写数字 n
	   */
	  checkFillable(matrix, n, rowIndex, colIndex) {
	    const row = matrix[rowIndex];
	    const column = this.makeRow().map((v, i) => matrix[i][colIndex]);
	    const { boxIndex } = boxTookit.convertToBoxIndex(rowIndex, colIndex);
	
	    // console.log('3' + matrix);
	    // console.log('4' + boxIndex);
	    // console.log('5' + rowIndex);
	    // console.log('6' + colIndex);
	    const box = boxTookit.getBoxCells(matrix, boxIndex);
	    for (let i = 0; i < 9; i++) {
	      if (row[i] === n
	          || column[i] === n
	          || box[i] === n){
	            return false;
	          }
	    }
	    return true;
	  }
	};
	
	/**
	 * 宫坐标系工具
	 */
	const boxTookit = {
	
	  getBoxCells(matrix, boxIndex) {
	    // console.log('test2'+matrix);
	    // console.log('test3'+boxIndex);
	    const startRowIndex = Math.floor(boxIndex / 3) * 3;
	    // console.log(startRowIndex);
	    const startColIndex = boxIndex % 3 * 3;
	    const result = [];
	    for (let cellIndex = 0; cellIndex < 9; cellIndex++) {
	      const rowIndex = startRowIndex + Math.floor( cellIndex / 3);
	      // console.log(rowIndex);
	      const colIndex = startColIndex + cellIndex % 3;
	      // console.log(colIndex);
	      result.push(matrix[rowIndex][colIndex]);
	    }
	    return result;
	  },
	
	  convertToBoxIndex(rowIndex, colIndex) {
	    return {
	      boxIndex: Math.floor(rowIndex / 3) * 3 + Math.floor(colIndex / 3),
	      cellIndex: rowIndex % 3 * 3 + colIndex % 3
	    }
	  },
	
	  convertFromBoxIndex(boxIndex, cellIndex) {
	    return {
	      rowIndex: Math.floor(boxIndex / 3) * 3 + Math.floor(cellIndex / 3),
	      colIndex: boxIndex % 3 * 3 + cellIndex % 3
	    }
	
	  }
	};
	
	// 工具集
	module.exports = class Toolkit {
	
	  /**
	   * 矩阵和数组相关工具
	   */
	
	  static get matrix() {
	    return matrixToolkit;
	  }
	
	  /**
	   * 宫坐标系工具
	   */
	  static get box() {
	    return boxTookit;
	  }
	};


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * 生成数独游戏
	 */
	
	
	 //1. 生成完成的解决方案： Generator
	 //2. 随机去除部分数据： 按比例
	
	 const Generator = __webpack_require__(4);
	
	 module.exports = class Sudoku {
	   constructor () {
	     // 生成完成的解决方案
	     const generator = new Generator();
	     generator.generate();
	     this.solutionMatrix = generator.matrix;
	   }
	
	   make(level = 5) {
	    //  const shouldRid = Math.random() * 9 < level;
	     // 生成迷盘
	     this.puzzleMatrix = this.solutionMatrix.map(row => {
	      return row.map(cell => Math.random() * 9 < level ? 0 : cell);
	     });
	
	   }
	 };


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	// 生成数独解决方案
	const Toolkit = __webpack_require__(2);
	
	module.exports = class Generator {
	
	  generate() {
	    while (!this.internalGenerate()) {
	      // TODO
	      console.warn("try again");
	    }
	  }
	
	  internalGenerate() {
	    this.matrix = Toolkit.matrix.makeMatrix();
	    this.orders = Toolkit.matrix.makeMatrix()
	        .map(row => row.map((v, i) => i))
	        .map(row => Toolkit.matrix.shuffle(row));
	
	
	    for (let n = 1; n <= 9; n++) {
	      if (!this.fillNumber(n)) {
	        return false;
	      }
	      this.fillNumber(n);
	    }
	    return true;
	  }
	
	  fillNumber(n) {
	    return this.fillRow(n, 0);
	  }
	
	  fillRow(n, rowIndex) {
	    if (rowIndex > 8) {
	      return true;
	    }
	
	    const row = this.matrix[rowIndex];
	    const orders = this.orders[rowIndex];
	    // TODO 随机选择列
	    for (let i = 0; i < 9; i++) {
	      const colIndex = orders[i];
	      // 如果这个位置已经有值，跳过
	      if (row[colIndex]) {
	        continue;
	      }
	
	      // console.log("1"+ rowIndex);
	      // console.log("2"+ colIndex);
	
	      // 检查这个位置是否可以填n
	      if (!Toolkit.matrix.checkFillable(this.matrix, n, rowIndex, colIndex)) {
	        continue;
	      }
	
	      row[colIndex] = n;
	
	      // 去下一行填写n，如果没填进去，就继续寻找当前行下一个位置
	      if (!this.fillRow(n, rowIndex + 1)) {
	        row[colIndex] = 0;
	        continue;
	      }
	
	      return true;
	    }
	
	    return false;
	  }
	}
	
	


/***/ })
/******/ ]);
//# sourceMappingURL=index.js.map