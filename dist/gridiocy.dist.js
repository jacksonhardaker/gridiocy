/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _gridiocySrc = __webpack_require__(/*! ./js/gridiocy.src.js */ \"./src/js/gridiocy.src.js\");\n\n__webpack_require__(/*! ./js/gridiocy.draggable.js */ \"./src/js/gridiocy.draggable.js\");\n\n__webpack_require__(/*! ./scss/gridiocy.src.scss */ \"./src/scss/gridiocy.src.scss\");\n\n_gridiocySrc.gridiocy.initialize('.gridiocy', 3, 3);\n\n// scss\n// js\n\n//# sourceURL=webpack:///./src/app.js?");

/***/ }),

/***/ "./src/js/gridiocy.draggable.js":
/*!**************************************!*\
  !*** ./src/js/gridiocy.draggable.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _gridiocySrc = __webpack_require__(/*! ./gridiocy.src.js */ \"./src/js/gridiocy.src.js\");\n\nvar draggable = {};\n\nvar _startX = void 0;\nvar _startY = void 0;\nvar _startWidth = void 0;\nvar _startHeight = void 0;\nvar _contentBlock = void 0;\nvar _startingRowSpan = void 0;\nvar _startingColumnSpan = void 0;\nvar _maxColumns = void 0;\nvar _thresholdWidth = void 0;\n\ndraggable.init = function (handle, maxColumns) {\n    handle.addEventListener('mousedown', __initResize, false);\n    _maxColumns = maxColumns;\n};\n\nfunction __initResize(e) {\n    _contentBlock = e.target.parentElement;\n    _thresholdWidth = _contentBlock.parentElement.parentElement.offsetWidth / _maxColumns;\n\n    _startX = e.clientX;\n    _startY = e.clientY;\n    _startWidth = _contentBlock.offsetWidth;\n    _startHeight = _contentBlock.offsetHeight;\n    _startingColumnSpan = _contentBlock.parentElement.dataset.columnSpan;\n    _startingRowSpan = _contentBlock.parentElement.dataset.rowSpan;\n\n    _contentBlock.style.zIndex = 999;\n\n    window.addEventListener('mousemove', __resizeGridItem, false);\n    window.addEventListener('mouseup', __finishResize, false);\n}\n\nfunction __resizeGridItem(e) {\n    _contentBlock.style.width = _startWidth - (_startX - e.clientX) + 'px';\n    _contentBlock.style.height = _startHeight - (_startY - e.clientY) + 'px';\n\n    __isContentLargerThanContainer(_contentBlock);\n}\n\nfunction __finishResize(e) {\n\n    window.removeEventListener('mousemove', __resizeGridItem, false);\n    window.removeEventListener('mouseup', __finishResize, false);\n\n    _contentBlock.style.zIndex = 1;\n    (0, _gridiocySrc.resizeToFit)(_contentBlock);\n}\nfunction __isContentLargerThanContainer(contentBlock) {\n\n    // Width\n    var exceedsWidth = _thresholdWidth * (Number(contentBlock.parentElement.dataset.columnSpan) + 0.5) < contentBlock.offsetWidth;\n    var smallerWidthThan = _thresholdWidth * (Number(contentBlock.parentElement.dataset.columnSpan) - 0.5) > contentBlock.offsetWidth;\n    //let exceedsHeight = (contentBlock.parentElement.offsetHeight * 1.5) < contentBlock.offsetHeight;\n\n    contentBlock.parentElement.dataset.columnSpan = exceedsWidth ? Number(contentBlock.parentElement.dataset.columnSpan) + 1 : contentBlock.parentElement.dataset.columnSpan;\n    contentBlock.parentElement.dataset.columnSpan = smallerWidthThan ? Number(contentBlock.parentElement.dataset.columnSpan) - 1 : contentBlock.parentElement.dataset.columnSpan;\n    //contentBlock.parentElement.dataset.rowSpan = exceedsHeight ? Number(contentBlock.parentElement.dataset.rowSpan) + 1 : contentBlock.parentElement.dataset.rowSpan;\n\n    contentBlock.parentElement.style.gridColumn = 'auto / span ' + contentBlock.parentElement.dataset.columnSpan;\n    //contentBlock.parentElement.style.gridRow = `auto / span ${contentBlock.parentElement.dataset.rowSpan}`;\n\n    // Height\n    var exceedsHeight = 200 * (Number(contentBlock.parentElement.dataset.rowSpan) + 0.5) < contentBlock.offsetHeight;\n    var smallerHeightThan = 200 * (Number(contentBlock.parentElement.dataset.rowSpan) - 0.5) > contentBlock.offsetHeight;\n\n    contentBlock.parentElement.dataset.rowSpan = exceedsHeight ? Number(contentBlock.parentElement.dataset.rowSpan) + 1 : contentBlock.parentElement.dataset.rowSpan;\n    contentBlock.parentElement.dataset.rowSpan = smallerHeightThan ? Number(contentBlock.parentElement.dataset.rowSpan) - 1 : contentBlock.parentElement.dataset.rowSpan;\n\n    contentBlock.parentElement.style.gridRow = 'auto / span ' + contentBlock.parentElement.dataset.rowSpan;\n}\n\nexports.default = draggable;\n\n//# sourceURL=webpack:///./src/js/gridiocy.draggable.js?");

/***/ }),

/***/ "./src/js/gridiocy.src.js":
/*!********************************!*\
  !*** ./src/js/gridiocy.src.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\nexports.resizeToFit = exports.gridiocy = undefined;\n\nvar _gridiocyDraggable = __webpack_require__(/*! ./gridiocy.draggable.js */ \"./src/js/gridiocy.draggable.js\");\n\nvar _gridiocyDraggable2 = _interopRequireDefault(_gridiocyDraggable);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar gridiocy = {};\n\ngridiocy.initialize = function (indentifier, columns, rows) {\n\n    var markup = '\\n        <div class=\"gridiocy-grid\" style=\"grid-template-columns: ' + new Array(columns).fill(\"1fr\").join(' ') + '; grid-template-rows: ' + new Array(50).fill(\"1fr\").join(' ') + ';\">\\n            ' + new Array(columns * rows).fill(null).map(function (item, index) {\n        return '<div class=\"gridiocy-item\" style=\"grid-column: auto / span 1; grid-row: auto / span 1\" data-column-span=\"1\" data-row-span=\"1\">\\n                <div class=\"gridiocy-item-content gridiocy-item-content-resizable\">\\n                    <div class=\"gridiocy-item-draggable-handle\"></div>\\n                </div>\\n            </div>';\n    }).join('') + '\\n        </div>\\n    ';\n\n    document.querySelector(indentifier).innerHTML = markup;\n\n    Array.from(document.getElementsByClassName('gridiocy-item-content-resizable')).forEach(function (element) {\n        resizeToFit(element);\n    });\n\n    Array.from(document.getElementsByClassName('gridiocy-item-draggable-handle')).forEach(function (element) {\n        _gridiocyDraggable2.default.init(element, columns);\n    });\n};\n\nfunction resizeToFit(contentBlock) {\n    contentBlock.style.width = contentBlock.parentElement.offsetWidth + 'px';\n    contentBlock.style.height = contentBlock.parentElement.offsetHeight + 'px';\n}\n\nexports.gridiocy = gridiocy;\nexports.resizeToFit = resizeToFit;\n\n//# sourceURL=webpack:///./src/js/gridiocy.src.js?");

/***/ }),

/***/ "./src/scss/gridiocy.src.scss":
/*!************************************!*\
  !*** ./src/scss/gridiocy.src.scss ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// removed by extract-text-webpack-plugin\n    if(false) { var cssReload; }\n  \n\n//# sourceURL=webpack:///./src/scss/gridiocy.src.scss?");

/***/ })

/******/ });