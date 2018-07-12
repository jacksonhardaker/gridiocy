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
eval("\n\nvar _gridiocySrc = __webpack_require__(/*! ./js/gridiocy.src.js */ \"./src/js/gridiocy.src.js\");\n\n__webpack_require__(/*! ./js/gridiocy.resizable.js */ \"./src/js/gridiocy.resizable.js\");\n\n__webpack_require__(/*! ./js/gridiocy.draggable.js */ \"./src/js/gridiocy.draggable.js\");\n\n__webpack_require__(/*! ./scss/gridiocy.src.scss */ \"./src/scss/gridiocy.src.scss\");\n\n// js\n_gridiocySrc.gridiocy.initialize('.gridiocy', { columns: 3, resizable: true, draggable: true });\n\n// scss\n\n//# sourceURL=webpack:///./src/app.js?");

/***/ }),

/***/ "./src/js/gridiocy.draggable.js":
/*!**************************************!*\
  !*** ./src/js/gridiocy.draggable.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _gridiocySrc = __webpack_require__(/*! ./gridiocy.src.js */ \"./src/js/gridiocy.src.js\");\n\nvar draggable = {};\n\nvar startX = 0;\nvar startY = 0;\nvar inMotion = false;\nvar dragHandle = void 0;\nvar thresholdWidth = void 0;\nvar gridiocyGrid = void 0;\n\n/**\r\n * Initialize draggability.\r\n *\r\n * @param {Element} handle HTML Element to attach events to\r\n * @param {Number} columns Number of columns in grid\r\n */\ndraggable.init = function (handle) {\n    handle.classList.add('gridiocy-item-content-draggable');\n\n    // Attach event listeners.\n    handle.addEventListener('mousedown', beginDrag, false);\n};\n\nfunction beginDrag(e) {\n    if (!Array.from(e.target.classList).find(function (identifier) {\n        return 'gridiocy-item-resizable-handle';\n    })) {\n        dragHandle = findParentHandle(e.target);\n        inMotion = true;\n        startX = e.clientX;\n        startY = e.clientY;\n\n        // Resizing content should be on top.\n        dragHandle.style.zIndex = 999;\n\n        // Attach event listeners.\n        window.addEventListener('mousemove', dragObject, false);\n        window.addEventListener('mouseup', finishDrag, false);\n    }\n}\n\nfunction dragObject(e) {\n    if (inMotion) {\n        var moveUp = e.clientY < dragHandle.parentElement.offsetTop;\n        var moveRight = e.clientX - dragHandle.parentElement.offsetLeft > (0, _gridiocySrc.getColumnWidth)();\n        var moveDown = e.clientY - dragHandle.parentElement.offsetTop > 200;\n        var moveLeft = e.clientX < dragHandle.parentElement.offsetLeft;\n        //console.log(`moveup: ${moveUp}, movedown: ${moveDown}, moveleft: ${moveLeft}, moveright: ${moveRight}`);\n\n        dragHandle.style.transform = 'translate(' + (e.clientX - startX) + 'px, ' + (e.clientY - startY) + 'px)';\n\n        handleMove(moveUp, moveRight, moveDown, moveLeft);\n    }\n\n    e.preventDefault();\n}\n\nfunction finishDrag() {\n    // Remove event listeners.\n    window.removeEventListener('mousemove', dragObject, false);\n    window.removeEventListener('mouseup', finishDrag, false);\n\n    // Reset styles and flags\n    dragHandle.style.zIndex = 1;\n    inMotion = false;\n}\n\nfunction handleMove(moveUp, moveRight, moveDown, moveLeft) {}\n\n/**\r\n * Determines if the click event is comming from the intended target, and if not, searches the parent elements for the correct element.\r\n *\r\n * @param {Element} target\r\n * @returns The correct drag handle.\r\n */\nfunction findParentHandle(target) {\n\n    if (Array.from(target.classList).find(function (identifier) {\n        return 'gridiocy-item-content-draggable';\n    })) {\n        return target;\n    } else {\n        return findParentHandle(target.parentElement);\n    }\n}\nexports.default = draggable;\n\n//# sourceURL=webpack:///./src/js/gridiocy.draggable.js?");

/***/ }),

/***/ "./src/js/gridiocy.resizable.js":
/*!**************************************!*\
  !*** ./src/js/gridiocy.resizable.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _gridiocySrc = __webpack_require__(/*! ./gridiocy.src.js */ \"./src/js/gridiocy.src.js\");\n\nvar resizable = {};\n\nvar startX = void 0;\nvar startY = void 0;\nvar startWidth = void 0;\nvar startHeight = void 0;\nvar contentBlock = void 0;\nvar gridiocyGrid = void 0;\n\n/**\r\n * Initialize resizability\r\n *\r\n * @param {Element} handle HTML Element to attach events to\r\n */\nresizable.init = function (item) {\n\n    // Add class.\n    item.classList.add('gridiocy-item-content-resizable');\n\n    // Create handle element and append.\n    var resizeHandle = document.createElement('div');\n    resizeHandle.classList.add('gridiocy-item-resizable-handle');\n    item.appendChild(resizeHandle);\n\n    // Attach event listener.\n    resizeHandle.addEventListener('mousedown', beginResize, false);\n};\n\n/**\r\n *Begin resizing, set initial variables.\r\n *\r\n * @param {Event} e\r\n */\nfunction beginResize(e) {\n    contentBlock = e.target.parentElement;\n    gridiocyGrid = contentBlock.parentElement.parentElement;\n\n    // Expand grid rows to enable resizing beyond current size.\n    gridiocyGrid.style.gridTemplateRows = new Array(50).fill(\"1fr\").join(' ');\n\n    startX = e.clientX;\n    startY = e.clientY;\n    startWidth = contentBlock.offsetWidth;\n    startHeight = contentBlock.offsetHeight;\n\n    // Resizing content should be on top.\n    contentBlock.style.zIndex = 999;\n\n    // Attach event listeners.\n    window.addEventListener('mousemove', resizeGridItem, false);\n    window.addEventListener('mouseup', finishResize, false);\n}\n\n/**\r\n * Actively resize content block when dragging.\r\n *\r\n * @param {Event} e\r\n */\nfunction resizeGridItem(e) {\n    contentBlock.style.width = startWidth - (startX - e.clientX) + 'px';\n    contentBlock.style.height = startHeight - (startY - e.clientY) + 'px';\n\n    // Determine if grid item needs to change its number of rows/columns spanned.\n    isContentLargerThanContainer();\n\n    e.preventDefault();\n}\n\n/**\r\n * Finish resizing.\r\n *\r\n */\nfunction finishResize() {\n\n    // Remove event listeners.\n    window.removeEventListener('mousemove', resizeGridItem, false);\n    window.removeEventListener('mouseup', finishResize, false);\n\n    // Reset styles.\n    gridiocyGrid.style.gridTemplateRows = 'none';\n    contentBlock.style.zIndex = 1;\n    (0, _gridiocySrc.resizeToFit)(contentBlock);\n}\n\n/**\r\n * Determines whether grid item needs to alter column/row span, and executes change.\r\n *\r\n */\nfunction isContentLargerThanContainer() {\n    var gridItem = contentBlock.parentElement;\n\n    // Width. Check for resized box being + 50% bigger than current grid item, or - 50% smaller. Takes into account changing grid item span.\n    var exceedsWidth = (0, _gridiocySrc.getColumnWidth)() * (Number(gridItem.dataset.columnSpan) + 0.5) < contentBlock.offsetWidth;\n    var smallerWidthThan = (0, _gridiocySrc.getColumnWidth)() * (Number(gridItem.dataset.columnSpan) - 0.5) > contentBlock.offsetWidth;\n\n    // Set modifier.\n    gridItem.dataset.columnSpan = Number(gridItem.dataset.columnSpan) + getSpanModifier(exceedsWidth, smallerWidthThan);\n    gridItem.style.gridColumn = 'auto / span ' + gridItem.dataset.columnSpan;\n\n    // Height. Check for resized box being + 50% bigger than current grid item, or - 50% smaller. Takes into account changing grid item span.\n    var exceedsHeight = 200 * (Number(gridItem.dataset.rowSpan) + 0.5) < contentBlock.offsetHeight;\n    var smallerHeightThan = 200 * (Number(gridItem.dataset.rowSpan) - 0.5) > contentBlock.offsetHeight;\n\n    // Set modifier.\n    gridItem.dataset.rowSpan = Number(gridItem.dataset.rowSpan) + getSpanModifier(exceedsHeight, smallerHeightThan);\n    gridItem.style.gridRow = 'auto / span ' + gridItem.dataset.rowSpan;\n}\n\n/**\r\n * Determines the modifier for column or row span.\r\n *\r\n * @param {boolean} exceeds resized box is bigger than grid-item by a threshold of 50%\r\n * @param {boolean} smaller resized box is small than grid-item by a threshold of 50%\r\n * @returns 1, -1, or 0\r\n */\nfunction getSpanModifier(exceeds, smaller) {\n    return exceeds ? 1 : smaller ? -1 : 0;\n}\n\nexports.default = resizable;\n\n//# sourceURL=webpack:///./src/js/gridiocy.resizable.js?");

/***/ }),

/***/ "./src/js/gridiocy.src.js":
/*!********************************!*\
  !*** ./src/js/gridiocy.src.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\nexports.getColumnWidth = exports.getColumnsCount = exports.resizeToFit = exports.gridiocy = undefined;\n\nvar _gridiocyResizable = __webpack_require__(/*! ./gridiocy.resizable.js */ \"./src/js/gridiocy.resizable.js\");\n\nvar _gridiocyResizable2 = _interopRequireDefault(_gridiocyResizable);\n\nvar _gridiocyDraggable = __webpack_require__(/*! ./gridiocy.draggable.js */ \"./src/js/gridiocy.draggable.js\");\n\nvar _gridiocyDraggable2 = _interopRequireDefault(_gridiocyDraggable);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar gridiocy = {};\n\nvar options = void 0;\nvar gridiocyGrid = void 0;\n\ngridiocy.initialize = function (indentifier, opt) {\n\n    // Save settings.\n    options = opt;\n\n    // Init grid class and style\n    gridiocyGrid = document.querySelector(indentifier);\n    gridiocyGrid.classList.add('gridiocy-grid');\n    gridiocyGrid.style.gridTemplateColumns = 'repeat(' + options.columns + ', 1fr)';\n\n    // Wrap content\n    Array.from(document.getElementsByClassName('gridiocy-item')).forEach(function (item) {\n\n        // Wrap inner HTML with content wrapper\n        item.innerHTML = '<div class=\"gridiocy-item-content\">' + item.innerHTML + '</div>';\n\n        // Add default styles and data attributes\n        item.style.gridArea = 'auto / auto / span 1 / span 1';\n        item.setAttribute('data-column-span', 1);\n        item.setAttribute('data-row-span', 1);\n    });\n\n    // If resizable\n    if (options.resizable) {\n        Array.from(document.getElementsByClassName('gridiocy-item-content')).forEach(function (item) {\n\n            _gridiocyResizable2.default.init(item, options.columns);\n        });\n    }\n\n    if (options.draggable) {\n        Array.from(document.getElementsByClassName('gridiocy-item-content')).forEach(function (item) {\n            _gridiocyDraggable2.default.init(item, options.columns);\n        });\n    }\n};\n\nfunction resizeToFit(contentBlock) {\n    contentBlock.style.width = '100%';\n    contentBlock.style.height = '100%';\n}\n\nfunction getColumnsCount() {\n    return options.columns;\n}\n\nfunction getColumnWidth() {\n    return gridiocyGrid.offsetWidth / getColumnsCount();\n}\n\nexports.gridiocy = gridiocy;\nexports.resizeToFit = resizeToFit;\nexports.getColumnsCount = getColumnsCount;\nexports.getColumnWidth = getColumnWidth;\n\n//# sourceURL=webpack:///./src/js/gridiocy.src.js?");

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