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

	const toolkit = __webpack_require__(1);
	
	class Grid {
	  constructor(container) {
	    this._$container = container;
	  }
	
	  build() {
	    const matrix = toolkit.makeMatrix();
	
	    const rowGroupClasses = ["row_g_top", "row_g_middle", "row_g_bottom"];
	    const colGroupClasses = ["col_g_left", "col_g_center", "col_g_right"];
	
	    const $cells = matrix.map(rowValues => rowValues
	      .map((cellValue, colIndex) => {
	
	        return $("<span>")
	          .addClass(colGroupClasses[colIndex % 3])
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
	        "line-height": '${width}px',
	        "font-size": width < 32 ? '${width /2}px' : ""
	      })
	  }
	}
	
	const grid = new Grid($("#container"));
	grid.build();
	grid.layout();
	
	


/***/ }),
/* 1 */
/***/ (function(module, exports) {

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
	   * @param {any} array
	   */
	
	  shuffle(array) {
	    const endIndex = array.length - 2;
	    for (let i = 0; i <= endIndex; i++) {
	      const j = i + Math.floor(Math.random() * (array.length - i));
	      [array[i], array[j]] = [array[j], array[i]];
	    }
	    return array;
	  }
	};
	
	module.exports = matrixToolkit;


/***/ })
/******/ ]);
//# sourceMappingURL=index.js.map