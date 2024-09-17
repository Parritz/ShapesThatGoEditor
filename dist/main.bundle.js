/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _input__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./input */ \"./src/input.ts\");\n/* harmony import */ var _renderer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./renderer */ \"./src/renderer.ts\");\n/* harmony import */ var _tiles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./tiles */ \"./src/tiles.ts\");\n\n\n\nwindow.Tiles = _tiles__WEBPACK_IMPORTED_MODULE_2__.Tiles;\nwindow.onload = function () {\n    const renderer = new _renderer__WEBPACK_IMPORTED_MODULE_1__.Renderer();\n    new _input__WEBPACK_IMPORTED_MODULE_0__.Input(renderer.scene);\n};\n\n\n//# sourceURL=webpack://shapes-that-go-editor/./src/index.ts?");

/***/ }),

/***/ "./src/input.ts":
/*!**********************!*\
  !*** ./src/input.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Input: () => (/* binding */ Input)\n/* harmony export */ });\n/* harmony import */ var _tiles__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tiles */ \"./src/tiles.ts\");\n\nclass Input {\n    constructor(scene) {\n        this.mouseDown = false;\n        scene.canvas.addEventListener(\"mousemove\", this.onMouseMove.bind(this), false);\n        scene.canvas.addEventListener(\"mousedown\", this.onMouseDown.bind(this), false);\n        window.addEventListener(\"mouseup\", () => {\n            this.mouseDown = false;\n        }, false);\n    }\n    onMouseMove(event) {\n        if (!this.mouseDown) {\n            return;\n        }\n        _tiles__WEBPACK_IMPORTED_MODULE_0__.Tiles.fillBox(event.offsetX, event.offsetY);\n    }\n    onMouseDown(event) {\n        this.mouseDown = true;\n        switch (event.button) {\n            // Left click\n            case 0: {\n                _tiles__WEBPACK_IMPORTED_MODULE_0__.Tiles.fillBox(event.offsetX, event.offsetY);\n                break;\n            }\n            // Right click\n            case 2: {\n                console.log(\"Right click\");\n                break;\n            }\n        }\n    }\n}\n\n\n//# sourceURL=webpack://shapes-that-go-editor/./src/input.ts?");

/***/ }),

/***/ "./src/renderer.ts":
/*!*************************!*\
  !*** ./src/renderer.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Renderer: () => (/* binding */ Renderer)\n/* harmony export */ });\n/* harmony import */ var _tiles__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tiles */ \"./src/tiles.ts\");\n\nclass Renderer {\n    constructor() {\n        this.sceneElement = document.getElementById(\"scene\");\n        this.scene = this.sceneElement.getContext(\"2d\"); // Cast this because it will always be available\n        this.resizeCanvas();\n        window.addEventListener(\"resize\", () => {\n            this.resizeCanvas;\n        });\n        requestAnimationFrame(this.update.bind(this));\n    }\n    resizeCanvas() {\n        this.scene.canvas.width = this.sceneElement.clientWidth;\n        this.scene.canvas.height = this.sceneElement.clientHeight;\n    }\n    renderBox(tileX, tileY, tileID) {\n        const boxPositionX = _tiles__WEBPACK_IMPORTED_MODULE_0__.Tiles.boxWidth * tileX;\n        const boxPositionY = _tiles__WEBPACK_IMPORTED_MODULE_0__.Tiles.boxHeight * tileY;\n        const tile = _tiles__WEBPACK_IMPORTED_MODULE_0__.Tiles.getTileFromId(tileID);\n        if (tile) {\n            if (tile instanceof HTMLImageElement) {\n                const image = new Image();\n                image.src = tile.src;\n                image.sizes = \"20px\";\n                this.scene.drawImage(image, boxPositionX, boxPositionY, _tiles__WEBPACK_IMPORTED_MODULE_0__.Tiles.boxWidth, _tiles__WEBPACK_IMPORTED_MODULE_0__.Tiles.boxHeight);\n                this.scene.strokeRect(boxPositionX, boxPositionY, _tiles__WEBPACK_IMPORTED_MODULE_0__.Tiles.boxWidth, _tiles__WEBPACK_IMPORTED_MODULE_0__.Tiles.boxHeight);\n                this.scene.fillStyle = \"#000\";\n            }\n            else {\n                const tileId = tile.dataset.tileid;\n                switch (tileId) {\n                    case \"0\": {\n                        for (let i = 0; i < _tiles__WEBPACK_IMPORTED_MODULE_0__.Tiles.filledBoxes.length; i++) {\n                            const filledBox = _tiles__WEBPACK_IMPORTED_MODULE_0__.Tiles.filledBoxes[i];\n                            console.log(filledBox);\n                            if (filledBox.tileX == tileX && filledBox.tileY == tileY) {\n                                console.log(\"boom\");\n                                _tiles__WEBPACK_IMPORTED_MODULE_0__.Tiles.filledBoxes.splice(i, 1);\n                                break;\n                            }\n                        }\n                        break;\n                    }\n                    case \"1\": {\n                        this.scene.fillStyle = \"blue\";\n                        this.scene.lineWidth = 1;\n                        this.scene.fillRect(boxPositionX, boxPositionY, _tiles__WEBPACK_IMPORTED_MODULE_0__.Tiles.boxWidth, _tiles__WEBPACK_IMPORTED_MODULE_0__.Tiles.boxHeight);\n                        this.scene.strokeRect(boxPositionX, boxPositionY, _tiles__WEBPACK_IMPORTED_MODULE_0__.Tiles.boxWidth, _tiles__WEBPACK_IMPORTED_MODULE_0__.Tiles.boxHeight);\n                        this.scene.fillStyle = \"#000\";\n                        break;\n                    }\n                    case \"2\": {\n                    }\n                }\n            }\n        }\n    }\n    update() {\n        this.scene.clearRect(0, 0, this.scene.canvas.width, this.scene.canvas.height);\n        // Render vertical grid lines\n        for (let i = 0; i < this.scene.canvas.width; i++) {\n            this.scene.beginPath();\n            this.scene.moveTo(_tiles__WEBPACK_IMPORTED_MODULE_0__.Tiles.boxWidth * i, 0);\n            this.scene.lineTo(_tiles__WEBPACK_IMPORTED_MODULE_0__.Tiles.boxWidth * i, this.scene.canvas.height);\n            this.scene.stroke();\n        }\n        // Render horizontal grid lines\n        for (let i = 0; i < this.scene.canvas.width; i++) {\n            this.scene.beginPath();\n            this.scene.moveTo(0, _tiles__WEBPACK_IMPORTED_MODULE_0__.Tiles.boxHeight * i);\n            this.scene.lineTo(this.scene.canvas.width, _tiles__WEBPACK_IMPORTED_MODULE_0__.Tiles.boxHeight * i);\n            this.scene.stroke();\n        }\n        // Render all the blocks which have been filled\n        for (const filledBox of _tiles__WEBPACK_IMPORTED_MODULE_0__.Tiles.filledBoxes) {\n            this.renderBox(filledBox.tileX, filledBox.tileY, filledBox.tileID);\n        }\n        requestAnimationFrame(this.update.bind(this));\n    }\n}\n\n\n//# sourceURL=webpack://shapes-that-go-editor/./src/renderer.ts?");

/***/ }),

/***/ "./src/tiles.ts":
/*!**********************!*\
  !*** ./src/tiles.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   SpikeTile: () => (/* binding */ SpikeTile),\n/* harmony export */   Tiles: () => (/* binding */ Tiles)\n/* harmony export */ });\n// Tile Ids\n// air: 0\n// block: 1\n// spike: 2\n// upside down spikes: 3\n// Bounce: 4\n// DJ: 5\n// Shield: 6\n// Pog: 7\nclass Tiles {\n    static tileClicked(tilePicked) {\n        if (tilePicked == Tiles.currentTile) {\n            Tiles.currentTile.style.border = \"none\";\n            Tiles.currentTile = null;\n            return;\n        }\n        else if (Tiles.currentTile) {\n            Tiles.currentTile.style.border = \"none\";\n        }\n        tilePicked.style.border = \"2px solid black\";\n        Tiles.currentTile = tilePicked;\n    }\n    static getTileFromId(id) {\n        for (const child of document.getElementsByClassName(\"tile\")) {\n            if (child.dataset.tileid == id) {\n                if (child instanceof HTMLImageElement) {\n                    return child;\n                }\n                else if (child instanceof HTMLDivElement) {\n                    return child;\n                }\n            }\n        }\n    }\n    static getTilePosition(x, y) {\n        const tileX = Math.floor(x / Tiles.boxWidth);\n        const tileY = Math.floor(y / Tiles.boxHeight);\n        return { tileX, tileY };\n    }\n    static checkIfTileFilled(x, y) {\n        var _a;\n        if (((_a = this.currentTile) === null || _a === void 0 ? void 0 : _a.dataset.tileid) == \"0\") {\n            return false;\n        }\n        for (const filledBox of Tiles.filledBoxes) {\n            if (filledBox.tileX == x && filledBox.tileY == y) {\n                return true;\n            }\n        }\n        return false;\n    }\n    static fillBox(mouseX, mouseY) {\n        var _a;\n        const { tileX, tileY } = this.getTilePosition(mouseX, mouseY);\n        if (this.checkIfTileFilled(tileX, tileY) || !this.currentTile) {\n            return;\n        }\n        this.filledBoxes.push({\n            tileX,\n            tileY,\n            tileID: (_a = this.currentTile) === null || _a === void 0 ? void 0 : _a.dataset.tileid\n        });\n    }\n}\nTiles.boxWidth = 75;\nTiles.boxHeight = 75;\nTiles.filledBoxes = [];\nclass SpikeTile {\n    draw() {\n    }\n}\n\n\n//# sourceURL=webpack://shapes-that-go-editor/./src/tiles.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;