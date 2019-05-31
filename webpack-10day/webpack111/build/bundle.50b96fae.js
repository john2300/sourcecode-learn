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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.css":
/*!***********************!*\
  !*** ./src/index.css ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./src/index.css?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.css */ \"./src/index.css\");\n/* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_index_css__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _logo_png__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./logo.png */ \"./src/logo.png\");\n/* harmony import */ var _logo_png__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_logo_png__WEBPACK_IMPORTED_MODULE_1__);\n//webpack打包图片\n//1.在js中创建图片来引入\n//-----------\n// let image = new Image();\n//只是一个普通的字符串，打包后的没有logo.png这个文件\n// image.src = './logo.png';\n// document.body.appendChild(image);\n//--------\n//引入logo.png,返回的结果是一个新的图片地址,由于内部可能有很多变量logo,为了避免变量冲突,会被打上hash戳,但是还是无法解析'./logo.png',需要file-loader,默认会在内部生成一张图片,到打包文件夹下,并且把生成的图片名字返回回来\n\n\nconsole.log(_logo_png__WEBPACK_IMPORTED_MODULE_1___default.a);\nvar image = new Image();\nimage.src = _logo_png__WEBPACK_IMPORTED_MODULE_1___default.a;\ndocument.body.appendChild(image); //2.在css引入background('url'),相当于require('./logo.png')\n//3.<img src=\"\">,找不到这个图片,需要插件:html-withimg-loader,解析html编译图片,要配置\n//有时候,html里的图片非常小,希望别发html请求,变成base64,需要url-loader,配置\n// console.log('heee');\n//-----------------------------\n//把jquery暴露成$,并且暴露在全局上\n// import $ from 'expose-loader?$!jquery';\n//jquery的$会挂载到window上,但是打包后的$\n//不会挂载到window上,需要把$暴露给window\n//需要插件:expose-loader,暴露全局的loader,属于内联的loader\n//还可以在webpack.config.js里配置\n// import $ from 'jquery';\n// console.log(window.$);\n//写$直接输出window.$,需要在每个模块中注入 $对象\n//需要插件:webpack,在webpack.config.js里配置\n//由于这里每个模块被注入了$对象，这里不需要再引入jquery模块\n//不过任然不能打印出window.$\n//在index.html里引入<script src=\"https://cdn.bootcss.com/jquery/3.3.1/jquery.js\"></script>，可以拿到全局的$，不过这里再import $ from 'jquery'；写$直接是window上的$,这样写会直接打包，相当于多引入了一个jquery模块,打包后文件非常大，webpack.config.js配置externals，打包后显著减少，并没有真正引入jquery，便于分析语义\n// import $ from 'jquery';\n// console.log(window.$);\n//引入第三方模块的全局变量总结\n//1.expose-loader 暴露到window上\n//2.providePlugin给每个人提供一个$\n//3.用script标签引入，并且不能再模块引入\n//--------------------\n// require('./index.css');\n// require('./index.less')\n// require('./a.js');\n// let fn = () => {\n//   console.log('log');\n// }\n// fn();\n// //es7语法\n// class A{\n//   a = 1;\n// }\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/logo.png":
/*!**********************!*\
  !*** ./src/logo.png ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"7d7b2fb9b10adc0bcbf8dc5e7f6934ba.png\";\n\n//# sourceURL=webpack:///./src/logo.png?");

/***/ })

/******/ });