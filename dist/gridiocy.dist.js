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

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// shim for using process in browser\nvar process = module.exports = {};\n\n// cached from whatever global is present so that test runners that stub it\n// don't break things.  But we need to wrap it in a try catch in case it is\n// wrapped in strict mode code which doesn't define any globals.  It's inside a\n// function because try/catches deoptimize in certain engines.\n\nvar cachedSetTimeout;\nvar cachedClearTimeout;\n\nfunction defaultSetTimout() {\n    throw new Error('setTimeout has not been defined');\n}\nfunction defaultClearTimeout () {\n    throw new Error('clearTimeout has not been defined');\n}\n(function () {\n    try {\n        if (typeof setTimeout === 'function') {\n            cachedSetTimeout = setTimeout;\n        } else {\n            cachedSetTimeout = defaultSetTimout;\n        }\n    } catch (e) {\n        cachedSetTimeout = defaultSetTimout;\n    }\n    try {\n        if (typeof clearTimeout === 'function') {\n            cachedClearTimeout = clearTimeout;\n        } else {\n            cachedClearTimeout = defaultClearTimeout;\n        }\n    } catch (e) {\n        cachedClearTimeout = defaultClearTimeout;\n    }\n} ())\nfunction runTimeout(fun) {\n    if (cachedSetTimeout === setTimeout) {\n        //normal enviroments in sane situations\n        return setTimeout(fun, 0);\n    }\n    // if setTimeout wasn't available but was latter defined\n    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {\n        cachedSetTimeout = setTimeout;\n        return setTimeout(fun, 0);\n    }\n    try {\n        // when when somebody has screwed with setTimeout but no I.E. maddness\n        return cachedSetTimeout(fun, 0);\n    } catch(e){\n        try {\n            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally\n            return cachedSetTimeout.call(null, fun, 0);\n        } catch(e){\n            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error\n            return cachedSetTimeout.call(this, fun, 0);\n        }\n    }\n\n\n}\nfunction runClearTimeout(marker) {\n    if (cachedClearTimeout === clearTimeout) {\n        //normal enviroments in sane situations\n        return clearTimeout(marker);\n    }\n    // if clearTimeout wasn't available but was latter defined\n    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {\n        cachedClearTimeout = clearTimeout;\n        return clearTimeout(marker);\n    }\n    try {\n        // when when somebody has screwed with setTimeout but no I.E. maddness\n        return cachedClearTimeout(marker);\n    } catch (e){\n        try {\n            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally\n            return cachedClearTimeout.call(null, marker);\n        } catch (e){\n            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.\n            // Some versions of I.E. have different rules for clearTimeout vs setTimeout\n            return cachedClearTimeout.call(this, marker);\n        }\n    }\n\n\n\n}\nvar queue = [];\nvar draining = false;\nvar currentQueue;\nvar queueIndex = -1;\n\nfunction cleanUpNextTick() {\n    if (!draining || !currentQueue) {\n        return;\n    }\n    draining = false;\n    if (currentQueue.length) {\n        queue = currentQueue.concat(queue);\n    } else {\n        queueIndex = -1;\n    }\n    if (queue.length) {\n        drainQueue();\n    }\n}\n\nfunction drainQueue() {\n    if (draining) {\n        return;\n    }\n    var timeout = runTimeout(cleanUpNextTick);\n    draining = true;\n\n    var len = queue.length;\n    while(len) {\n        currentQueue = queue;\n        queue = [];\n        while (++queueIndex < len) {\n            if (currentQueue) {\n                currentQueue[queueIndex].run();\n            }\n        }\n        queueIndex = -1;\n        len = queue.length;\n    }\n    currentQueue = null;\n    draining = false;\n    runClearTimeout(timeout);\n}\n\nprocess.nextTick = function (fun) {\n    var args = new Array(arguments.length - 1);\n    if (arguments.length > 1) {\n        for (var i = 1; i < arguments.length; i++) {\n            args[i - 1] = arguments[i];\n        }\n    }\n    queue.push(new Item(fun, args));\n    if (queue.length === 1 && !draining) {\n        runTimeout(drainQueue);\n    }\n};\n\n// v8 likes predictible objects\nfunction Item(fun, array) {\n    this.fun = fun;\n    this.array = array;\n}\nItem.prototype.run = function () {\n    this.fun.apply(null, this.array);\n};\nprocess.title = 'browser';\nprocess.browser = true;\nprocess.env = {};\nprocess.argv = [];\nprocess.version = ''; // empty string to avoid regexp issues\nprocess.versions = {};\n\nfunction noop() {}\n\nprocess.on = noop;\nprocess.addListener = noop;\nprocess.once = noop;\nprocess.off = noop;\nprocess.removeListener = noop;\nprocess.removeAllListeners = noop;\nprocess.emit = noop;\nprocess.prependListener = noop;\nprocess.prependOnceListener = noop;\n\nprocess.listeners = function (name) { return [] }\n\nprocess.binding = function (name) {\n    throw new Error('process.binding is not supported');\n};\n\nprocess.cwd = function () { return '/' };\nprocess.chdir = function (dir) {\n    throw new Error('process.chdir is not supported');\n};\nprocess.umask = function() { return 0; };\n\n\n//# sourceURL=webpack:///./node_modules/process/browser.js?");

/***/ }),

/***/ "./node_modules/uniqid/index.js":
/*!**************************************!*\
  !*** ./node_modules/uniqid/index.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* WEBPACK VAR INJECTION */(function(process) {/* \n(The MIT License)\nCopyright (c) 2014 Halász Ádám <mail@adamhalasz.com>\nPermission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the \"Software\"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:\nThe above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.\nTHE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.\n*/\n\n//  Unique Hexatridecimal ID Generator\n// ================================================\n\n//  Dependencies\n// ================================================\nvar pid = process && process.pid ? process.pid.toString(36) : '' ;\nvar address = '';\nif(false){ var i, mac, networkInterfaces; } \n\n//  Exports\n// ================================================\nmodule.exports = module.exports.default = function(prefix){ return (prefix || '') + address + pid + now().toString(36); }\nmodule.exports.process = function(prefix){ return (prefix || '') + pid + now().toString(36); }\nmodule.exports.time    = function(prefix){ return (prefix || '') + now().toString(36); }\n\n//  Helpers\n// ================================================\nfunction now(){\n    var time = Date.now();\n    var last = now.last || time;\n    return now.last = time > last ? time : last + 1;\n}\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../process/browser.js */ \"./node_modules/process/browser.js\")))\n\n//# sourceURL=webpack:///./node_modules/uniqid/index.js?");

/***/ }),

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _gridiocySrc = __webpack_require__(/*! ./js/gridiocy.src.js */ \"./src/js/gridiocy.src.js\");\n\n__webpack_require__(/*! ./js/gridiocy.resizable.js */ \"./src/js/gridiocy.resizable.js\");\n\n__webpack_require__(/*! ./js/gridiocy.draggable.js */ \"./src/js/gridiocy.draggable.js\");\n\n__webpack_require__(/*! ./js/gridiocy.virtual.js */ \"./src/js/gridiocy.virtual.js\");\n\n__webpack_require__(/*! ./js/gridiocy.utils.js */ \"./src/js/gridiocy.utils.js\");\n\n__webpack_require__(/*! ../node_modules/uniqid/index.js */ \"./node_modules/uniqid/index.js\");\n\n__webpack_require__(/*! ./scss/gridiocy.src.scss */ \"./src/scss/gridiocy.src.scss\");\n\n// external modules\n_gridiocySrc.gridiocy.initialize('.gridiocy', { columns: 3, resizable: false, draggable: true });\n\n// scss\n// js\n\n//# sourceURL=webpack:///./src/app.js?");

/***/ }),

/***/ "./src/js/gridiocy.draggable.js":
/*!**************************************!*\
  !*** ./src/js/gridiocy.draggable.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _gridiocySrc = __webpack_require__(/*! ./gridiocy.src.js */ \"./src/js/gridiocy.src.js\");\n\nvar _gridiocyVirtual = __webpack_require__(/*! ./gridiocy.virtual.js */ \"./src/js/gridiocy.virtual.js\");\n\nvar _gridiocyVirtual2 = _interopRequireDefault(_gridiocyVirtual);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar draggable = {};\n\nvar startX = 0;\nvar startY = 0;\nvar inMotion = false;\nvar dragHandle = void 0;\nvar thresholdWidth = void 0;\nvar gridiocyGrid = void 0;\n\n/**\r\n * Initialize draggability.\r\n *\r\n * @param {Element} handle HTML Element to attach events to\r\n * @param {Number} columns Number of columns in grid\r\n */\ndraggable.init = function (handle) {\n    handle.classList.add('gridiocy-item-content-draggable');\n\n    // Attach event listeners.\n    handle.addEventListener('mousedown', beginDrag, false);\n};\n\nfunction beginDrag(e) {\n    if (!Array.from(e.target.classList).find(function (identifier) {\n        return 'gridiocy-item-resizable-handle';\n    })) {\n        (0, _gridiocySrc.toggleAutoPositioning)();\n        dragHandle = findParentHandle(e.target);\n        inMotion = true;\n        startX = e.clientX;\n        startY = e.clientY;\n\n        // Resizing content should be on top.\n        dragHandle.style.zIndex = 999;\n\n        // Attach event listeners.\n        window.addEventListener('mousemove', dragObject, false);\n        window.addEventListener('mouseup', finishDrag, false);\n    }\n}\n\nfunction dragObject(e) {\n    if (inMotion) {\n        var moveUp = e.clientY < dragHandle.parentElement.offsetTop;\n        var moveRight = e.clientX - dragHandle.parentElement.offsetLeft > (0, _gridiocySrc.getColumnWidth)();\n        var moveDown = e.clientY - dragHandle.parentElement.offsetTop > 200;\n        var moveLeft = e.clientX < dragHandle.parentElement.offsetLeft;\n        //console.log(`moveup: ${moveUp}, movedown: ${moveDown}, moveleft: ${moveLeft}, moveright: ${moveRight}`);\n\n        dragHandle.style.transform = 'translate(' + (e.clientX - startX) + 'px, ' + (e.clientY - startY) + 'px)';\n\n        handleMove(e, moveUp, moveRight, moveDown, moveLeft);\n    }\n\n    e.preventDefault();\n}\n\nfunction finishDrag() {\n    // Remove event listeners.\n    window.removeEventListener('mousemove', dragObject, false);\n    window.removeEventListener('mouseup', finishDrag, false);\n\n    // Reset styles and flags\n    dragHandle.style.zIndex = 1;\n    dragHandle.style.transform = 'none';\n    inMotion = false;\n}\n\nfunction handleMove(e, moveUp, moveRight, moveDown, moveLeft) {\n    var gridItem = dragHandle.parentElement;\n\n    if (moveRight) {\n        _gridiocyVirtual2.default.shiftRight(gridItem.dataset.gridId);\n    }\n\n    if (moveLeft) {\n        _gridiocyVirtual2.default.shiftLeft(gridItem.dataset.gridId);\n    }\n\n    if (moveDown) {\n        _gridiocyVirtual2.default.shiftDown(gridItem.dataset.gridId);\n    }\n\n    if (moveUp) {\n        _gridiocyVirtual2.default.shiftUp(gridItem.dataset.gridId);\n    }\n\n    // Any changes?\n    // if (moveRight || moveLeft) {\n    //     startX = e.clientX;\n    // }\n    // else if (moveDown || moveUp) {\n    //     startY = e.clientY;\n    // }\n}\n\n/**\r\n * Determines if the click event is comming from the intended target, and if not, searches the parent elements for the correct element.\r\n *\r\n * @param {Element} target\r\n * @returns The correct drag handle.\r\n */\nfunction findParentHandle(target) {\n\n    if (Array.from(target.classList).find(function () {\n        return 'gridiocy-item-content-draggable';\n    })) {\n        return target;\n    } else {\n        return findParentHandle(target.parentElement);\n    }\n}\nexports.default = draggable;\n\n//# sourceURL=webpack:///./src/js/gridiocy.draggable.js?");

/***/ }),

/***/ "./src/js/gridiocy.resizable.js":
/*!**************************************!*\
  !*** ./src/js/gridiocy.resizable.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _gridiocySrc = __webpack_require__(/*! ./gridiocy.src.js */ \"./src/js/gridiocy.src.js\");\n\nvar _gridiocyVirtual = __webpack_require__(/*! ./gridiocy.virtual.js */ \"./src/js/gridiocy.virtual.js\");\n\nvar _gridiocyVirtual2 = _interopRequireDefault(_gridiocyVirtual);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar resizable = {};\n\nvar startX = void 0;\nvar startY = void 0;\nvar startWidth = void 0;\nvar startHeight = void 0;\nvar contentBlock = void 0;\nvar gridiocyGrid = void 0;\n\n/**\r\n * Initialize resizability\r\n *\r\n * @param {Element} handle HTML Element to attach events to\r\n */\nresizable.init = function (item) {\n\n    // Add class.\n    item.classList.add('gridiocy-item-content-resizable');\n\n    // Create handle element and append.\n    var resizeHandle = document.createElement('div');\n    resizeHandle.classList.add('gridiocy-item-resizable-handle');\n    item.appendChild(resizeHandle);\n\n    // Attach event listener.\n    resizeHandle.addEventListener('mousedown', beginResize, false);\n};\n\n/**\r\n *Begin resizing, set initial variables.\r\n *\r\n * @param {Event} e\r\n */\nfunction beginResize(e) {\n    contentBlock = e.target.parentElement;\n    gridiocyGrid = contentBlock.parentElement.parentElement;\n\n    // Expand grid rows to enable resizing beyond current size.\n    gridiocyGrid.style.gridTemplateRows = new Array(50).fill(\"1fr\").join(' ');\n\n    startX = e.clientX;\n    startY = e.clientY;\n    startWidth = contentBlock.offsetWidth;\n    startHeight = contentBlock.offsetHeight;\n\n    // Resizing content should be on top.\n    contentBlock.style.zIndex = 999;\n\n    // Attach event listeners.\n    window.addEventListener('mousemove', resizeGridItem, false);\n    window.addEventListener('mouseup', finishResize, false);\n}\n\n/**\r\n * Actively resize content block when dragging.\r\n *\r\n * @param {Event} e\r\n */\nfunction resizeGridItem(e) {\n    contentBlock.style.width = startWidth - (startX - e.clientX) + 'px';\n    contentBlock.style.height = startHeight - (startY - e.clientY) + 'px';\n\n    // Determine if grid item needs to change its number of rows/columns spanned.\n    isContentLargerThanContainer();\n\n    e.preventDefault();\n}\n\n/**\r\n * Finish resizing.\r\n *\r\n */\nfunction finishResize() {\n\n    // Remove event listeners.\n    window.removeEventListener('mousemove', resizeGridItem, false);\n    window.removeEventListener('mouseup', finishResize, false);\n\n    // Reset styles.\n    gridiocyGrid.style.gridTemplateRows = 'none';\n    contentBlock.style.zIndex = 1;\n    (0, _gridiocySrc.resizeToFit)(contentBlock);\n}\n\n/**\r\n * Determines whether grid item needs to alter column/row span, and executes change.\r\n *\r\n */\nfunction isContentLargerThanContainer() {\n    var gridItem = contentBlock.parentElement;\n    var gridObj = _gridiocyVirtual2.default.get(gridItem.dataset.gridId);\n\n    // Width. Check for resized box being + 50% bigger than current grid item, or - 50% smaller. Takes into account changing grid item span.\n    var exceedsWidth = (0, _gridiocySrc.getColumnWidth)() * (Number(gridObj.columnSpan) + 0.5) < contentBlock.offsetWidth;\n    var smallerWidthThan = (0, _gridiocySrc.getColumnWidth)() * (Number(gridObj.columnSpan) - 0.5) > contentBlock.offsetWidth;\n\n    // Set modifier.\n    gridItem.style.gridColumn = 'auto / span ' + _gridiocyVirtual2.default.setColumnSpan(gridObj.id, gridObj.columnSpan + getSpanModifier(exceedsWidth, smallerWidthThan));\n\n    // Height. Check for resized box being + 50% bigger than current grid item, or - 50% smaller. Takes into account changing grid item span.\n    var exceedsHeight = 200 * (Number(gridObj.rowSpan) + 0.5) < contentBlock.offsetHeight;\n    var smallerHeightThan = 200 * (Number(gridObj.rowSpan) - 0.5) > contentBlock.offsetHeight;\n\n    // Set modifier.\n    gridItem.style.gridRow = 'auto / span ' + _gridiocyVirtual2.default.setRowSpan(gridObj.id, gridObj.rowSpan + getSpanModifier(exceedsHeight, smallerHeightThan));\n}\n\n/**\r\n * Determines the modifier for column or row span.\r\n *\r\n * @param {boolean} exceeds resized box is bigger than grid-item by a threshold of 50%\r\n * @param {boolean} smaller resized box is small than grid-item by a threshold of 50%\r\n * @returns 1, -1, or 0\r\n */\nfunction getSpanModifier(exceeds, smaller) {\n    return exceeds ? 1 : smaller ? -1 : 0;\n}\n\nexports.default = resizable;\n\n//# sourceURL=webpack:///./src/js/gridiocy.resizable.js?");

/***/ }),

/***/ "./src/js/gridiocy.src.js":
/*!********************************!*\
  !*** ./src/js/gridiocy.src.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\nexports.toggleAutoPositioning = exports.getColumnWidth = exports.getColumnsCount = exports.resizeToFit = exports.gridiocy = undefined;\n\nvar _gridiocyResizable = __webpack_require__(/*! ./gridiocy.resizable.js */ \"./src/js/gridiocy.resizable.js\");\n\nvar _gridiocyResizable2 = _interopRequireDefault(_gridiocyResizable);\n\nvar _gridiocyDraggable = __webpack_require__(/*! ./gridiocy.draggable.js */ \"./src/js/gridiocy.draggable.js\");\n\nvar _gridiocyDraggable2 = _interopRequireDefault(_gridiocyDraggable);\n\nvar _gridiocyUtils = __webpack_require__(/*! ./gridiocy.utils.js */ \"./src/js/gridiocy.utils.js\");\n\nvar _gridiocyVirtual = __webpack_require__(/*! ./gridiocy.virtual.js */ \"./src/js/gridiocy.virtual.js\");\n\nvar _gridiocyVirtual2 = _interopRequireDefault(_gridiocyVirtual);\n\nvar _index = __webpack_require__(/*! ../../node_modules/uniqid/index.js */ \"./node_modules/uniqid/index.js\");\n\nvar _index2 = _interopRequireDefault(_index);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar gridiocy = {};\n\nconsole.log(_gridiocyVirtual2.default);\n\nvar options = void 0;\nvar gridiocyGrid = void 0;\n\ngridiocy.initialize = function (indentifier, opt) {\n\n    // Save settings.\n    options = opt;\n\n    // Init grid class and style\n    gridiocyGrid = document.querySelector(indentifier);\n    gridiocyGrid.classList.add('gridiocy-grid');\n    gridiocyGrid.style.gridTemplateColumns = 'repeat(' + options.columns + ', 1fr)';\n\n    // Wrap content\n    Array.from(document.getElementsByClassName('gridiocy-item')).forEach(function (item, index) {\n\n        // Add identifier class\n        var indentifier = (0, _index2.default)();\n        item.classList.add('gridiocy-item-' + indentifier);\n\n        // Wrap inner HTML with content wrapper\n        item.innerHTML = '<div class=\"gridiocy-item-content\">' + item.innerHTML + '</div>';\n\n        // Add default styles and data attributes\n        var columnPos = index % options.columns + 1;\n        var rowPos = Math.ceil((index + 1) / options.columns);\n\n        item.style.gridArea = rowPos + ' / ' + columnPos + ' / span 1 / span 1';\n        //item.style.gridArea = 'auto / auto / span 1 / span 1';\n        item.style.order = index;\n        (0, _gridiocyUtils.setAttributes)(item, { 'data-grid-id': indentifier, 'data-column-span': 1, 'data-row-span': 1, 'data-column-position': columnPos, 'data-row-position': rowPos });\n\n        // Initiate virtual grid.\n        _gridiocyVirtual2.default.add(indentifier, rowPos, columnPos, 1, 1);\n    });\n\n    // If resizable\n    if (options.resizable) {\n        Array.from(document.getElementsByClassName('gridiocy-item-content')).forEach(function (item) {\n            _gridiocyResizable2.default.init(item, options.columns);\n        });\n    }\n\n    // If draggable\n    if (options.draggable) {\n        Array.from(document.getElementsByClassName('gridiocy-item-content')).forEach(function (item) {\n            _gridiocyDraggable2.default.init(item, options.columns);\n        });\n    }\n};\n\nfunction resizeToFit(contentBlock) {\n    contentBlock.style.width = '100%';\n    contentBlock.style.height = '100%';\n}\n\nfunction getColumnsCount() {\n    return options.columns;\n}\n\nfunction getColumnWidth() {\n    return gridiocyGrid.offsetWidth / getColumnsCount();\n}\n\nfunction toggleAutoPositioning() {\n    Array.from(document.getElementsByClassName('gridiocy-item')).forEach(function (item) {\n        item.style.gridArea = 'auto / auto / span ' + item.dataset.rowSpan + ' / span ' + item.dataset.columnSpan;\n    });\n}\n\nexports.gridiocy = gridiocy;\nexports.resizeToFit = resizeToFit;\nexports.getColumnsCount = getColumnsCount;\nexports.getColumnWidth = getColumnWidth;\nexports.toggleAutoPositioning = toggleAutoPositioning;\n\n//# sourceURL=webpack:///./src/js/gridiocy.src.js?");

/***/ }),

/***/ "./src/js/gridiocy.utils.js":
/*!**********************************!*\
  !*** ./src/js/gridiocy.utils.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nfunction setAttributes(el, attrs) {\n    Object.keys(attrs).forEach(function (key) {\n        return el.setAttribute(key, attrs[key]);\n    });\n}\n\nexports.setAttributes = setAttributes;\n\n//# sourceURL=webpack:///./src/js/gridiocy.utils.js?");

/***/ }),

/***/ "./src/js/gridiocy.virtual.js":
/*!************************************!*\
  !*** ./src/js/gridiocy.virtual.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _gridiocySrc = __webpack_require__(/*! ./gridiocy.src.js */ \"./src/js/gridiocy.src.js\");\n\nfunction _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }\n\nvar list = [];\nvar DRAG_DIRECTION = {\n    UP: 'UP',\n    DOWN: 'DOWN',\n    LEFT: 'LEFT',\n    RIGHT: 'RIGHT'\n\n    /**\r\n     * Adds an object to the list\r\n     *\r\n     * @param {*} obj\r\n     */\n};function add(id, rowPosition, columnPosition, rowSpan, columnSpan) {\n    list.push({\n        id: id,\n        rowPosition: rowPosition,\n        columnPosition: columnPosition,\n        rowSpan: rowSpan,\n        columnSpan: columnSpan\n    });\n}\n\nfunction rowMajorSort() {\n    list.sort(function (a, b) {\n        var aOrder = calculateRowMajorOrder(a);\n        var bOrder = calculateRowMajorOrder(b);\n\n        if (aOrder < bOrder) {\n            return -1;\n        }\n\n        if (aOrder > bOrder) {\n            return 1;\n        }\n\n        return 0;\n    });\n\n    return getList();\n}\n\nfunction getList() {\n    return [].concat(_toConsumableArray(list.map(function (obj) {\n        return Object.assign({}, obj);\n    })));\n}\n\nfunction get(id) {\n    return Object.assign({}, list[indexOf(id)]);\n}\n\nfunction setRowPosition(id, pos) {\n    var index = indexOf(id);\n\n    list[index].rowPosition = pos;\n    updateDataAtributes(list[index]);\n\n    return pos;\n}\n\nfunction setColumnPosition(id, pos) {\n    console.log('Setting Column Position of [' + id + '] to ' + pos + '.');\n    var index = indexOf(id);\n\n    list[index].columnPosition = pos;\n    //updateDataAtributes(list[index]);\n\n    return pos;\n}\n\nfunction swapColumnPositions(a, b) {\n    var aColPos = Number(a.columnPosition);\n\n    setColumnPosition(a.id, b.columnPosition);\n    setColumnPosition(b.id, aColPos);\n    updateDataAtributes();\n}\n\nfunction setRowSpan(id, span) {\n    var index = indexOf(id);\n\n    list[index].rowSpan = span;\n    updateDataAtributes(list[index]);\n\n    return span;\n}\n\nfunction setColumnSpan(id, span) {\n    var index = indexOf(id);\n\n    list[index].columnSpan = span;\n    updateDataAtributes(list[index]);\n\n    return span;\n}\n\nfunction shiftUp(id) {\n    // let index = indexOf(id);\n\n    // if (index - 1 >= 0) {\n    //     move(index, index - 3);\n    //     renderChangedOrder();\n    // }\n}\n\nfunction shiftDown(id) {\n    // let index = indexOf(id);\n\n    // if (index + 1 < list.length) {\n    //     move(index, index + 3);\n    //     renderChangedOrder();\n    // }\n}\n\nfunction shiftRight(id) {\n\n    // Shift column position right.\n    var obj = get(id);\n\n    if (obj.columnPosition + obj.columnSpan <= (0, _gridiocySrc.getColumnsCount)()) {\n        //    console.log(getList());\n        obj.columnPosition++;\n        //let columnPos = setColumnPosition(id, obj.columnPosition + 1);\n\n        resolveConflicts(obj, DRAG_DIRECTION.RIGHT);\n        //rowMajorSort();\n        //    console.log(getList());\n        //document.getElementsByClassName(`gridiocy-item-${obj.id}`)[0].style.gridArea = `${obj.rowPosition} / ${columnPos} / span ${obj.rowSpan} / span ${obj.columnSpan}`;\n        //renderChanges();\n    }\n\n    // Sort list based on new\n\n    // let index = indexOf(id);\n\n    // if (index + 1 < list.length) {\n    //     move(index, index + 1);\n    //     renderChangedOrder();\n    // }\n}\n\nfunction shiftLeft(id) {\n    // let index = indexOf(id);\n\n    // if (index - 1 >= 0) {\n    //     move(index, index - 1);\n    //     renderChangedOrder();\n    // }\n}\n\nfunction resolveConflicts(obj, direction) {\n    list.forEach(function (conflicting) {\n        switch (direction) {\n            case DRAG_DIRECTION.UP:\n                break;\n            case DRAG_DIRECTION.DOWN:\n                break;\n            case DRAG_DIRECTION.RIGHT:\n\n                if (conflicting.columnPosition === obj.columnPosition && conflicting.rowPosition === obj.rowPosition) {\n                    console.log('found a conflict');\n\n                    // Are they the same size?\n                    if (conflicting.columnSpan === obj.columnSpan && conflicting.rowSpan === obj.rowSpan) {\n                        swapColumnPositions(obj, conflicting);\n                    }\n                }\n\n                break;\n            case DRAG_DIRECTION.LEFT:\n                break;\n        }\n    });\n}\n\nfunction move(fromIndex, toIndex) {\n    list.splice(toIndex, 0, list.splice(fromIndex, 1)[0]);\n};\n\nfunction indexOf(id) {\n    return list.map(function (obj) {\n        return obj.id;\n    }).indexOf(id);\n}\n\nfunction renderChangedOrder() {\n    list.forEach(function (obj, index) {\n        document.getElementsByClassName('gridiocy-item-' + obj.id)[0].style.order = index;\n    });\n}\n\nfunction renderChanges() {\n    list.forEach(function (obj, index) {\n        //document.getElementsByClassName(`gridiocy-item-${obj.id}`)[0].style.order = index;\n        document.getElementsByClassName('gridiocy-item-' + obj.id)[0].style.gridArea = obj.rowPosition + ' / ' + obj.columnPosition + ' / span ' + obj.rowSpan + ' / span ' + obj.columnSpan;\n    });\n}\n\nfunction updateDataAtributes(obj) {\n    if (obj) {\n        var element = document.getElementsByClassName('gridiocy-item-' + obj.id)[0];\n\n        element.dataset.columnSpan = obj.columnSpan;\n        element.dataset.rowSpan = obj.rowSpan;\n        element.dataset.columnPosition = obj.columnPosition;\n        element.dataset.rowPosition = obj.rowPosition;\n    } else {\n        list.forEach(function (item) {\n            updateDataAtributes(item);\n        });\n    }\n}\n\nfunction generateFilledByGrid() {\n    var filledByGrid = new Array(list.map(function (obj) {\n        return obj.columnSpan * obj.rowSpan;\n    }).reduce(function (x, current) {\n        return x + current;\n    }));\n\n    return filledByGrid;\n\n    //return list.reduce((obj, count) => {\n    //    return count + Number(obj.columnSpan) * Number(obj.rowSpan);\n    //}, 0);\n}\n\n/** Private Functions */\n\nfunction calculateRowMajorOrder(obj) {\n    var zeroBasedRowPosition = Number(obj.rowPosition) - 1;\n    return zeroBasedRowPosition * (0, _gridiocySrc.getColumnsCount)() + Number(obj.columnPosition);\n}\n\nexports.default = {\n    add: add,\n    rowMajorSort: rowMajorSort,\n    getList: getList,\n    get: get,\n    setRowSpan: setRowSpan,\n    setColumnSpan: setColumnSpan,\n    shiftDown: shiftDown,\n    shiftUp: shiftUp,\n    shiftLeft: shiftLeft,\n    shiftRight: shiftRight\n};\n\n//# sourceURL=webpack:///./src/js/gridiocy.virtual.js?");

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