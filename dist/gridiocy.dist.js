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
eval("\n\nvar _gridiocySrc = __webpack_require__(/*! ./js/gridiocy.src.js */ \"./src/js/gridiocy.src.js\");\n\nvar _gridiocySrc2 = _interopRequireDefault(_gridiocySrc);\n\n__webpack_require__(/*! ./js/gridiocy.draggable.js */ \"./src/js/gridiocy.draggable.js\");\n\n__webpack_require__(/*! ./scss/gridiocy.src.scss */ \"./src/scss/gridiocy.src.scss\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n_gridiocySrc2.default.initialize('.gridiocy', 3, 3);\n\n// scss\n// js\n\n//# sourceURL=webpack:///./src/app.js?");

/***/ }),

/***/ "./src/js/gridiocy.draggable.js":
/*!**************************************!*\
  !*** ./src/js/gridiocy.draggable.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\nvar draggable = {};\n\nvar _startX = void 0;\nvar _startY = void 0;\nvar _startWidth = void 0;\nvar _startHeight = void 0;;\nvar _resizeElement = null;\n\ndraggable.init = function (handle) {\n    console.log(handle);\n    handle.addEventListener('mousedown', __initResize, false);\n};\n\nfunction __initResize(e) {\n    _startX = e.clientX;\n    _startY = e.clientY;\n    _startWidth = e.target.parentElement.offsetWidth;\n    _startHeight = e.target.parentElement.offsetHeight;\n    _resizeElement = e;\n\n    _resizeElement.target.parentElement.style.zIndex = 999;\n\n    window.addEventListener('mousemove', __resizeGridItem, false);\n    window.addEventListener('mouseup', __finishResize, false);\n}\n\nfunction __resizeGridItem(e) {\n    _resizeElement.target.parentElement.style.width = _startWidth - (_startX - e.clientX) + 'px';\n    _resizeElement.target.parentElement.style.height = _startHeight - (_startY - e.clientY) + 'px';\n}\nfunction __finishResize(e) {\n    _resizeElement.target.parentElement.style.zIndex = 1;\n    window.removeEventListener('mousemove', __resizeGridItem, false);\n    window.removeEventListener('mouseup', __finishResize, false);\n}\n\nexports.default = draggable;\n\n//# sourceURL=webpack:///./src/js/gridiocy.draggable.js?");

/***/ }),

/***/ "./src/js/gridiocy.src.js":
/*!********************************!*\
  !*** ./src/js/gridiocy.src.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _gridiocyDraggable = __webpack_require__(/*! ./gridiocy.draggable.js */ \"./src/js/gridiocy.draggable.js\");\n\nvar _gridiocyDraggable2 = _interopRequireDefault(_gridiocyDraggable);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar gridiocy = {};\n\ngridiocy.initialize = function (indentifier, columns, rows) {\n\n    var markup = '\\n        <div class=\"gridiocy-grid\" style=\"grid-template-columns: ' + new Array(columns).fill(\"1fr\").join(' ') + ';\">\\n            ' + new Array(columns * rows).fill(null).map(function (item, index) {\n        return '<div class=\"gridiocy-item\" style=\"grid-column: auto / span 1; grid-row: auto / span 1\">\\n                <div class=\"gridiocy-item-content gridiocy-item-content-resizable\">\\n                    <div class=\"gridiocy-item-draggable-handle\"></div>\\n                </div>\\n            </div>';\n    }).join('') + '\\n        </div>\\n    ';\n\n    document.querySelector(indentifier).innerHTML = markup;\n\n    Array.from(document.getElementsByClassName('gridiocy-item-content-resizable')).forEach(function (element) {\n        element.style.width = element.parentElement.offsetWidth + 'px';\n        element.style.height = element.parentElement.offsetHeight + 'px';\n    });\n\n    Array.from(document.getElementsByClassName('gridiocy-item-draggable-handle')).forEach(function (element) {\n        return _gridiocyDraggable2.default.init;\n    });\n};\n\nexports.default = gridiocy;\n\n//# sourceURL=webpack:///./src/js/gridiocy.src.js?");

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