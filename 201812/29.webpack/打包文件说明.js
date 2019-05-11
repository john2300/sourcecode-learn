/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
          //模块的缓存
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
          //webpack的require方法
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
            //如果缓存里已经有了,表示模块加载过了
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
            //创建一个新的模块,并且放到缓存里
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/    
/******/ 		// Execute the module function
            //执行模块的函数
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
            //标记模块为加载过
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module      //返回模块的导出对象
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
            //向外暴露模块对象
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
          //定义getter方法为了兼容exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
              //在exports对象上定义name属性,它的值是不可配置的,可枚举,并指定获取器
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
          //在导出模块上定义__esModule,为兼容
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
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
          //对应的是output的publicPath公开路径
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./dist/bundle.js":
/*!************************!*\
  !*** ./dist/bundle.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

  eval("/******/ (function(modules) { // webpackBootstrap\n/******/ \t// The module cache\n/******/ \tvar installedModules = {};\n/******/\n/******/ \t// The require function\n/******/ \tfunction __webpack_require__(moduleId) {\n/******/\n/******/ \t\t// Check if module is in cache\n/******/ \t\tif(installedModules[moduleId]) {\n/******/ \t\t\treturn installedModules[moduleId].exports;\n/******/ \t\t}\n/******/ \t\t// Create a new module (and put it into the cache)\n/******/ \t\tvar module = installedModules[moduleId] = {\n/******/ \t\t\ti: moduleId,\n/******/ \t\t\tl: false,\n/******/ \t\t\texports: {}\n/******/ \t\t};\n/******/\n/******/ \t\t// Execute the module function\n/******/ \t\tmodules[moduleId].call(module.exports, module, module.exports, __webpack_require__);\n/******/\n/******/ \t\t// Flag the module as loaded\n/******/ \t\tmodule.l = true;\n/******/\n/******/ \t\t// Return the exports of the module\n/******/ \t\treturn module.exports;\n/******/ \t}\n/******/\n/******/\n/******/ \t// expose the modules object (__webpack_modules__)\n/******/ \t__webpack_require__.m = modules;\n/******/\n/******/ \t// expose the module cache\n/******/ \t__webpack_require__.c = installedModules;\n/******/\n/******/ \t// define getter function for harmony exports\n/******/ \t__webpack_require__.d = function(exports, name, getter) {\n/******/ \t\tif(!__webpack_require__.o(exports, name)) {\n/******/ \t\t\tObject.defineProperty(exports, name, {\n/******/ \t\t\t\tconfigurable: false,\n/******/ \t\t\t\tenumerable: true,\n/******/ \t\t\t\tget: getter\n/******/ \t\t\t});\n/******/ \t\t}\n/******/ \t};\n/******/\n/******/ \t// define __esModule on exports\n/******/ \t__webpack_require__.r = function(exports) {\n/******/ \t\tObject.defineProperty(exports, '__esModule', { value: true });\n/******/ \t};\n/******/\n/******/ \t// getDefaultExport function for compatibility with non-harmony modules\n/******/ \t__webpack_require__.n = function(module) {\n/******/ \t\tvar getter = module && module.__esModule ?\n/******/ \t\t\tfunction getDefault() { return module['default']; } :\n/******/ \t\t\tfunction getModuleExports() { return module; };\n/******/ \t\t__webpack_require__.d(getter, 'a', getter);\n/******/ \t\treturn getter;\n/******/ \t};\n/******/\n/******/ \t// Object.prototype.hasOwnProperty.call\n/******/ \t__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };\n/******/\n/******/ \t// __webpack_public_path__\n/******/ \t__webpack_require__.p = \"\";\n/******/\n/******/\n/******/ \t// Load entry module and return exports\n/******/ \treturn __webpack_require__(__webpack_require__.s = \"./src/index.js\");\n/******/ })\n/************************************************************************/\n/******/ ({\n\n/***/ \"./dist/bundle.js\":\n/*!************************!*\\\n  !*** ./dist/bundle.js ***!\n  \\************************/\n/*! no static exports found */\n/***/ (function(module, exports) {\n\neval(\"exports[\\\"getName\\\"] =\\n/******/ (function(modules) { // webpackBootstrap\\n/******/ \\t// The module cache\\n/******/ \\tvar installedModules = {};\\n/******/\\n/******/ \\t// The require function\\n/******/ \\tfunction __webpack_require__(moduleId) {\\n/******/\\n/******/ \\t\\t// Check if module is in cache\\n/******/ \\t\\tif(installedModules[moduleId]) {\\n/******/ \\t\\t\\treturn installedModules[moduleId].exports;\\n/******/ \\t\\t}\\n/******/ \\t\\t// Create a new module (and put it into the cache)\\n/******/ \\t\\tvar module = installedModules[moduleId] = {\\n/******/ \\t\\t\\ti: moduleId,\\n/******/ \\t\\t\\tl: false,\\n/******/ \\t\\t\\texports: {}\\n/******/ \\t\\t};\\n/******/\\n/******/ \\t\\t// Execute the module function\\n/******/ \\t\\tmodules[moduleId].call(module.exports, module, module.exports, __webpack_require__);\\n/******/\\n/******/ \\t\\t// Flag the module as loaded\\n/******/ \\t\\tmodule.l = true;\\n/******/\\n/******/ \\t\\t// Return the exports of the module\\n/******/ \\t\\treturn module.exports;\\n/******/ \\t}\\n/******/\\n/******/\\n/******/ \\t// expose the modules object (__webpack_modules__)\\n/******/ \\t__webpack_require__.m = modules;\\n/******/\\n/******/ \\t// expose the module cache\\n/******/ \\t__webpack_require__.c = installedModules;\\n/******/\\n/******/ \\t// define getter function for harmony exports\\n/******/ \\t__webpack_require__.d = function(exports, name, getter) {\\n/******/ \\t\\tif(!__webpack_require__.o(exports, name)) {\\n/******/ \\t\\t\\tObject.defineProperty(exports, name, {\\n/******/ \\t\\t\\t\\tconfigurable: false,\\n/******/ \\t\\t\\t\\tenumerable: true,\\n/******/ \\t\\t\\t\\tget: getter\\n/******/ \\t\\t\\t});\\n/******/ \\t\\t}\\n/******/ \\t};\\n/******/\\n/******/ \\t// define __esModule on exports\\n/******/ \\t__webpack_require__.r = function(exports) {\\n/******/ \\t\\tObject.defineProperty(exports, '__esModule', { value: true });\\n/******/ \\t};\\n/******/\\n/******/ \\t// getDefaultExport function for compatibility with non-harmony modules\\n/******/ \\t__webpack_require__.n = function(module) {\\n/******/ \\t\\tvar getter = module && module.__esModule ?\\n/******/ \\t\\t\\tfunction getDefault() { return module['default']; } :\\n/******/ \\t\\t\\tfunction getModuleExports() { return module; };\\n/******/ \\t\\t__webpack_require__.d(getter, 'a', getter);\\n/******/ \\t\\treturn getter;\\n/******/ \\t};\\n/******/\\n/******/ \\t// Object.prototype.hasOwnProperty.call\\n/******/ \\t__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };\\n/******/\\n/******/ \\t// __webpack_public_path__\\n/******/ \\t__webpack_require__.p = \\\"\\\";\\n/******/\\n/******/\\n/******/ \\t// Load entry module and return exports\\n/******/ \\treturn __webpack_require__(__webpack_require__.s = \\\"./src/lib.js\\\");\\n/******/ })\\n/************************************************************************/\\n/******/ ({\\n\\n/***/ \\\"./src/lib.js\\\":\\n/*!********************!*\\\\\\n  !*** ./src/lib.js ***!\\n  \\\\********************/\\n/*! no static exports found */\\n/***/ (function(module, exports) {\\n\\neval(\\\"function getName() {\\\\r\\\\n    return 'zfpx';\\\\r\\\\n}\\\\r\\\\nexports.getName = getName;\\\\n\\\\n//# sourceURL=webpack://getName/./src/lib.js?\\\");\\n\\n/***/ })\\n\\n/******/ });\\n\\n//# sourceURL=webpack:///./dist/bundle.js?\");\n\n/***/ }),\n\n/***/ \"./src/base.js\":\n/*!*********************!*\\\n  !*** ./src/base.js ***!\n  \\*********************/\n/*! no static exports found */\n/***/ (function(module, exports, __webpack_require__) {\n\n\"use strict\";\neval(\"\\n\\nObject.defineProperty(exports, \\\"__esModule\\\", {\\n  value: true\\n});\\nexports.default = 'hello';\\n\\n//# sourceURL=webpack:///./src/base.js?\");\n\n/***/ }),\n\n/***/ \"./src/index.js\":\n/*!**********************!*\\\n  !*** ./src/index.js ***!\n  \\**********************/\n/*! no static exports found */\n/***/ (function(module, exports, __webpack_require__) {\n\n\"use strict\";\neval(\"\\n\\nvar _base = __webpack_require__(/*! ./base */ \\\"./src/base.js\\\");\\n\\nvar _base2 = _interopRequireDefault(_base);\\n\\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\\n\\n//import React from 'react';\\n//import ReactDOM from 'react-dom';\\n//import ajax from 'ajax';\\n//let result = ajax('/ajax');\\n\\n//ReactDOM.render(<h1>{result}</h1>, document.getElementById('root'));\\n// fetch fetch.js fetch.json fetch文件夹\\n//let fetch = require('fetch');\\n//console.log(fetch);\\nvar get = __webpack_require__(/*! ../dist/bundle.js */ \\\"./dist/bundle.js\\\");\\nget.getName();\\n\\n//# sourceURL=webpack:///./src/index.js?\");\n\n/***/ })\n\n/******/ });\n\n//# sourceURL=webpack:///./dist/bundle.js?");

  /***/ }),
  
  /***/ "./src/base.js":
  /*!*********************!*\
    !*** ./src/base.js ***!
    \*********************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {
  
  "use strict";
  eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = 'hello';\n\n//# sourceURL=webpack:///./src/base.js?");
  
  /***/ }),
  
  /***/ "./src/index.js":
  /*!**********************!*\
    !*** ./src/index.js ***!
    \**********************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {
  
  "use strict";
  eval("\n\nvar _base = __webpack_require__(/*! ./base */ \"./src/base.js\");\n\nvar _base2 = _interopRequireDefault(_base);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n//import React from 'react';\n//import ReactDOM from 'react-dom';\n//import ajax from 'ajax';\n//let result = ajax('/ajax');\n\n//ReactDOM.render(<h1>{result}</h1>, document.getElementById('root'));\n// fetch fetch.js fetch.json fetch文件夹\n//let fetch = require('fetch');\n//console.log(fetch);\nvar get = __webpack_require__(/*! ../dist/bundle.js */ \"./dist/bundle.js\");\nget.getName();\n\n//# sourceURL=webpack:///./src/index.js?");
  
  /***/ })
  
  /******/ });