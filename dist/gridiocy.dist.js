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
eval("\n\nvar _gridiocySrc = __webpack_require__(/*! ./js/gridiocy.src.js */ \"./src/js/gridiocy.src.js\");\n\n__webpack_require__(/*! ./js/gridiocy.resizable.js */ \"./src/js/gridiocy.resizable.js\");\n\n__webpack_require__(/*! ./scss/gridiocy.src.scss */ \"./src/scss/gridiocy.src.scss\");\n\n_gridiocySrc.gridiocy.initialize('.gridiocy', 3, 3, { resizable: true });\n\n// scss\n// js\n\n//# sourceURL=webpack:///./src/app.js?");

/***/ }),

/***/ "./src/js/gridiocy.resizable.js":
/*!**************************************!*\
  !*** ./src/js/gridiocy.resizable.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _gridiocySrc = __webpack_require__(/*! ./gridiocy.src.js */ \"./src/js/gridiocy.src.js\");\n\nvar resizable = {};\n\nvar startX = void 0;\nvar startY = void 0;\nvar startWidth = void 0;\nvar startHeight = void 0;\nvar contentBlock = void 0;\nvar maxColumns = void 0;\nvar thresholdWidth = void 0;\nvar gridiocyGrid = void 0;\n\nresizable.init = function (handle, columns) {\n    handle.addEventListener('mousedown', initResize, false);\n    maxColumns = columns;\n};\n\nfunction initResize(e) {\n    contentBlock = e.target.parentElement;\n    gridiocyGrid = contentBlock.parentElement.parentElement;\n    thresholdWidth = gridiocyGrid.offsetWidth / maxColumns;\n\n    gridiocyGrid.style.gridTemplateRows = new Array(50).fill(\"1fr\").join(' ');\n    //grid-template-rows: ${ new Array(50).fill(\"1fr\").join(' ')};\n\n    startX = e.clientX;\n    startY = e.clientY;\n    startWidth = contentBlock.offsetWidth;\n    startHeight = contentBlock.offsetHeight;\n\n    contentBlock.style.zIndex = 999;\n\n    window.addEventListener('mousemove', resizeGridItem, false);\n    window.addEventListener('mouseup', finishResize, false);\n}\n\nfunction resizeGridItem(e) {\n    contentBlock.style.width = startWidth - (startX - e.clientX) + 'px';\n    contentBlock.style.height = startHeight - (startY - e.clientY) + 'px';\n\n    isContentLargerThanContainer(contentBlock);\n}\n\nfunction finishResize(e) {\n\n    window.removeEventListener('mousemove', resizeGridItem, false);\n    window.removeEventListener('mouseup', finishResize, false);\n\n    gridiocyGrid.style.gridTemplateRows = 'auto';\n    contentBlock.style.zIndex = 1;\n    (0, _gridiocySrc.resizeToFit)(contentBlock);\n}\nfunction isContentLargerThanContainer(contentBlock) {\n\n    // Width\n    var exceedsWidth = thresholdWidth * (Number(contentBlock.parentElement.dataset.columnSpan) + 0.5) < contentBlock.offsetWidth;\n    var smallerWidthThan = thresholdWidth * (Number(contentBlock.parentElement.dataset.columnSpan) - 0.5) > contentBlock.offsetWidth;\n\n    contentBlock.parentElement.dataset.columnSpan = exceedsWidth ? Number(contentBlock.parentElement.dataset.columnSpan) + 1 : contentBlock.parentElement.dataset.columnSpan;\n    contentBlock.parentElement.dataset.columnSpan = smallerWidthThan ? Number(contentBlock.parentElement.dataset.columnSpan) - 1 : contentBlock.parentElement.dataset.columnSpan;\n\n    contentBlock.parentElement.style.gridColumn = 'auto / span ' + contentBlock.parentElement.dataset.columnSpan;\n\n    // Height\n    var exceedsHeight = 200 * (Number(contentBlock.parentElement.dataset.rowSpan) + 0.5) < contentBlock.offsetHeight;\n    var smallerHeightThan = 200 * (Number(contentBlock.parentElement.dataset.rowSpan) - 0.5) > contentBlock.offsetHeight;\n\n    contentBlock.parentElement.dataset.rowSpan = exceedsHeight ? Number(contentBlock.parentElement.dataset.rowSpan) + 1 : contentBlock.parentElement.dataset.rowSpan;\n    contentBlock.parentElement.dataset.rowSpan = smallerHeightThan ? Number(contentBlock.parentElement.dataset.rowSpan) - 1 : contentBlock.parentElement.dataset.rowSpan;\n\n    contentBlock.parentElement.style.gridRow = 'auto / span ' + contentBlock.parentElement.dataset.rowSpan;\n}\n\nexports.default = resizable;\n\n//# sourceURL=webpack:///./src/js/gridiocy.resizable.js?");

/***/ }),

/***/ "./src/js/gridiocy.src.js":
/*!********************************!*\
  !*** ./src/js/gridiocy.src.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\nexports.resizeToFit = exports.gridiocy = undefined;\n\nvar _gridiocyResizable = __webpack_require__(/*! ./gridiocy.resizable.js */ \"./src/js/gridiocy.resizable.js\");\n\nvar _gridiocyResizable2 = _interopRequireDefault(_gridiocyResizable);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar gridiocy = {};\n\ngridiocy.initialize = function (indentifier, columns, rows, options) {\n\n    /*const markup = `\r\n        <div class=\"gridiocy-grid\" style=\"grid-template-columns: ${ new Array(columns).fill(\"1fr\").join(' ')};\">\r\n            ${new Array(columns * rows).fill(null).map((item, index) => `<div class=\"gridiocy-item\" style=\"grid-column: auto / span 1; grid-row: auto / span 1\" data-column-span=\"1\" data-row-span=\"1\">\r\n                <div class=\"gridiocy-item-content gridiocy-item-content-resizable\">\r\n                    <div class=\"gridiocy-item-resizable-handle\"></div>\r\n                </div>\r\n            </div>`).join('')}\r\n        </div>\r\n    `;*/\n\n    //document.querySelector(indentifier).innerHTML = markup;\n\n    // Init grid class and style\n    var gridElement = document.querySelector(indentifier);\n    gridElement.classList.add('gridiocy-grid');\n    gridElement.style.gridTemplateColumns = new Array(columns).fill('1fr').join(' ');\n\n    // Wrap content\n    Array.from(document.getElementsByClassName('gridiocy-item')).forEach(function (item) {\n        item.innerHTML = '<div class=\"gridiocy-item-content\">' + item.innerHTML + '</div>';\n    });\n\n    // If resizable\n    if (options.resizable) {\n        Array.from(document.getElementsByClassName('gridiocy-item')).forEach(function (item) {\n            item.classList.add('gridiocy-item-content-resizable');\n\n            var resizeHandle = document.createElement('div', { class: 'gridiocy-item-resizable-handle' });\n            item.appendChild();\n        });\n        Array.from(document.getElementsByClassName('gridiocy-item-resizable-handle')).forEach(function (element) {\n            _gridiocyResizable2.default.init(element, columns);\n        });\n    }\n\n    //Array.from(document.getElementsByClassName('gridiocy-item-content-resizable')).forEach(element => { resizeToFit(element); });\n};\n\nfunction resizeToFit(contentBlock) {\n    contentBlock.style.width = contentBlock.parentElement.offsetWidth + 'px';\n    contentBlock.style.height = contentBlock.parentElement.offsetHeight + 'px';\n}\n\nexports.gridiocy = gridiocy;\nexports.resizeToFit = resizeToFit;\n\n//# sourceURL=webpack:///./src/js/gridiocy.src.js?");

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